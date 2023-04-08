import React, {useEffect, useRef} from "react";
import p5 from "p5";

interface PerlinNoiseProps {
  p5Props?: any;
}

const PerlinNoise: React.FC<PerlinNoiseProps> = ({p5Props}) => {
  const perlinNoiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (perlinNoiseRef.current) {
      new p5((p: p5) => sketch(p, p5Props), perlinNoiseRef.current);
    }
  }, [p5Props]);

  return <div className="max-h-screen max-w-screen" ref={perlinNoiseRef}></div>;
};

const sketch = (p: p5, p5Props: any) => {
  let inc = 0.1;
  let scl = 20;
  let cols: number, rows: number;
  let zoff = 0;
  let particles: Particle[] = [];
  let flowfield: p5.Vector[];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);
    flowfield = new Array(cols * rows);
    for (let i = 0; i < 500; i++) {
      particles[i] = new Particle(p);
    }
    p.background(255);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);
    flowfield = new Array(cols * rows);
  };

  p.draw = () => {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
        let v = p.createVector(Math.cos(angle), Math.sin(angle));
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
      }
      yoff += inc;
    }
    zoff += 0.01;

    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
  };

  class Particle {
    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    maxSpeed: number;

    constructor(p: p5) {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxSpeed = 4;
    }

    follow(vectors: p5.Vector[]) {
      let x = p.floor(this.pos.x / scl);
      let y = p.floor(this.pos.y / scl);
      let index = x + y * cols;
      let force = vectors[index];
      this.applyForce(force);
    }

    applyForce(force: p5.Vector) {
      this.acc.add(force);
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    edges() {
      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.y > p.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = p.height;
    }

    show() {
      p.stroke(0, 50);
      p.strokeWeight(1);
      p.point(this.pos.x, this.pos.y);
    }
  }
};

export default PerlinNoise;
