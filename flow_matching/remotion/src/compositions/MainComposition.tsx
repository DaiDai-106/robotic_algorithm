import React from 'react';
import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { IntroScene } from '../scenes/IntroScene';
import { MathScene } from '../scenes/MathScene';
import { ModelScene } from '../scenes/ModelScene';
import { ResultsScene } from '../scenes/ResultsScene';
import { OutroScene } from '../scenes/OutroScene';

export const MainComposition: React.FC = () => {
  // 时间分配 (30fps):
  // 0-150: 简介 (5秒)
  // 150-900: 数学可视化 (25秒)
  // 900-1650: 模型结构 (25秒)
  // 1650-2250: 结果展示 (20秒)
  // 2250-2400: 结尾 (5秒)

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>
      
      <Sequence from={150} durationInFrames={750}>
        <MathScene />
      </Sequence>
      
      <Sequence from={900} durationInFrames={750}>
        <ModelScene />
      </Sequence>
      
      <Sequence from={1650} durationInFrames={600}>
        <ResultsScene />
      </Sequence>
      
      <Sequence from={2250} durationInFrames={150}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
