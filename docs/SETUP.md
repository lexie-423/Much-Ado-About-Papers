# 第一次使用

## 1. 创建仓库并上传

1. 在 GitHub 新建仓库，例如 `paper-pool`。只供同门使用时选择 **Private**。
2. 解压模板，将里面的全部内容上传到仓库根目录。注意包含隐藏的 `.github` 文件夹，目录不能再套一层 `paper-pool-template`。
3. 可以使用 GitHub Desktop 添加整个文件夹并发布仓库，也可以在网页用 **Add file → Upload files** 上传。若浏览器漏掉 `.github`，请在网页检查并补上；最终必须看到 `.github/ISSUE_TEMPLATE/paper.yml` 和 `.github/workflows/board.yml`。
4. 文件应位于默认分支。新仓库建议使用 `main`，自动化也支持其他默认分支名称。

## 2. 邀请同门

打开仓库 **Settings → Collaborators** 邀请成员。组织仓库由管理员给团队授予相应访问权限。需要更新标签、分配 Assignees 的成员应具备写入权限。

## 3. 初始化标签和自动看板

1. 在仓库 **Actions** 启用工作流（如出现提示）。
2. 选择 **Paper pool board → Run workflow**，分支选择默认分支。
3. 等待运行成功。到 Issues 的 Labels 页面确认 `paper` 和五个 `status:` 标签已出现。
4. 打开 **Issues → New issue**，应看到“推荐一篇论文”表单。
5. 提交第一篇真实论文；稍后打开 `BOARD.md`，确认出现待读卡片。
6. 将该 Issue 的 `status:todo` 替换为 `status:reading`，检查卡片移动到阅读中列。

工作流仅使用 GitHub 自动提供的 `GITHUB_TOKEN`，不需要创建 PAT 或配置 Secrets。权限用途：`issues: write` 创建标签，`contents: write` 更新 `BOARD.md`。它不会自动创建示例论文或给成员发送邀请。

如果工作流失败：

- **403 / Resource not accessible**：检查 **Settings → Actions → General**，确认仓库及上级组织允许 Actions 使用工作流声明的读写权限。
- **受保护分支禁止写入**：管理员可根据团队规则允许指定自动化身份更新；若不能允许，则停用该工作流，改用 [Projects 看板](PROJECTS.md)，不必解除分支保护。
- **找不到工作流 / Run workflow**：确认 `.github/workflows/board.yml` 已上传默认分支，并且当前账号有运行权限。
- **没有论文卡片**：条目必须有 `paper` 标签或标题以 `[Paper]` 开头；PR 不会收录。
- **进度没有立即变化**：先等当前运行结束；若仍未更新，手动 Run workflow 会从全部 Issues 重新生成。

## 4. 设置成可复用模板（可选）

在 **Settings → General → Template repository** 勾选模板仓库。以后有权限访问的同学可用 **Use this template** 创建新的论文池。

模板复用只复制仓库文件，不会复制标签、既有 Issues、成员权限或 GitHub Project。每个新仓库都要重新初始化，避免误以为复制了设置。

## 5. 自定义

- 修改 README 中的组会节奏。
- `scripts/labels.json` 是默认标签清单，可增加 `topic:` 方向标签。再次运行工作流只补充不存在的标签，不改写已存在标签的颜色、描述，也不会删除旧标签。
- Issue 表单中的方向关键词不会自动转成标签，请维护者按需要添加对应 `topic:` 标签。
- 修改 `.github/ISSUE_TEMPLATE/paper.yml` 可以调整提交字段。
- 如果启用可选的 Projects，把 Project 的真实链接加入 README。

## 官方说明

- [Issue 表单语法](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
- [从模板创建仓库](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- [工作流权限](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#permissions)
