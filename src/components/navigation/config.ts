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
    path: "/space-invaders",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Chat",
    path: "/chat",
  },
  {
    label: "Deployment",
    path: "/deploy",
  }
]