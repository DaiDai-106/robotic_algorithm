import React from 'react';
import { Composition } from 'remotion';
import { MainComposition } from './compositions/MainComposition';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="FlowMatchingVideo"
        component={MainComposition}
        durationInFrames={2400}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
