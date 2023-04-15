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

export interface CommentDataType {
  id?: number;
  attributes?: {
    body?: string;
    name?: string;
    publishedAt?: Date;
    createdAt?: Date;
    status?: string;
    IP?: string;
    agent?: string;
    parent?: CommentDataType | null;
    replies?: CommentDataType[] | undefined;
    blog_posts?: {
      id: number;
      title: string;
    }[];
  };
}

export interface BlogEntryAttributesType {
  title?: string;
  slug?: string;
  author?: string;
  publishedAt?: Date | null;
  createdAt?: Date | null;
  cover?: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
      // Add any other formats configured in Strapi
    };
  };
  content?: string;
  summary?: string | null;
  categories?: {
    id: number;
    name: string;
  }[];
  comment?: CommentDataType[];
  comments?: { data: CommentDataType[] };
}

export interface BlogEntryType {
  id: number | null;
  attributes: BlogEntryAttributesType | null;
  comments?: { data?: CommentDataType[] };
}