import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const MathScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 动画进度 (0到750帧)
  const progress = Math.min(frame / 750, 1);

  // 粒子位置
  const t = interpolate(frame, [0, 750], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // x0点 (噪声起点,蓝色)
  const x0 = { x: 500, y: 540 };
  // x1点 (月牙终点,绿色)
  const x1 = { x: 1400, y: 540 };

  // 当前位置: x_t = (1-t) * x0 + t * x1
  const xt = {
    x: (1 - t) * x0.x + t * x1.x,
    y: (1 - t) * x0.y + t * x1.y,
  };

  // 速度矢量: u = x1 - x0
  const velocity = {
    x: x1.x - x0.x,
    y: x1.y - x0.y,
  };

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
        数学原理
      </div>

      {/* 中央可视化区域 */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 60,
          right: 60,
          bottom: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg width="1800" height="600" style={{ overflow: 'visible' }}>
          {/* 路径线 */}
          <line
            x1={x0.x}
            y1={x0.y}
            x2={x1.x}
            y2={x1.y}
            stroke="#444444"
            strokeWidth="3"
            strokeDasharray="10,5"
          />

          {/* x0 点 (起点) */}
          <circle cx={x0.x} cy={x0.y} r="20" fill="#2196F3" opacity={0.8} />
          <text
            x={x0.x}
            y={x0.y - 40}
            fontSize="36"
            fill="#2196F3"
            textAnchor="middle"
            fontWeight="bold"
          >
            x₀ (噪声)
          </text>

          {/* x1 点 (终点) */}
          <circle cx={x1.x} cy={x1.y} r="20" fill="#4CAF50" opacity={0.8} />
          <text
            x={x1.x}
            y={x1.y - 40}
            fontSize="36"
            fill="#4CAF50"
            textAnchor="middle"
            fontWeight="bold"
          >
            x₁ (数据)
          </text>

          {/* 当前位置 x_t */}
          {frame > 30 && (
            <>
              <circle cx={xt.x} cy={xt.y} r="30" fill="#FF9800" opacity={0.9}>
                <animate
                  attributeName="r"
                  values="30;35;30"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x={xt.x}
                y={xt.y + 70}
                fontSize="36"
                fill="#FF9800"
                textAnchor="middle"
                fontWeight="bold"
              >
                xₜ
              </text>

              {/* 速度矢量箭头 */}
              {frame > 100 && (
                <>
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="#FF5722" />
                    </marker>
                  </defs>
                  <line
                    x1={xt.x}
                    y1={xt.y}
                    x2={xt.x + velocity.x * 0.2}
                    y2={xt.y + velocity.y * 0.2}
                    stroke="#FF5722"
                    strokeWidth="6"
                    markerEnd="url(#arrowhead)"
                  />
                  <text
                    x={xt.x + velocity.x * 0.25}
                    y={xt.y + velocity.y * 0.25 - 20}
                    fontSize="36"
                    fill="#FF5722"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    u = x₁ - x₀
                  </text>
                </>
              )}
            </>
          )}
        </svg>
      </div>

      {/* 公式说明 */}
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
          <div style={{ fontSize: 40, color: '#ffffff', marginBottom: 20 }}>
            <span style={{ color: '#64b5f6' }}>线性条件路径:</span>
          </div>
        )}
        {frame >= 200 && frame < 400 && (
          <div style={{ fontSize: 48, color: '#ffffff' }}>
            xₜ = (1 - t) · x₀ + t · x₁
          </div>
        )}
        {frame >= 400 && frame < 600 && (
          <div style={{ fontSize: 48, color: '#ffffff' }}>
            <span style={{ color: '#64b5f6' }}>常数速度:</span> uₜ = x₁ - x₀
          </div>
        )}
        {frame >= 600 && (
          <div style={{ fontSize: 40, color: '#aaaaaa' }}>
            粒子以恒定速度从噪声滑向数据点
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
