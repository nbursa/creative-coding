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
    label: "Documentation",
    path: "/docs",
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