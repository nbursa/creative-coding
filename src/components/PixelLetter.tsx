import {useEffect, useRef, useState} from "react";
import p5 from "p5";
import {PixelLetterProps} from "@/types";
// import {letterPatterns} from "@/data/letter-patterns";
import LetterPatterns from "@/utils/letter-patterns"

const PixelLetter: React.FC<PixelLetterProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const letterPatterns = LetterPatterns;
  const [selectedLetter, setSelectedLetter] = useState("A");
  console.log("letterPaterns; ", LetterPatterns)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const sketch = (p: p5) => {
      const PIXEL_SIZE = 10;
      const GAP_SIZE = 1;
      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;
      const LETTER_WIDTH = 8;
      const LETTER_HEIGHT = 12;
      const offsetX = Math.floor(
        (WIDTH - (LETTER_WIDTH * (PIXEL_SIZE + GAP_SIZE) - GAP_SIZE)) / 2
      );
      const offsetY = Math.floor(
        (HEIGHT - (LETTER_HEIGHT * (PIXEL_SIZE + GAP_SIZE) - GAP_SIZE)) / 2
      );

      p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT);
        p.noStroke();
        p.rectMode(p.CENTER);
      };

      p.draw = () => {
        p.background(0);
        p.fill("#ffffff");
        for (let x = 0; x < LETTER_WIDTH; x++) {
          for (let y = 0; y < LETTER_HEIGHT; y++) {
            if (
              LetterPatterns[selectedLetter] &&
              LetterPatterns[selectedLetter][y] &&
              LetterPatterns[selectedLetter][y][x]
            ) {
              p.rect(
                offsetX + x * (PIXEL_SIZE + GAP_SIZE) + PIXEL_SIZE / 2,
                offsetY + y * (PIXEL_SIZE + GAP_SIZE) + PIXEL_SIZE / 2,
                PIXEL_SIZE,
                PIXEL_SIZE
              );
            }
          }
        }
      };
    };

    const instance = new p5(sketch, container);
    return () => {
      instance.remove();
    };
  }, [selectedLetter]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <input
        type="text"
        value={selectedLetter}
        onChange={(e) => setSelectedLetter(e.target.value.toUpperCase())}
        maxLength={1}
        className="absolute top-16 left-4 w-20 mb-4 p-2 text-center text-black border-2 border-gray-400 focus:outline-none focus:border-blue-500"
      />
      <div ref={containerRef} className="w-full h-full"/>
    </div>
  );
};

export default PixelLetter;
