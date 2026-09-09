#!/bin/bash
# Remotion 项目验证脚本

set -e

echo "======================================"
echo "Remotion 视频项目验证"
echo "======================================"
echo ""

cd "$(dirname "$0")"

# 1. 检查必需文件
echo "✓ 检查项目文件..."
required_files=(
    "package.json"
    "tsconfig.json"
    "remotion.config.ts"
    "src/index.tsx"
    "src/Root.tsx"
    "src/compositions/MainComposition.tsx"
    "src/scenes/IntroScene.tsx"
    "src/scenes/MathScene.tsx"
    "src/scenes/ModelScene.tsx"
    "src/scenes/ResultsScene.tsx"
    "src/scenes/OutroScene.tsx"
    "public/moons_rollout.gif"
    "README.md"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 缺少文件: $file"
        exit 1
    fi
done
echo "✓ 所有必需文件存在"
echo ""

# 2. 检查依赖
echo "✓ 检查 Node.js 和 npm..."
node --version
npm --version
echo ""

# 3. 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "⚠ node_modules 不存在,需要运行 'npm install'"
    exit 1
fi
echo "✓ npm 依赖已安装"
echo ""

# 4. 检查 moons_rollout.gif
echo "✓ 检查 moons_rollout.gif..."
if [ -f "public/moons_rollout.gif" ]; then
    size=$(stat -f%z "public/moons_rollout.gif" 2>/dev/null || stat -c%s "public/moons_rollout.gif" 2>/dev/null || echo "0")
    echo "  文件大小: $size bytes"
fi
echo ""

# 5. 检查已渲染的视频
echo "✓ 检查渲染输出..."
if [ -f "out/flow_matching_moons.mp4" ]; then
    size=$(stat -f%z "out/flow_matching_moons.mp4" 2>/dev/null || stat -c%s "out/flow_matching_moons.mp4" 2>/dev/null || echo "0")
    echo "  ✓ 视频已渲染: out/flow_matching_moons.mp4"
    echo "  文件大小: $size bytes"
    
    # 如果有 ffprobe,显示详细信息
    if command -v ffprobe &> /dev/null; then
        echo ""
        echo "  视频信息:"
        ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,duration -of default=noprint_wrappers=1 out/flow_matching_moons.mp4
    fi
else
    echo "  ⚠ 视频尚未渲染,运行 'npm run render' 生成"
fi
echo ""

echo "======================================"
echo "✓ 验证完成!"
echo "======================================"
echo ""
echo "下一步操作:"
echo "  - 预览: npm start"
echo "  - 渲染: npm run render"
echo "  - 文档: cat README.md"
