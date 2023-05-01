import React, {useEffect, useRef, useState} from 'react';

type FlowFieldProps = {
  backgroundColor?: string;
  particleColor?: string;
};

const FlowField: React.FC<FlowFieldProps> = ({
                                               backgroundColor = 'rgba(0, 0, 0, 0.5)',
                                               particleColor = '#ffffff'
                                             }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const size = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size) return;
    canvas.width = size.width;
    canvas.height = size.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      strokeWidth: number,
      opacity: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.stroke();
    };

    const drawFlowField = () => {
      ctx.clearRect(0, 0, size.width, size.height);

      const spacing = 16;
      for (let x = 0; x < size.width; x += spacing) {
        for (let y = 0; y < size.height; y += spacing) {
          const dx = x - mousePos.x;
          const dy = y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const minOpacity = 0.1;
          const maxOpacity = 0.3;
          const opacity = minOpacity + (maxOpacity - minOpacity) * Math.max(0, Math.min(1, distance / 200));
          const minLength = 0.1 * spacing;
          const length = minLength + (spacing * 0.8 - minLength) * Math.max(0, Math.min(1, distance / 200));
          const minStrokeWidth = 0.5;
          const strokeWidth = minStrokeWidth + (2 - minStrokeWidth) * Math.max(0, Math.min(1, distance / 200));

          drawLine(
            x + Math.cos(angle) * length / 2,
            y + Math.sin(angle) * length / 2,
            x - Math.cos(angle) * length / 2,
            y - Math.sin(angle) * length / 2,
            strokeWidth,
            opacity
          );
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({x: event.clientX, y: event.clientY});
    };

    drawFlowField();
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size, mousePos, particleColor]);

  return <canvas ref={canvasRef} className="w-full h-full fixed top-0 left-0 z-0"
                 style={{backgroundColor: backgroundColor}}/>;
};

// Custom hook to get window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number } | undefined>();

  useEffect(() => {
    function updateSize() {
      setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return windowSize;
}

export default FlowField;
