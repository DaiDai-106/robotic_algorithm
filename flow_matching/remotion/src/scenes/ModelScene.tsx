import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

export const ModelScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 数据流动画
  const dataFlow = interpolate(frame, [0, 750], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  // 层定义
  const layers = [
    { name: 'Input', size: 3, color: '#2196F3', label: '[xₜ(2), t(1)]' },
    { name: 'Linear(3→64)', size: 64, color: '#9C27B0', label: '全连接层' },
    { name: 'SiLU', size: 64, color: '#FF9800', label: '激活函数' },
    { name: 'Linear(64→64)', size: 64, color: '#9C27B0', label: '全连接层' },
    { name: 'SiLU', size: 64, color: '#FF9800', label: '激活函数' },
    { name: 'Linear(64→2)', size: 2, color: '#4CAF50', label: '输出速度' },
  ];

  const layerSpacing = 280;
  const startX = 100;
  const centerY = 540;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        padding: 60,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          fontSize: 56,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        VelocityNet 模型结构
      </div>

      {/* 网络架构可视化 */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 0,
          right: 0,
          bottom: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="1800" height="700" style={{ overflow: 'visible' }}>
          {/* 绘制层之间的连接 */}
          {layers.slice(0, -1).map((layer, i) => {
            const x1 = startX + i * layerSpacing + 100;
            const x2 = startX + (i + 1) * layerSpacing;
            const opacity = dataFlow > i / layers.length ? 0.6 : 0.2;
            
            return (
              <line
                key={`conn-${i}`}
                x1={x1}
                y1={centerY}
                x2={x2}
                y2={centerY}
                stroke="#64b5f6"
                strokeWidth="3"
                opacity={opacity}
              />
            );
          })}

          {/* 绘制各层 */}
          {layers.map((layer, i) => {
            const x = startX + i * layerSpacing;
            const isActive = dataFlow > i / layers.length;
            const height = Math.min(layer.size * 3, 200);
            
            return (
              <g key={layer.name}>
                {/* 层矩形 */}
                <rect
                  x={x}
                  y={centerY - height / 2}
                  width="100"
                  height={height}
                  fill={layer.color}
                  opacity={isActive ? 0.8 : 0.3}
                  rx="10"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                
                {/* 层名称 */}
                <text
                  x={x + 50}
                  y={centerY - height / 2 - 20}
                  fontSize="24"
                  fill="#ffffff"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {layer.name}
                </text>
                
                {/* 层标签 */}
                <text
                  x={x + 50}
                  y={centerY + height / 2 + 40}
                  fontSize="20"
                  fill="#aaaaaa"
                  textAnchor="middle"
                >
                  {layer.label}
                </text>
                
                {/* 尺寸标注 */}
                <text
                  x={x + 50}
                  y={centerY}
                  fontSize="28"
                  fill="#ffffff"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {layer.size}
                </text>

                {/* 数据流动画效果 */}
                {isActive && frame % 60 < 30 && (
                  <circle
                    cx={x + 50}
                    cy={centerY}
                    r="15"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    opacity={interpolate(frame % 30, [0, 30], [0.8, 0])}
                  >
                    <animate
                      attributeName="r"
                      values="15;25"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* 说明文字 */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 60,
          right: 60,
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          padding: 40,
          borderRadius: 20,
          border: '2px solid #333',
        }}
      >
        {frame < 200 && (
          <div style={{ fontSize: 40, color: '#ffffff' }}>
            <span style={{ color: '#64b5f6' }}>输入:</span> 当前位置 xₜ(2维) + 时间 t(1维)
          </div>
        )}
        {frame >= 200 && frame < 450 && (
          <div style={{ fontSize: 40, color: '#ffffff' }}>
            <span style={{ color: '#9C27B0' }}>隐藏层:</span> 64维特征提取,使用SiLU激活
          </div>
        )}
        {frame >= 450 && (
          <div style={{ fontSize: 40, color: '#ffffff' }}>
            <span style={{ color: '#4CAF50' }}>输出:</span> 预测速度向量 vₜ(2维)
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
