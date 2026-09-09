# Flow Matching

Flow Matching 是一种生成式模型训练方法，通过学习数据分布之间的最优传输路径来生成新样本。

## 概述

Flow Matching（流匹配）是一种近年来流行的生成模型训练技术，与扩散模型（Diffusion Models）类似但更加高效。它通过构建从简单分布（如高斯噪声）到数据分布的连续路径（flow），并训练神经网络预测这个路径。

## 主要特点

- **简单高效**: 相比扩散模型，训练目标更直接
- **理论基础**: 基于最优传输理论和常微分方程（ODE）
- **灵活性**: 可以应用于多种生成任务

## 目录结构（待实现）

```
flow_matching/
├── README.md           # 本文件
├── __init__.py         # 包初始化
├── models/             # 模型定义
├── flows/              # Flow 定义和采样
├── training/           # 训练脚本
└── examples/           # 示例和教程
```

## 安装依赖

```bash
# 从项目根目录安装 Flow Matching 相关依赖
uv sync --extra fm
```

## 使用示例

待添加代码实现后补充使用示例。

## 参考资料

- [Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747)
- [Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow](https://arxiv.org/abs/2209.03003)

## TODO

- [ ] 实现基础 Flow Matching 算法
- [ ] 添加训练脚本
- [ ] 提供简单的 2D 数据集示例
- [ ] 添加可视化工具
