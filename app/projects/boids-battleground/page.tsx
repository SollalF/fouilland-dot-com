'use client';

import React from 'react';

import { metadata } from './metadata';
import { init } from './boids';

import { title } from '@/components/primitives';

// Move all the canvas logic into a React useEffect
export default function BoidsBattlegroundPage() {
  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col gap-4 text-center">
        <h1 className={title()}>{metadata.title}</h1>
        <p>{metadata.description}</p>
      </div>
      <canvas className="mt-4 aspect-video w-full border border-gray-200" id="boids" />
    </div>
  );
}
