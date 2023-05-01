export interface NavLink {
  label: string;
  path: string;
  blank?: boolean;
}

export const navLinks: NavLink[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Templates",
    path: "/demo",
  },
  {
    label: "Games",
    path: "/games",
  },
  {
    label: "Blog",
    path: "/blog/1",
  },
  {
    label: "AI",
    path: "/ai",
  },
  {
    label: "About",
    blank: true,
    path: "https://nenadbursac.com",
  }
]