'use strict';
const assert = require('node:assert/strict');
const test = require('node:test');
const update = require('./update-board.cjs');
const defaults = require('./labels.json');

const paper = (number, extra = {}) => ({
  number, title: `[Paper] Paper ${number}`, state: 'open', labels: [], assignees: [], ...extra,
});

test('classifies paper progress, closure, reopening and conflicting labels', () => {
  assert.equal(update.stage(paper(1)), 'status:todo');
  for (const status of ['reading', 'ready', 'shared', 'paused']) {
    assert.equal(update.stage(paper(1, { labels: [{ name: `status:${status}` }] })), `status:${status}`);
  }
  assert.equal(update.stage(paper(1, { state: 'closed', state_reason: 'completed', labels: ['status:reading'] })), 'status:shared');
  assert.equal(update.stage(paper(1, { state: 'closed', state_reason: 'not_planned' })), 'status:paused');
  assert.equal(update.stage(paper(1, { state: 'open', labels: ['status:reading'] })), 'status:reading');
  const board = update.renderBoard([paper(1, { labels: ['status:reading', 'status:ready'] })]);
  assert.match(board, /待分享（1）/);
  assert.match(board, /多个进度标签/);
});

test('excludes pull requests and unrelated issues, escapes submitted content', () => {
  const board = update.renderBoard([
    paper(1, { title: '[Paper] a | b [x] <script>\n', labels: ['priority:must-read'], assignees: [{ login: 'reader' }] }),
    paper(2, { title: 'Included by label', labels: ['paper'] }),
    paper(3, { pull_request: {} }),
    paper(4, { title: 'Unrelated' }),
  ]);
  assert.match(board, /共 \*\*2\*\* 篇/);
  assert.match(board, /⭐/);
  assert.match(board, /@reader/);
  assert.match(board, /&#124;/);
  assert.doesNotMatch(board, /<script>|Unrelated|Paper 3/);
  assert.match(update.renderBoard([]), /共 \*\*0\*\* 篇/);
});

function client(content, getError) {
  const writes = [];
  const created = [];
  const github = {
    rest: {
      issues: {
        listLabelsForRepo: 'labels', listForRepo: 'issues',
        createLabel: async label => created.push(label),
      },
      repos: {
        getContent: async () => {
          if (getError) throw getError;
          return { data: { sha: 'current-sha', content: Buffer.from(content).toString('base64') } };
        },
        createOrUpdateFileContents: async data => writes.push(data),
      },
    },
    paginate: async endpoint => endpoint === 'labels' ? defaults.slice(1) : [paper(1)],
  };
  return { github, writes, created, context: { repo: { owner: 'team', repo: 'pool' }, payload: { repository: { default_branch: 'research' } } }, core: { info() {} } };
}

test('adds missing labels, updates default branch and skips identical board', async () => {
  const first = client('outdated');
  await update(first);
  assert.equal(first.created.length, 1);
  assert.equal(first.created[0].name, 'paper');
  assert.equal(first.writes.length, 1);
  assert.equal(first.writes[0].branch, 'research');
  assert.equal(first.writes[0].sha, 'current-sha');
  const second = client(Buffer.from(first.writes[0].content, 'base64').toString('utf8'));
  await update(second);
  assert.equal(second.writes.length, 0);
});

test('can create a missing board but does not hide permission failures', async () => {
  const missing = client('', { status: 404 });
  await update(missing);
  assert.equal(missing.writes.length, 1);
  assert.equal(missing.writes[0].sha, undefined);
  const forbidden = client('', { status: 403 });
  await assert.rejects(update(forbidden), error => error.status === 403);
  assert.equal(forbidden.writes.length, 0);
});
