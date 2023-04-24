import React from 'react'
import Link from "next/link";
import {AnimatedButtonProps} from "@/types";

const AnimatedButton: React.FC<AnimatedButtonProps> = ({label = "Some CTA Label", href = "/", className}) => {

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Link href={href}
            className={`relative bg-transparent text-white font-medium py-2 px-4 rounded-md hover:shadow-lg ${className}`}>
        {label}
        <div
          className="absolute inset-0 rounded-md border-0 border-purple-600 border-opacity-0 animate-pulse-shadow"></div>
        <div
          className="absolute inset-0 rounded-md border z-4 border-purple-600 border-opacity-0 animate-border-rgb"></div>
      </Link>
    </div>
  )
}

export default AnimatedButton
