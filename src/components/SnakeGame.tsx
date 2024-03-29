import {useCallback, useEffect, useRef, useState} from 'react';

const p5 = require('p5');
const {Vector} = require('p5');

const SnakeGame = () => {
  const [canvas, setCanvas] = useState<HTMLDivElement | null>(null);
  const [score, setScore] = useState(0);
  const [frameRate, setFrameRate] = useState(5);
  const [isDead, setIsDead] = useState(false);
  const isDeadRef = useRef(isDead);
  const p5Instance = useRef<typeof p5>();

  const onGameOver = () => {
    setIsDead(true);
  };

  const sketch = useCallback((p: typeof p5) => {
    const rows = 20;
    const cols = 20;
    const w = p.width / cols;
    const h = p.height / rows;
    let snake = new Snake(p);
    let food = new Food(p, cols, rows)
    let canvasSize: number;

    p.setup = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvasSize = Math.min(w - 20, h - 20);
      w > 768 ? p.createCanvas(500, 500) : p.createCanvas(canvasSize, canvasSize)
      p.frameRate(frameRate)
    };

    p.draw = () => {
      p.background("#1d1f21");

      if (snake.eat(p, food.pos)) {
        food = new Food(p, cols, rows);
        setScore((prevScore) => prevScore + 1);
        setFrameRate((prevFrameRate) => prevFrameRate + 1);
        p.frameRate(frameRate);
      }

      snake.update(p);
      snake.show(p);

      if (snake.death(p)) {
        if (!isDeadRef.current) {
          isDeadRef.current = true;
          onGameOver();
        }
        p.noLoop();
      } else {
        isDeadRef.current = false;
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
  }, [frameRate]);

  useEffect(() => {
    if (canvas && !p5Instance.current) {
      p5Instance.current = new p5(sketch, canvas);
    }
  }, [canvas, sketch]);

  const handleReset = () => {
    setScore(0);
    setFrameRate(5);
    setIsDead(false);
    if (p5Instance.current) {
      p5Instance.current.remove();
      p5Instance.current = undefined;
      canvas!.innerHTML = '';
      p5Instance.current = new p5(sketch, canvas);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="absolute top-12 mx-auto font-bold text-xl text-white z-10">
        Score: {score}
      </div>
      {isDead && <div
        className="absolute top-1/2 left-1/2 transform rounded-md p-4 -translate-y-1/4 -translate-x-1/2 flex flex-col justify-center items-center bg-black z-10">
        <div className="mb-4">Snake is DEAD! You killed it!</div>
        <button onClick={handleReset} className="px-4 py-2 text-sm border rounded-md">Ok, Reset Game</button>
      </div>}
      <div
        className="relative border border-gray-600"
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
  tail: typeof Vector[];

  constructor(p: typeof p5) {
    this.x = Math.floor(Math.random() * (p.width / 10)) * 10;
    this.y = Math.floor(Math.random() * (p.height / 10)) * 10;
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
    if (this.x < 0 || this.x >= p.width || this.y < 0 || this.y >= p.height) {
      this.total = 0;
      this.tail = [];
      return true;
    }

    for (let i = 0; i < this.tail.length; i++) {
      const d = p.dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
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
  }


  show(p: typeof p5) {
    p.stroke(255);
    p.strokeWeight(1);
    p.fill("green");

    if (this.x >= 0 && this.x < p.width && this.y >= 0 && this.y < p.height) {
      p.rect(this.x, this.y, 10, 10);
    }

    for (let i = 0; i < this.tail.length; i++) {
      if (
        this.tail[i].x >= 0 &&
        this.tail[i].x < p.width &&
        this.tail[i].y >= 0 &&
        this.tail[i].y < p.height
      ) {
        p.rect(this.tail[i].x, this.tail[i].y, 10, 10);
      }
    }
  }
}

class Food {
  pos: typeof p5.Vector;

  constructor(p: typeof p5, cols: number, rows: number) {
    this.pos = p.createVector(
      Math.floor(Math.random() * cols) * 10,
      Math.floor(Math.random() * rows) * 10
    );
  }

  show(p: typeof p5) {
    p.fill("red");
    p.rect(this.pos.x, this.pos.y, 10, 10);
  }
}

export default SnakeGame;
