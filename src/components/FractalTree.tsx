import {useEffect, useRef, useState} from "react";

type FractalTreeProps = {
  iterations: number;
};

let hue = 0;
let lightness = 20;
const hueShift = 20;
const lightnessShift = 0;
const angleShift = Math.PI / 5;
const canvasSize = 500;
const maxIterations = 10;

const drawBranch = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  len: number,
  angle: number,
  width: number,
  generation: number,
  maxIterations: number,
  hue: number,
  lightness: number
): void => {
  if (generation === maxIterations) return;
  ctx.beginPath();
  ctx.save();
  const clampedLightness = Math.min(lightness, 100);
  ctx.strokeStyle = `hsl(${hue}, 100%, ${clampedLightness}%)`;
  ctx.lineWidth = width;
  ctx.translate(startX, startY);
  ctx.rotate(angle);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();
  const newHue = hue + hueShift;
  const newLightness = lightness + lightnessShift;
  generation++;
  drawBranch(
    ctx,
    0,
    -len,
    len * 0.7,
    angle - angleShift,
    width * 0.8,
    generation,
    maxIterations,
    newHue,
    newLightness
  );
  drawBranch(
    ctx,
    0,
    -len,
    len * 0.7,
    angle + angleShift,
    width * 0.8,
    generation,
    maxIterations,
    newHue,
    newLightness
  );
  ctx.restore();
};


const FractalTree: React.FC<FractalTreeProps> = ({iterations}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(Math.PI / 4);
  const [hue, setHue] = useState(0);
  const [lightness, setLightness] = useState(20);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        drawBranch(
          ctx,
          canvasSize / 2,
          canvasSize - 50,
          100,
          -Math.PI / 2,
          10,
          0,
          iterations,
          hue,
          lightness
        );
      }
    }
  }, [iterations, hue, lightness]);


  const handleMinusClick = () => {
    setAngle((prevAngle) => prevAngle - 0.1);
    setHue((prevHue) => prevHue + hueShift);
    setLightness((prevLightness) => prevLightness + lightnessShift);
  };

  const handlePlusClick = () => {
    setAngle((prevAngle) => prevAngle + 0.1);
    setHue((prevHue) => prevHue - hueShift);
    setLightness((prevLightness) => prevLightness - lightnessShift);
  };


  return (
    <div className="flex flex-col justify-center">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{border: "1px solid black"}}
      />
      <div>
        <button className="btn border rounded w-16" onClick={handleMinusClick}>
          -
        </button>
        <button className="btn border rounded w-16" onClick={handlePlusClick}>
          +
        </button>
      </div>
      {angle}
    </div>
  );
};

export default FractalTree;
