/// <reference types="react-scripts" />

interface AnalyserNode {
  calculatePitch: (this: AnalyserNode, sampleRate: number) => number | undefined;
}