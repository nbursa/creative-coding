import LinkStyled from "@/components/LinkStyled";
import React, {useEffect, useRef, useState} from "react";
import {CatalogProps} from "@/types";
import {catalogLinks, CatalogLinkType} from "@/data";

const Catalog: React.FC<CatalogProps> = ({className}) => {
  const linksRef = useRef<Array<HTMLLIElement | null>>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const previousTimestampRef = useRef<number | null>(null);
  const [speedValue, setSpeedValue] = useState<number>(0.1);
  const [directionChangeFrequency, setDirectionChangeFrequency] =
    useState<number>(100);
  const directionChangeCounterRef = useRef<number>(0);
  const [constrainedXPos, setConstrainedXPos] = useState<number>(0);
  const [constrainedYPos, setConstrainedYPos] = useState<number>(0);

  const changeDirection = () => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  };

  useEffect(() => {
    const links = linksRef.current.filter(
      (link): link is HTMLLIElement => link !== null
    );
    const initialDirections = links.map((link) => {
      const initialXPos = link.offsetLeft;
      const initialYPos = link.offsetTop;
      const xPos = initialXPos + 1;
      const yPos = initialYPos + 1;

      const direction = {
        x: xPos - initialXPos,
        y: yPos - initialYPos,
      };

      const magnitude = Math.sqrt(
        direction.x * direction.x + direction.y * direction.y
      );

      return {
        x: direction.x / magnitude,
        y: direction.y / magnitude,
      };
    });

    const moveLinks = (timestamp: number) => {
      if (previousTimestampRef.current == null) {
        previousTimestampRef.current = timestamp;
      }
      const elapsed = (timestamp - previousTimestampRef.current) * speedValue;
      previousTimestampRef.current = timestamp;
      const maxXPos = window.innerWidth - links[0].offsetWidth;
      const maxYPos = window.innerHeight - links[0].offsetHeight;

      let newXPos = constrainedXPos;
      let newYPos = constrainedYPos;

      links.forEach((link: HTMLLIElement, index) => {
        const initialXPos = link.offsetLeft;
        const initialYPos = link.offsetTop;
        const direction = initialDirections[index];
        const xPos = initialXPos + direction.x * elapsed;
        const yPos = initialYPos + direction.y * elapsed;

        if (xPos <= 0 || xPos >= maxXPos) {
          initialDirections[index].x = -direction.x;
        }
        if (yPos <= 0 || yPos >= maxYPos) {
          initialDirections[index].y = -direction.y;
        }

        const clampedXPos = Math.min(Math.max(0, xPos), maxXPos);
        const clampedYPos = Math.min(Math.max(0, yPos), maxYPos);

        link.style.position = "absolute";
        link.style.left = `${clampedXPos}px`;
        link.style.top = `${clampedYPos}px`;

        initialDirections[index] = {
          x: clampedXPos - initialXPos,
          y: clampedYPos - initialYPos,
        };

        directionChangeCounterRef.current += elapsed;

        if (directionChangeCounterRef.current >= directionChangeFrequency) {
          initialDirections[index] = changeDirection();
          directionChangeCounterRef.current = 0;
        }

        newXPos += clampedXPos;
        newYPos += clampedYPos;
      });

      setConstrainedXPos(newXPos / links.length);
      setConstrainedYPos(newYPos / links.length);

      animationFrameIdRef.current = requestAnimationFrame(moveLinks);
    };


    animationFrameIdRef.current = requestAnimationFrame(moveLinks);

    return () => {
      if (animationFrameIdRef.current != null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [directionChangeFrequency, speedValue]);

  return (
    <div className={className}>
      <div className="fixed top-[60px] right-4 flex flex-col z-10">
        <label htmlFor="speed" className="mb-1 text-[11px] font-thin">
          Speed: {speedValue}
        </label>
        <input
          id="speed"
          type="range"
          min="0"
          max="10"
          value={speedValue}
          onChange={(e) => setSpeedValue(parseFloat(e.target.value))}
          className="bg-gray-300 w-48 h-2 cursor-pointer"
        />
      </div>
      <div className="fixed top-[100px] right-4 flex flex-col z-10">
        <label htmlFor="direction" className="mb-1 text-[11px] font-thin">
          Direction change: {directionChangeFrequency}
        </label>
        <input
          id="direction"
          type="range"
          min="100"
          max="1000"
          value={directionChangeFrequency}
          onChange={(e) => setDirectionChangeFrequency(parseInt(e.target.value))}
          className="bg-gray-300 w-48 h-2 cursor-pointer"
        />
      </div>
      <ul
        ref={(el) =>
          (linksRef.current = Array.from(
            el?.children || [],
            (child) => child as HTMLLIElement | null
          ))
        }
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:w-3/4 md:mx-auto catalog-links"
      >
        {catalogLinks.map((link: CatalogLinkType, index: number) => {
          return (
            <li
              key={index}
              className="mb-8 text-center md:text-left text-base px-5 py-4"
              style={{
                transform: `translate(${constrainedXPos}px, ${constrainedYPos}px)`,
                transition: "transform 1s ease-in-out",
              }}
            >
              <LinkStyled href={link.href} label={link.label}/>
            </li>
          );
        })}
      </ul>
    </div>
  );

};

export default Catalog;
