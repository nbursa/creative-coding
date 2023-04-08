import React from 'react'
import Link from "next/link";

interface AnimatedButtonProps {
  href: string;
  label: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({label, href}) => {
  return (
    <Link href={href}
          className="relative bg-transparent text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      {label}
      <div
        className="absolute inset-0 rounded-md border-0 border-purple-600 border-opacity-0 animate-pulse-shadow"></div>
      <div
        className="absolute inset-0 rounded-md border z-4 border-purple-600 border-opacity-0 animate-border-rgb"></div>
    </Link>
  )
}

export default AnimatedButton
