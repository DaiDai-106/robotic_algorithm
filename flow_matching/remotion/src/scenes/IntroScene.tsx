import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const subtitleOpacity = spring({
    frame: frame - 20,
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
      }}
    >
      <div
        style={{
          transform: `scale(${titleScale})`,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 0 30px rgba(100, 200, 255, 0.5)',
          }}
        >
          条件流匹配
        </h1>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 'normal',
            color: '#64b5f6',
            marginTop: 20,
            opacity: subtitleOpacity,
          }}
        >
          Conditional Flow Matching
        </h2>
      </div>
      
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          fontSize: 32,
          color: '#888888',
          opacity: subtitleOpacity,
        }}
      >
        2D Moons 数据生成演示
      </div>
    </AbsoluteFill>
  );
};
