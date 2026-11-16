# Diffusion for Optimization
### 从生成不确定性，到生成可行解

[← Paper Trail](README.md) · [话题 × 方法](../METHODS.md) · [💬 共同评论](https://github.com/lexie-423/Much-Ado-About-Papers/issues/1)

从 **Diffusion-DFL** 出发，关注扩散模型在优化流程中的不同位置：它既可以生成不确定参数的样本，为下游决策提供分布信息，也可以直接构造组合优化问题的解。

## 两篇文章

| 编号 | 文献 | 年份 | 期刊 / 会议 | PDF | 与起点的关系 |
| --- | --- | --- | --- | --- | --- |
| P0 | [Diffusion-DFL: Decision-focused Diffusion Models for Stochastic Optimization](https://arxiv.org/abs/2510.11590v1) | 2025 | arXiv 预印本（上传版本 v1） | [📄 PDF](../papers/production-scheduling/2025-Zhao-Diffusion-DFL-Stochastic-Optimization.pdf) | 起点：扩散模型学习不确定参数的条件分布，以决策目标训练 |
| P1 | [NExCO: Native Solution Expansion for Diffusion-based Combinatorial Optimization](../papers/logistics-fulfillment/2026-Wang-NExCO-Native-Solution-Expansion.pdf) | 2026 | ICLR 2026（上传版本） | [📄 PDF](../papers/logistics-fulfillment/2026-Wang-NExCO-Native-Solution-Expansion.pdf) | 我们的关联：同样使用 diffusion，但生成对象转为组合优化解 |

P0：Zihao Zhao、Christopher Yeh、Lingkai Kong、Kai Wang。  
P1：Yu Wang、Yang Li、Jiale Ma、Junchi Yan、Yi Chang。

**关联依据：** 这是围绕“扩散模型怎样服务优化”的方法比较，不代表已经确认两篇论文之间存在直接引用或继承关系。

## 放在一起看

| 比较维度 | P0 · Diffusion-DFL | P1 · NExCO |
| --- | --- | --- |
| 生成什么 | 给定上下文的不确定参数样本 | 图上组合优化问题的决策变量 / 部分解 |
| 优化如何参与 | 用生成样本求解随机优化，并以决策目标训练预测分布 | 将自适应解扩展融入 masked diffusion 的解码过程 |
| 关键方法 | 重参数化；基于 score function 的梯度估计 | Time-agnostic GNN；置信度候选集；可行性投影 |
| 约束在哪里处理 | 由下游优化问题的约束定义可行决策 | 在逐步扩展解的过程中，用问题特定投影维护可行性 |
| 训练关注点 | 下游决策质量，而非仅降低预测误差 | 从受掩码扰动的部分状态恢复目标解 |
| 论文中的任务 | 合成生产决策、电力调度、投资组合优化 | TSP、MIS、CVRP |
| 当前收藏入口 | 生产与调度 × 机器学习 / 数学优化 | 物流与履约、Transportation × 机器学习 / 启发式 |

以上为根据上传版本整理的初步比较。两篇的任务与评价指标不同，不能直接用各自报告的性能数字判断谁更好。

## 可以一起讨论的问题

1. **生成参数还是生成解？** 对一个具体 OM 问题，什么时候需要保留显式优化器，什么时候适合训练生成式求解器？
2. **能否组合两条路线？** 例如由 P0 生成需求情景，再用 P1 式求解器处理路径决策。这是待验证的想法，不是两篇已有的结果。
3. **如何处理硬约束？** 如果迁移到 Home Healthcare 的时间窗、技能匹配、同步服务与连续照护，可行性投影需要怎样设计？
4. **怎样公平评价？** 可比较可行率、决策成本、推理时间与分布外表现，同时控制训练数据和计算预算。

## 共同评论

在 [Paper Trail 评论区](https://github.com/lexie-423/Much-Ado-About-Papers/issues/1) 中继续交流。可以用“关于 P0”“关于 P1”或“整体想法”开头，也可以推荐下一篇相关论文。后续形成的共识可补充到本页，并链接回原评论。
