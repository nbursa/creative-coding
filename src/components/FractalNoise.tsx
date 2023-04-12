import {useEffect, useRef} from 'react';

const p5 = require('p5');
const {Vector} = require('p5');


const FractalNoise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const sketch = (p: typeof p5) => {
      let particles: Particle[] = [];
      let field: typeof Vector[] = [];

      p.setup = () => {
        const width = p.windowWidth;
        const height = p.windowHeight;
        p.createCanvas(width, height);
        particles = new Array(500)
          .fill(null)
          .map(() => createParticle(p.random(width), p.random(height), p));

        field = generateFractalNoiseField(p, width, height);

        p.background(0);
        p.noStroke();
      };

      p.draw = () => {
        updateParticles(particles, field, p);
        p.background(0);
        particles.forEach((particle) => {
          particle.draw(p);
        });
      };
    };

    new p5(sketch, canvas);
  }, []);

  return <canvas ref={canvasRef} className="w-screen h-screen"/>;
};

type Particle = {
  position: typeof Vector;
  velocity: typeof Vector;
  color: string;
  update(field: typeof Vector[], p: typeof p5): void;
  draw(p: typeof p5): void;
};

const createParticle = (x: number, y: number, p: typeof p5): Particle => {
  const position = new p5.Vector(x, y);
  const velocity = new p5.Vector(0, 0);
  const color = 'rgba(255, 255, 255, 0.5)';

  return {
    position,
    velocity,
    color,
    update(field) {
      const x = Math.floor(this.position.x);
      const y = Math.floor(this.position.y);
      const index = y * p.width + x;
      const force = field[index];
      this.velocity.add(force);
      this.velocity.limit(2);
      this.position.add(this.velocity);
      this.velocity.mult(0.95);
    },
    draw() {
      p.fill(this.color);
      p.circle(this.position.x, this.position.y, 1);
    },
  };
};


const updateParticles = (particles: Particle[], field: typeof Vector[], p: typeof p5) => {
  particles.forEach((particle) => {
    particle.update(field, p);
  });
};

class CustomVector extends p5.Vector {
  constructor(x?: number, y?: number, z?: number) {
    super(x, y, z);
  }

  fromAngle(angle: number, length?: number): this {
    if (typeof length === "undefined") {
      length = 1;
    }
    this.x = length * Math.cos(angle);
    this.y = length * Math.sin(angle);
    return this;
  }
}


// const generateFractalNoiseField = (
//   p: typeof p5,
//   width: number,
//   height: number
// ): CustomVector[] => {
//   const field = new Array(width * height).fill(0).map(() => new CustomVector());
//
//   const scale = 0.01;
//   const octaves = 4;
//   const persistence = 0.5;
//   p.noiseDetail(octaves, persistence);
//
//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       const noiseValue = p.noise(x * scale, y * scale);
//       const angle = noiseValue * p.TWO_PI;
//       field[y * width + x].fromAngle(angle);
//     }
//   }
//
//   return field;
// };
const generateFractalNoiseField = (
  p: typeof p5,
  width: number,
  height: number
): CustomVector[] => {
  const field = new Array(width * height).fill(0).map(() => new CustomVector());

  const octaves = 8;
  const falloff = 0.5;
  const noiseScale = 0.01;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let noiseValue = 0;
      let amplitude = 1;
      let frequency = 1;

      for (let i = 0; i < octaves; i++) {
        const nx = x * noiseScale * frequency;
        const ny = y * noiseScale * frequency;
        noiseValue += p.noise(nx, ny) * amplitude;

        amplitude *= falloff;
        frequency *= 2;
      }

      const angle = noiseValue * p.TWO_PI;
      field[y * width + x].fromAngle(angle);
    }
  }

  return field;
};


export default FractalNoise;
