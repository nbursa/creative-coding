import {useEffect, useRef} from 'react';
import {noise} from 'perlin-noise';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  update: (field: { x: number; y: number }[], width: number, height: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const FractalNoise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const width = canvas.width;
    const height = canvas.height;

    const particles: Particle[] = new Array(500)
      .fill(null)
      .map(() =>
        createParticle(Math.random() * width, Math.random() * height)
      );

    const field = generateFractalNoiseField(width, height);

    function animate() {
      updateParticles(particles, field);
      ctx && drawParticles(ctx, particles, width, height);
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} className="w-screen h-screen"/>;
};

const createParticle = (x: number, y: number): Particle => {
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    update(field: { x: number; y: number }[], width: number, height: number) {
      const wrappedX = Math.floor(this.x) % width;
      const wrappedY = Math.floor(this.y) % height;
      const index = wrappedY * width + wrappedX;
      const fx = field[index]?.x;
      const fy = field[index]?.y;
      this.vx += fx;
      this.vy += fy;
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x += width;
      if (this.x >= width) this.x -= width;
      if (this.y < 0) this.y += height;
      if (this.y >= height) this.y -= height;
    },
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    },
  };
};

const updateParticles = (
  particles: Particle[],
  field: { x: number; y: number }[]
) => {
  particles.forEach((particle) => {
    particle.update(field, 1, 1);
  });
};

const drawParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((particle) => {
    particle.draw(ctx);
  });
};

// const drawParticles = (
//   ctx: CanvasRenderingContext2D,
//   particles: Particle[],
//   width: number,
//   height: number
// ) => {
//   ctx.clearRect(0, 0, width, height);
//   ctx.fillStyle = "white";
//
//   particles.forEach((particle) => {
//     particle.draw(ctx);
//   });
// };

const generateFractalNoiseField = (
  width: number,
  height: number
): { x: number; y: number }[] => {
  const field = new Array(width * height).fill(0).map(() => ({x: 0, y: 0}));

  const scale = 0.01;
  const octaves = 4;
  const persistence = 0.5;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let value = 0;
      let amplitude = 1;
      for (let i = 0; i < octaves; i++) {
        const frequency = 2 ** i;
        const noiseValue =
          noise && noise.perlin2(x * scale * frequency, y * scale * frequency);
        value += noiseValue * amplitude;
        amplitude *= persistence;
      }
      const angle = value * Math.PI * 2;
      field[y * width + x] = {x: Math.cos(angle), y: Math.sin(angle)};
    }
  }

  return field;
};

// const FractalNoise: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) {
//       return;
//     }
//     const ctx = canvas.getContext('2d');
//     if (!ctx) {
//       return;
//     }
//
//     const width = canvas.width;
//     const height = canvas.height;
//
//     // Particle class
//     class Particle {
//       constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.vx = 0;
//         this.vy = 0;
//       }
//
//       update(field) {
//         const fx = field[Math.floor(this.y) * width + Math.floor(this.x)].x;
//         const fy = field[Math.floor(this.y) * width + Math.floor(this.x)].y;
//         this.vx += fx;
//         this.vy += fy;
//         this.x += this.vx;
//         this.y += this.vy;
//
//         if (this.x < 0) this.x += width;
//         if (this.x >= width) this.x -= width;
//         if (this.y < 0) this.y += height;
//         if (this.y >= height) this.y -= height;
//       }
//
//       draw(ctx) {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }
//
//     const particles: Particle[] = new Array(500)
//       .fill(null)
//       .map(() => new Particle(Math.random() * width, Math.random() * height));
//
//     const field = generateFractalNoiseField(width, height);
//
//     function animate() {
//       updateParticles(particles, field);
//       drawParticles(ctx, particles, width, height);
//       requestAnimationFrame(animate);
//     }
//
//     animate();
//   }, []);
//
//   return <canvas ref={canvasRef} className="w-screen h-screen"/>;
// };

// const updateParticles = (particles, field) => {
//   particles.forEach((particle) => {
//     particle.update(field);
//   });
// };
//
// const drawParticles = (ctx, particles, width, height) => {
//   ctx.clearRect(0, 0, width, height);
//   ctx.fillStyle = 'white';
//
//   particles.forEach((particle) => {
//     particle.draw(ctx);
//   });
// };


// const generateFractalNoiseField = (width, height) => {
//   // Define the flow field
//   const field = new Array(width * height).fill(0).map(() => ({x: 0, y: 0}));
//
//   // Generate fractal noise
//   const scale = 0.01;
//   const octaves = 4;
//   const persistence = 0.5;
//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       let value = 0;
//       let amplitude = 1;
//       for (let i = 0; i < octaves; i++) {
//         const frequency = 2 ** i;
//         const noiseValue =
//           noise && noise.perlin2(x * scale * frequency, y * scale * frequency);
//         value += noiseValue * amplitude;
//         amplitude *= persistence;
//       }
//       const angle = value * Math.PI * 2;
//       field[y * width + x] = {x: Math.cos(angle), y: Math.sin(angle)};
//     }
//   }
//
//   return field;
// }

export default FractalNoise;
