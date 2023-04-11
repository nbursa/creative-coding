import {useEffect, useState} from 'react';
// import p5 from 'p5';

const p5 = require('p5');

const SnakeGame = () => {
  const [canvas, setCanvas] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (canvas) {
      const sketch = (p: typeof p5) => {
        const rows = 20;
        const cols = 20;
        const w = p.width / cols;
        const h = p.height / rows;
        let snake = new Snake(p);
        let food = new Food(p, cols, rows);

        p.setup = () => {
          p.createCanvas(400, 400);
          p.frameRate(10);
        };

        p.draw = () => {
          p.background(51);

          if (snake.eat(p, food.pos)) {
            food = new Food(p, cols, rows);
          }

          snake.update(p);
          snake.show(p);

          if (snake.death(p)) {
            p.noLoop();
          }

          food.show(p);
        };

        p.keyPressed = () => {
          if (p.keyCode === p.UP_ARROW) {
            snake.dir(0, -1);
          } else if (p.keyCode === p.DOWN_ARROW) {
            snake.dir(0, 1);
          } else if (p.keyCode === p.LEFT_ARROW) {
            snake.dir(-1, 0);
          } else if (p.keyCode === p.RIGHT_ARROW) {
            snake.dir(1, 0);
          }
        };
      };

      new p5(sketch, canvas);
    }
  }, [canvas]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="border border-gray-600 rounded-md"
        ref={(el) => setCanvas(el)}
      ></div>
    </div>
  );
};

class Snake {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  total: number;
  tail: any[];

  constructor(p: typeof p5) {
    this.x = p.floor(p.random(p.width / 10)) * 10;
    this.y = p.floor(p.random(p.height / 10)) * 10;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
  }

  dir(x: number, y: number) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  eat(p: typeof p5, pos: any) {
    const d = p5.Vector.dist(p.createVector(this.x, this.y), pos);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  death(p: typeof p5) {
    for (let i = 0; i < this.tail.length; i++) {
      const pos = this.tail[i];
      const d = p5.Vector.dist(p.createVector(this.x, this.y), pos);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        return true;
      }
    }
    return false;
  }

  update(p: typeof p5) {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = p.createVector(this.x, this.y);

    this.x += this.xSpeed * 10;
    this.y += this.ySpeed * 10;

    this.x = p.constrain(this.x, 0, p.width - 10);
    this.y = p.constrain(this.y, 0, p.height - 10);
  }

  show(p: typeof p5) {
    p.stroke(255);
    p.strokeWeight(1);
    p.noFill();
    p.rect(this.x, this.y, 10, 10);
    for (let i = 0; i < this.tail.length; i++) {
      p.rect(this.tail[i].x, this.tail[i].y, 10, 10);
    }
  }
}


class Food {
  pos: typeof p5.Vector;

  constructor(p: typeof p5, cols: number, rows: number) {
    this.pos = p.createVector(
      p.floor(p.random(cols)) * 10,
      p.floor(p.random(rows)) * 10
    );
  }

  show(p: typeof p5) {
    p.fill(255, 0, 100);
    p.rect(this.pos.x, this.pos.y, 10, 10);
  }
}

export default SnakeGame;
