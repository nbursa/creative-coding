import React, {useEffect, useRef} from "react";
import {PerlinNoiseProps} from "@/types";

const p5 = require("p5");
const {Vector} = p5;

const PerlinNoise: React.FC<PerlinNoiseProps> = ({p5Props, backgroundColor = "#000000", particleColor = "#ffffff"}) => {
  const perlinNoiseRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (perlinNoiseRef.current) {
      new p5((p: typeof p5) => sketch(p, p5Props, backgroundColor, particleColor), perlinNoiseRef.current);
    }
  }, [p5Props, backgroundColor, particleColor]);

  return <div className="max-h-screen max-w-screen" ref={perlinNoiseRef}></div>;
};

const sketch = (p: typeof p5, p5Props: any, backgroundColor: string, particleColor: string) => {
  let inc = 0.1;
  let scl = 20;
  let cols: number, rows: number;
  let zoff = 0;
  let particles: Particle[] = [];
  let flowfield: typeof Vector[];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(backgroundColor);
    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);
    flowfield = new Array(cols * rows);
    for (let i = 0; i < 500; i++) {
      particles[i] = new Particle(p, particleColor);
    }
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
    pos: typeof p5.Vector;
    vel: typeof p5.Vector;
    acc: typeof p5.Vector;
    maxSpeed: number;
    color: string;

    constructor(p: typeof p5, color: string) {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxSpeed = 4;
      this.color = color;
    }

    follow(vectors: typeof p5.Vector[]) {
      let x = p.floor(this.pos.x / scl);
      let y = p.floor(this.pos.y / scl);
      let index = x + y * cols;
      let force = vectors[index];
      this.applyForce(force);
    }

    applyForce(force: typeof p5.Vector) {
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
      p.stroke(this.color);
      p.strokeWeight(1);
      p.point(this.pos.x, this.pos.y);
    }
  }
};

export default PerlinNoise;
