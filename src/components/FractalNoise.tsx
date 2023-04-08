import {useEffect, useRef} from 'react';
import {noise} from 'perlin-noise';

const FractalNoise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    // Define the flow field
    const field = new Array(width * height).fill(0).map(() => ({x: 0, y: 0}));

    // Generate fractal noise
    const scale = 0.01;
    const octaves = 4;
    const persistence = 0.5;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let value = 0;
        let amplitude = 1;
        for (let i = 0; i < octaves; i++) {
          const frequency = 2 ** i;
          const noiseValue = noise && noise.perlin2(x * scale * frequency, y * scale * frequency);
          value += noiseValue * amplitude;
          amplitude *= persistence;
        }
        const angle = value * Math.PI * 2;
        field[y * width + x] = {x: Math.cos(angle), y: Math.sin(angle)};
      }
    }

    if (!ctx) {
      return;
    }

    // Render the flow field
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const fx = field[y * width + x].x;
        const fy = field[y * width + x].y;
        const dx = Math.round(fx * 10);
        const dy = Math.round(fy * 10);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();
      }
    }
  }, []);

  return (
    <canvas ref={canvasRef} className="w-screen h-screen"/>
  );
};

export default FractalNoise;
