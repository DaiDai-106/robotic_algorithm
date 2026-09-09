# Flow Matching 视频解释器

这是一个使用 Remotion 创建的中文教学视频,解释 2D Moons 条件流匹配算法。

## 项目结构

```
remotion/
├── src/
│   ├── index.tsx                    # Remotion 入口
│   ├── FlowMatchingVideo.tsx        # 主视频组件
│   ├── compositions/
│   │   └── MainComposition.tsx      # 主合成(场景编排)
│   └── scenes/
│       ├── IntroScene.tsx           # 简介场景
│       ├── MathScene.tsx            # 数学原理可视化
│       ├── ModelScene.tsx           # VelocityNet模型结构
│       ├── ResultsScene.tsx         # 生成结果展示
│       └── OutroScene.tsx           # 结尾场景
├── package.json
├── tsconfig.json
└── README.md (本文件)
```

## 视频内容

视频时长约 80 秒 (2400 帧 @ 30fps),包含以下部分:

### 1. 简介 (0-5秒)
- 标题动画
- 项目介绍

### 2. 数学原理 (5-30秒)
- **线性条件路径**: xₜ = (1-t)·x₀ + t·x₁
- **常数速度场**: uₜ = x₁ - x₀
- 可视化粒子从噪声点 x₀ 沿直线滑向数据点 x₁
- 显示速度矢量箭头

### 3. VelocityNet 模型 (30-55秒)
- 模型架构:
  - Input: [xₜ(2), t(1)] → 3维
  - Linear(3→64) → SiLU
  - Linear(64→64) → SiLU  
  - Linear(64→2) → 输出速度
- 数据流动画展示信息在各层之间的传递

### 4. 生成结果 (55-75秒)
- 从高斯噪声云逐渐流动到 Two Moons 形状
- 实时显示采样进度
- 蓝色(噪声) → 绿色(数据分布)

### 5. 结尾 (75-80秒)
- 感谢观看
- 总结标语

## 安装依赖

确保已安装 Node.js 18+ 和 npm,然后运行:

```bash
cd flow_matching/remotion
npm install
```

## 在 Remotion Studio 中预览

启动 Remotion Studio 进行交互式预览和编辑:

```bash
npm start
# 或
npx remotion studio
```

浏览器会自动打开 `http://localhost:3000`,您可以:
- 实时预览视频
- 拖动时间轴查看任意帧
- 调整参数并实时查看效果
- 编辑代码后自动热重载

## 渲染 MP4 视频

将视频渲染为 MP4 文件:

```bash
npm run render
# 或
npx remotion render FlowMatchingVideo out/flow_matching_moons.mp4
```

渲染参数:
- 分辨率: 1920x1080 (Full HD)
- 帧率: 30 fps
- 时长: 80 秒
- 输出: `out/flow_matching_moons.mp4`

### 自定义渲染选项

指定输出路径:
```bash
npx remotion render FlowMatchingVideo my_video.mp4
```

指定质量和其他选项:
```bash
npx remotion render FlowMatchingVideo out/output.mp4 --codec h264 --quality 80
```

更多渲染选项请参考: https://www.remotion.dev/docs/cli/render

## 技术细节

### 对齐代码实现

视频中的数学公式和模型结构与实际代码保持一致:

- **FlowMatching.make_batch**: 独立耦合,随机配对 x₀ 和 x₁
- **线性插值**: xₜ = (1-t)·x₀ + t·x₁
- **VelocityNet**: 输入[xₜ, t]拼接后通过三个全连接层
- **Euler 积分**: 数值求解 ODE 生成样本

### 样式说明

- 深色背景 (#0a0a0a) 提供专业教学氛围
- 中文字幕和标注
- 使用颜色编码:
  - 蓝色 (#2196F3): 噪声/起点
  - 绿色 (#4CAF50): 数据/终点
  - 橙色 (#FF9800): 当前状态
  - 紫色 (#9C27B0): 网络层

## 依赖项

主要依赖:
- `remotion`: ^4.0.0 - 视频创建框架
- `react`: ^18.2.0
- `@remotion/cli`: ^4.0.0 - 命令行工具

兼容 Node.js 18+ 环境。

## 开发提示

### 修改时长

编辑 `src/FlowMatchingVideo.tsx`:
```typescript
durationInFrames={2400} // 修改总帧数
fps={30}                 // 修改帧率
```

### 调整场景时序

编辑 `src/compositions/MainComposition.tsx` 中的 `<Sequence>` 组件:
```typescript
<Sequence from={150} durationInFrames={750}>
  <MathScene />
</Sequence>
```

### 自定义样式

每个场景文件 (`src/scenes/*.tsx`) 都是独立的 React 组件,可以自由修改样式、动画和内容。

## 常见问题

### 渲染失败 (Chrome headless 错误)

某些云环境可能缺少 Chrome 或图形支持。解决方案:
1. 本地开发环境渲染
2. 使用 Remotion Cloud (https://www.remotion.dev/cloud)
3. Docker 容器中安装完整 Chrome

### 中文字体显示

视频使用系统默认字体。如需特定中文字体:
1. 将字体文件放入 `public/fonts/`
2. 在组件中使用 `@font-face` 加载

### 性能优化

- 减少粒子数量可提升渲染速度
- 使用 `--concurrency` 参数并行渲染
- 降低输出分辨率: `--scale 0.5`

## 参考资料

- [Remotion 官方文档](https://www.remotion.dev/docs)
- [Flow Matching 论文](https://arxiv.org/abs/2210.02747)
- [本项目的 Flow Matching 实现](../model/flow_matching.py)

## 许可证

与主项目保持一致
