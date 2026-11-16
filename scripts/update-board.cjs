'use strict';

const labels = require('./labels.json');
const columns = [
  ['status:todo', '📥 待读'],
  ['status:reading', '📖 阅读中'],
  ['status:ready', '🎤 待分享'],
  ['status:shared', '✅ 已分享'],
  ['status:paused', '💤 搁置'],
];
const priority = [...columns].reverse().map(([key]) => key);
const names = issue => (issue.labels || []).map(label => typeof label === 'string' ? label : label.name);
const isPaper = issue => !issue.pull_request && (names(issue).includes('paper') || /^\[Paper\]/i.test(issue.title));

function stage(issue) {
  if (issue.state === 'closed') {
    return issue.state_reason === 'not_planned' ? 'status:paused' : 'status:shared';
  }
  return priority.find(key => names(issue).includes(key)) || 'status:todo';
}

// Treat user-provided text as text, never as executable code or Markdown/HTML.
function escapeText(value) {
  return String(value).replace(/[&<>\[\]_*`|\\\r\n]/g, character => `&#${character.charCodeAt(0)};`);
}

function renderBoard(issues) {
  const papers = issues.filter(isPaper).sort((a, b) => b.number - a.number);
  const buckets = new Map(columns.map(([key]) => [key, []]));
  let conflicts = 0;
  for (const issue of papers) {
    const conflict = issue.state !== 'closed' && priority.filter(key => names(issue).includes(key)).length > 1;
    if (conflict) conflicts++;
    const mark = names(issue).includes('priority:must-read') ? '⭐ ' : '';
    const readers = (issue.assignees || []).map(user => `@${escapeText(user.login)}`).join('、') || '未认领';
    // Use a relative issue link instead of trusting a submitted URL.
    buckets.get(stage(issue)).push(`${mark}[#${issue.number} ${escapeText(issue.title)}](../../issues/${issue.number})<br>👤 ${readers}${conflict ? '<br>⚠️ 多个进度标签，请保留一个' : ''}`);
  }
  const headings = columns.map(([key, title]) => `${title}（${buckets.get(key).length}）`);
  const lines = [
    '# 阅读进度看板', '',
    '[返回首页](README.md) · [提交论文](../../issues/new/choose) · [进度规则](README.md#阅读进度)', '',
    '> 此文件由 Actions 自动生成。请到论文 Issue 更新进度标签和 Assignees，再等待刷新。', '',
    `共 **${papers.length}** 篇论文。⭐ 表示优先阅读。`, '',
    `| ${headings.join(' | ')} |`,
    '| ' + columns.map(() => '---').join(' | ') + ' |',
  ];
  const rows = Math.max(1, ...[...buckets.values()].map(items => items.length));
  for (let index = 0; index < rows; index++) {
    lines.push('| ' + columns.map(([key]) => buckets.get(key)[index] || '—').join(' | ') + ' |');
  }
  if (conflicts) lines.push('', `⚠️ ${conflicts} 篇开放论文有多个进度标签；看板按 README 中的优先级显示。`);
  lines.push('', '这是按标签汇总的静态看板，不支持拖拽。需要拖拽请参照 [Projects 设置](docs/PROJECTS.md)。', '');
  return lines.join('\n');
}

module.exports = async function update({ github, context, core }) {
  const repo = context.repo;
  const existing = await github.paginate(github.rest.issues.listLabelsForRepo, { ...repo, per_page: 100 });
  const known = new Set(existing.map(label => label.name));
  for (const label of labels) {
    if (!known.has(label.name)) {
      try {
        await github.rest.issues.createLabel({ ...repo, ...label });
      } catch (error) {
        // Another maintainer may have created the same label since the initial list.
        if (error.status !== 422) throw error;
        const found = await github.rest.issues.getLabel({ ...repo, name: label.name });
        if (found.data.name !== label.name) throw error;
      }
    }
  }
  const issues = await github.paginate(github.rest.issues.listForRepo, { ...repo, state: 'all', per_page: 100 });
  const branch = context.payload.repository.default_branch;
  const content = renderBoard(issues);
  let current;
  try {
    current = (await github.rest.repos.getContent({ ...repo, path: 'BOARD.md', ref: branch })).data;
  } catch (error) {
    if (error.status !== 404) throw error;
  }
  if (current && Buffer.from(current.content, 'base64').toString('utf8') === content) {
    core.info('Board is already up to date.');
    return;
  }
  await github.rest.repos.createOrUpdateFileContents({
    ...repo, path: 'BOARD.md', branch,
    message: 'docs: update paper reading board',
    content: Buffer.from(content).toString('base64'),
    ...(current ? { sha: current.sha } : {}),
  });
  core.info('Updated BOARD.md.');
};
module.exports.renderBoard = renderBoard;
module.exports.stage = stage;
