export interface AnimatedButtonProps {
  href: string;
  label: string;
  className: string;
}

export interface ButtonCardProps {
  href: string;
  title: string;
  description: string;
}

export interface CardsProp {
  title?: string;
  description?: string;
  className?: string;
}

export interface CatalogProps {
  className?: string;
}

// export interface Particle {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   update: (field: { x: number; y: number }[], width: number, height: number) => void;
//   draw: (ctx: CanvasRenderingContext2D) => void;
// }

export interface LinkStyledProps {
  href: string;
  label: string;
}

export interface PerlinNoiseProps {
  p5Props?: any;
  backgroundColor?: string;
  particleColor?: string;
}

export interface CatalogLinkType {
  label: string;
  href: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  update: (
    field: { x: number; y: number }[],
    width: number,
    height: number
  ) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface PixelLetterProps {
  letter: string;
}

export interface LetterPattern {
  [key: string]: number[][];
}