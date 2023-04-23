export interface NavLink {
  label: string;
  path: string;
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
    path: "/blog",
  },
  {
    label: "AI",
    path: "/ai",
  },
  {
    label: "Deployment",
    path: "/deployment",
  }
]