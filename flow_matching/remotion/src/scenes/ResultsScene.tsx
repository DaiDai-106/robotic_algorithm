import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from 'remotion';

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 控制gif播放和渐入效果
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const progress = interpolate(frame, [0, 600], [0, 1], {
    extrapolateRight: 'clamp',
  });

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
        生成结果
      </div>

      {/* Rollout 动画展示 */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            padding: 30,
            borderRadius: 20,
            border: '2px solid #444',
          }}
        >
          <Img
            src={staticFile('moons_rollout.gif')}
            style={{
              width: 800,
              height: 600,
              objectFit: 'contain',
              borderRadius: 10,
            }}
          />
        </div>
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
        {progress < 0.3 && (
          <div style={{ fontSize: 40, color: '#ffffff' }}>
            <span style={{ color: '#2196F3' }}>初始状态:</span> 随机高斯噪声点云
          </div>
        )}
        {progress >= 0.3 && progress < 0.7 && (
          <div style={{ fontSize: 40, color: '#ffffff' }}>
            <span style={{ color: '#64b5f6' }}>流动过程:</span> 噪声沿最优传输路径流向数据分布
          </div>
        )}
        {progress >= 0.7 && (
          <div style={{ fontSize: 40, color: '#ffffff' }}>
            <span style={{ color: '#4CAF50' }}>最终结果:</span> 成功生成 Two Moons 数据分布
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
