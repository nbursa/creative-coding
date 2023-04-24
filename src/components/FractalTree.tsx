import {useEffect, useRef, useState} from "react";

type FractalTreeProps = {
  iterations: number;
};

const hueShift = 10;
const lightnessShift = 0;
const angleShift = Math.PI / 5;

const drawBranch = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  len: number,
  angle: number,
  width: number,
  generation: number,
  maxIterations: number = 10,
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
  const [angle, setAngle] = useState(0);
  const [hue, setHue] = useState(0);
  const [lightness, setLightness] = useState(20);
  const [canvasSize, setCanvasSize] = useState(0);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight - 56;
    const canvasSize = Math.min(width, height);
    setCanvasSize(canvasSize);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        const startX = canvasSize / 2;
        const startY = canvasSize * 0.6;
        const len = canvasSize / 5;
        const width = 3;
        drawBranch(ctx, startX, startY, len, angle, width, 0, iterations, hue, lightness);
      }
    }
  }, [iterations, hue, lightness, angle, canvasSize]);

  const handleDecreaseAngleClick = () => {
    setAngle((prevAngle) => prevAngle - 0.1);
    setHue((prevHue) => prevHue + hueShift);
    setLightness((prevLightness) => prevLightness + lightnessShift);
  };

  const handleIncreaseAngleClick = () => {
    setAngle((prevAngle) => prevAngle + 0.1);
    setHue((prevHue) => prevHue - hueShift);
    setLightness((prevLightness) => prevLightness - lightnessShift);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize * 0.65}
        className=""
      />
      <div className="flex justify-center items-center">
        <button className="px-4 mx-2 border border-amber-100 rounded-lg" onClick={handleDecreaseAngleClick}>-</button>
        {angle.toFixed(2)}
        <button className="px-4 mx-2 border border-amber-100 rounded-lg" onClick={handleIncreaseAngleClick}>+</button>
      </div>
    </>
  );
};

export default FractalTree;
