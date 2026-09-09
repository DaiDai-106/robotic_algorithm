# robotic_algorithm

主流具身模型算法代码解析

## 项目简介

本仓库旨在收集、学习和解析主流的具身智能（Embodied AI）模型算法，包括但不限于：

- **Flow Matching（流匹配）**: 生成式模型训练方法
- **Reinforcement Learning（强化学习）**: 机器人策略学习
- **Vision-Language-Action（视觉-语言-动作）**: 多模态机器人控制

## 快速开始

本项目使用 [uv](https://github.com/astral-sh/uv) 进行 Python 依赖管理。

### 安装依赖

```bash
# 仅安装基础依赖（numpy）
uv sync

# 安装 Flow Matching 相关依赖（包含 PyTorch）
uv sync --extra fm

# 安装强化学习相关依赖
uv sync --extra rl

# 安装 VLA 相关依赖
uv sync --extra vla

# 安装所有依赖
uv sync --all-extras
```

## 贡献指南

欢迎提交 PR 添加新的算法实现或改进现有代码！

## 许可证

待定