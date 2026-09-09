# robotic_algorithm
主流具身模型算法代码解析

## 项目简介

本仓库旨在收集、学习和解析主流的具身智能（Embodied AI）模型算法，包括但不限于：

- **Flow Matching（流匹配）**: 生成式模型训练方法
- **Reinforcement Learning（强化学习）**: 机器人策略学习
- **Vision-Language-Action（视觉-语言-动作）**: 多模态机器人控制
- **ROS相关**: 机器人操作系统工具和算法

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

### 开发模式

```bash
# 安装开发工具（pytest, black, ruff 等）
uv sync --extra dev

# 运行测试
uv run pytest

# 代码格式化
uv run black .
uv run ruff check .
```

## 项目结构

```
robotic_algorithm/
├── flow_matching/          # Flow Matching 算法实现和示例
├── reinforcement_learning/ # 强化学习算法（待添加）
├── vla/                    # VLA 模型（待添加）
├── ros_tools/              # ROS 相关工具（待添加）
├── pyproject.toml          # 项目配置和依赖管理
└── README.md               # 本文件
```

## 依赖组说明

- **基础依赖**: 仅包含 `numpy`，适合浏览代码
- **fm**: Flow Matching 所需的 PyTorch、matplotlib、scikit-learn 等
- **rl**: 强化学习所需的 gymnasium、stable-baselines3 等
- **vla**: VLA 模型所需的 transformers、accelerate 等
- **ros**: ROS 相关的 Python 工具（pyyaml、scipy）
- **dev**: 开发和测试工具
- **all**: 包含所有上述依赖

## 贡献指南

欢迎提交 PR 添加新的算法实现或改进现有代码！

## 许可证

待定
