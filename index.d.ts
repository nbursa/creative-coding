declare module 'perlin-noise';

declare module 'open-simplex-noise' {
  export default class OpenSimplexNoise {
    constructor(seed?: number);

    noise2D(x: number, y: number): number;

    noise3D(x: number, y: number, z: number): number;

    noise4D(x: number, y: number, z: number, w: number): number;
  }
}

declare module 'simplex-noise' {
  export default class SimplexNoise {
    constructor(seed?: string | number);

    noise2D(x: number, y: number): number;

    noise3D(x: number, y: number, z: number): number;

    noise4D(x: number, y: number, z: number, w: number): number;
  }
}

declare module 'p5' {
  interface p5InstanceExtensions {
    constrain(n: number, low: number, high: number): number;
  }
}

declare module 'react-analytics';
