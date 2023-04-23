import React, {useEffect, useState} from "react";
import {motion, useAnimation} from "framer-motion";

interface PixelProps {
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  spreadRadius: number;
  color: string;
}

const Pixel: React.FC<PixelProps> = ({
                                       x,
                                       y,
                                       initialX,
                                       initialY,
                                       spreadRadius,
                                       color,
                                     }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({x, y});
  }, [x, y, controls]);

  return (
    <motion.div
      animate={controls}
      className="absolute w-2 h-2"
      style={{
        backgroundColor: color || "white",
      }}
    />
  );
};

const TextFragments: React.FC = () => {
  const [pixels, setPixels] = useState<PixelProps[]>([]);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const spreadRadius = 50;

    setPixels((prevPixels) =>
      prevPixels.map((pixel) => {
        const dx = e.clientX - pixel.initialX;
        const dy = e.clientY - pixel.initialY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < spreadRadius) {
          const angle = Math.atan2(dy, dx);
          const newX = pixel.initialX - Math.cos(angle) * spreadRadius;
          const newY = pixel.initialY - Math.sin(angle) * spreadRadius;
          return {...pixel, x: newX, y: newY};
        } else {
          return {...pixel, x: pixel.initialX, y: pixel.initialY};
        }
      })
    );
  };

  useEffect(() => {
    const startX = 0;
    const startY = 0;

    const letterPixels: PixelProps[] = [
      {x: startX - 20, y: startY - 40, initialX: startX - 20, initialY: startY - 40, spreadRadius: 200, color: "white"},
      {x: startX - 10, y: startY - 30, initialX: startX - 10, initialY: startY - 30, spreadRadius: 200, color: "white"},
      {x: startX, y: startY - 20, initialX: startX, initialY: startY - 20, spreadRadius: 200, color: "white"},
      {x: startX + 10, y: startY - 30, initialX: startX + 10, initialY: startY - 30, spreadRadius: 200, color: "white"},
      {x: startX + 20, y: startY - 40, initialX: startX + 20, initialY: startY - 40, spreadRadius: 200, color: "white"},
      {x: startX - 10, y: startY - 10, initialX: startX - 10, initialY: startY - 10, spreadRadius: 200, color: "white"},
      {x: startX, y: startY, initialX: startX, initialY: startY, spreadRadius: 20, color: "white"},
      {x: startX + 10, y: startY - 10, initialX: startX + 10, initialY: startY - 10, spreadRadius: 200, color: "white"},
    ];

    setPixels(letterPixels);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center"
      onMouseMove={handleMouseOver}
    >
      {pixels.map((pixel, index) => (
        <Pixel
          key={index}
          x={pixel.x}
          y={pixel.y}
          initialX={pixel.initialX}
          initialY={pixel.initialY}
          spreadRadius={pixel.spreadRadius}
          color={"white"}
        />
      ))}
    </div>
  );
};

export default TextFragments;
