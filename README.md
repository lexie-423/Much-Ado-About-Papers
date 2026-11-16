# Paper Pool · 同门共享论文池

一起发现值得读的论文，把阅读、讨论和复现留下来。

**[提交论文](../../issues/new/choose) · [阅读看板](BOARD.md) · [精读模板](notes/TEMPLATE.md) · [组会记录](meetings/README.md) · [首次设置](docs/SETUP.md)**

## 从哪里开始

1. 推荐论文：打开 **Issues → New issue → 推荐一篇论文**，填写论文链接和推荐理由。
2. 认领阅读：在 Issue 评论“我来读，预计日期……”，由有权限的同学设置 Assignees。
3. 更新进度：在 Issue 右侧 Labels 中替换进度标签；每篇保留一个进度标签。
4. 交流：把疑问、结论和复现结果写在同一篇论文的评论区，避免散落在聊天记录里。
5. 沉淀：长笔记可复制 `notes/TEMPLATE.md`，以 `年份-论文简称.md` 命名，提交后在 Issue 贴链接。

提交前用论文标题、DOI 或 arXiv 编号搜索已有 Issues，包含已关闭的条目；已有论文直接补充评论。

## 阅读进度

| 阶段 | 进度标签 | 什么时候使用 |
| --- | --- | --- |
| 📥 待读 | `status:todo` | 新加入、尚未开始 |
| 📖 阅读中 | `status:reading` | 已认领，正在阅读 |
| 🎤 待分享 | `status:ready` | 已完成阅读，等待组会交流 |
| ✅ 已分享 | `status:shared` | 已分享，笔记或结论已留在 Issue |
| 💤 搁置 | `status:paused` | 暂不阅读、重复或不再推进 |

**[BOARD.md](BOARD.md) 是自动生成的阅读看板。** 新建论文、修改标题、分配阅读人、替换标签和关闭/重开 Issue 后会自动刷新，通常需要等待一次 Actions 运行。不要直接修改看板文件。

阶段以标签为准。没有进度标签的开放论文默认为“待读”；误加多个时，看板按“搁置 → 已分享 → 待分享 → 阅读中 → 待读”取第一个，并显示提醒。关闭为 completed 的论文归为“已分享”，关闭为 not planned 的论文归为“搁置”。重开后会重新使用现有标签，请同时调整标签。

想用鼠标拖动卡片？见 [GitHub Projects 设置](docs/PROJECTS.md)。它是可选视图，需在 GitHub 单独创建，仓库模板不会自动复制云端 Project。

## 分类与协作约定

- 每篇论文一个 Issue，标题建议：`[Paper] 年份 | 论文完整标题`。
- `paper` 标记论文条目，`priority:must-read` 标记优先阅读；研究方向用 `topic:` 标签，可自行增删。
- Assignees 是阅读人；评论里写预计完成日期、阅读结论及下一步。
- 推荐理由尽量说明“它与我们的什么问题相关”，避免只贴链接。
- 意见不同可以直接讨论，并尽量引用原文页码、公式或实验编号。
- PDF 优先贴 arXiv、DOI、作者主页或共享文献库链接；仓库主要保存原创笔记和复现代码。

## 组会节奏（建议）

每周从待读池挑选 1–2 篇，确定阅读人和分享日期。分享后在 Issue 写下三句话：**解决了什么问题、最值得借鉴什么、还有什么疑问**。安排与记录放在 [meetings](meetings/README.md)。

## 管理员首次设置

按照 [SETUP.md](docs/SETUP.md) 上传文件、邀请成员，再运行一次 **Actions → Paper pool board → Run workflow**。这会创建常用标签并初始化看板，无需额外填写密钥。

自动化需要仓库启用 Actions，且允许工作流写入内容与 Issues。如果分支规则禁止自动提交，看板更新会失败，处理办法见设置指南。自动化未启用时，仍可正常提交和讨论论文。

## 文件导航

```text
.github/ISSUE_TEMPLATE/   论文提交表单
.github/workflows/        看板自动更新工作流
scripts/                 看板生成逻辑与标签清单
BOARD.md                 自动阅读看板
docs/                    上手与 Projects 设置指南
notes/                   精读笔记模板
meetings/                组会安排与记录
```

模板文件使用 [MIT License](LICENSE)；外链论文与另行注明的材料保留各自许可。团队后续上传的笔记可在文件内注明作者与使用约定。
