# GitHub Projects 拖拽看板（可选）

模板已经提供自动汇总的 `BOARD.md`。如果更习惯拖拽卡片，可以单独创建 GitHub Project；它属于用户或组织，不是仓库内的文件，因此不能通过下载或复制本模板直接得到。

## 创建与共享

1. 在个人或组织 **Projects → New project** 创建 `Paper Pool`，选择 **Board**。
2. 在 Project 设置中确认可见性，并单独邀请同门获得写入权限。私有仓库的访问权限和 Project 权限要分别检查。
3. 在仓库 **Projects** 页面关联这个 Project，方便大家找到；将实际链接加到 README。

## 列与字段

编辑 Project 的 **Status** 单选字段，配置：

| Status | 含义 |
| --- | --- |
| 待读 | 论文候选池 |
| 阅读中 | 已认领并开始阅读 |
| 待分享 | 等待组会交流 |
| 已分享 | 已交流并留下结论 |
| 搁置 | 暂不推进 |

Board 视图按 **Status** 分组。再添加一个 Table 视图，用来按阅读人或分享日期筛选。

建议显示或新增的字段：

- **Assignees**：直接使用 Issue 的阅读人字段。
- **Labels**：直接使用 Issue 的方向与优先级标签。
- **分享日期**：新增 Date 字段。
- **Priority**：可选；若已使用 `priority:must-read` 标签，可以省略。

## 自动加入论文

Project 右上角菜单 **Workflows → Auto-add to project → Edit**，选择论文仓库，设置过滤条件：

```text
is:issue label:paper
```

保存并启用。此规则处理之后新建或更新、符合条件的条目；已有论文需要用 **Add item → Add items from repository** 手动批量加入。先完成模板的标签初始化，再提交新论文。

将 **Item added to project** 的默认状态设置为“待读”。如果启用了“关闭 Issue 后改为 Done”的默认规则，请把目标改成“已分享”；搁置的论文需要手动设置为“搁置”，避免被误归类。

## 选择一种进度维护方式

**重要：Project 的 Status 与 Issue 的 `status:` 标签是独立字段，本模板不做双向同步。**

- 以模板自动看板为主：替换 Issue 标签，`BOARD.md` 自动刷新；Project 的 Status 需要另外维护。
- 以拖拽 Project 为主：把 README 的“阅读看板”入口改为 Project 链接，停用 Actions 中的 **Paper pool board** 工作流；此后仅维护 Project Status，不把旧 `BOARD.md` 作为实时进度。

推荐先用自动看板，确认团队确实需要拖拽后再切换，避免同时维护两套状态。

官方参考：[Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)、[自动加入条目](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/adding-items-automatically)、[内置自动化](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations)。
