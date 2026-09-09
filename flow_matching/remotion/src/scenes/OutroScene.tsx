import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeIn,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#ffffff',
            margin: 0,
            marginBottom: 40,
          }}
        >
          感谢观看
        </h1>
        
        <div
          style={{
            fontSize: 36,
            color: '#64b5f6',
            marginTop: 20,
          }}
        >
          Conditional Flow Matching
        </div>
        
        <div
          style={{
            fontSize: 32,
            color: '#888888',
            marginTop: 60,
          }}
        >
          高效的生成式模型训练方法
        </div>
      </div>
    </AbsoluteFill>
  );
};
