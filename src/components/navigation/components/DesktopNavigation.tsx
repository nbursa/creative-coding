import React from "react";
import Link from "next/link";
import Image from "next/image";
import {NavLink, navLinks} from "../config";

interface DesktopNavigationProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export async function getServerSideProps({}) {
  return {
    props: {},
    ssr: false,
  };
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({handleClick}) => {
  return (
    <>
      <div className="desk flex items-center justify-between px-4 z-30">
        <Link href="/" className="text-gray-500 font-medium hover:text-gray-300">
          <Image src="/logo.svg" alt="Logo" width={45} height={24}/>
        </Link>
      </div>
      <div className="desktop-nav hidden sm:inline-block w-fit px-8 py-4 z-10">
        <div className="flex justify-between">
          <div className="flex sm:items-center sm:ml-6 text-sm">
            {navLinks.map((link: NavLink, index: number) => (
              link.path !== "/" &&
              <Link href={link.path} key={index} className="text-gray-300 ml-3 hover:text-gray-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="mx-4 p-1 text-gray-500 sm:hidden border rounded z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
             className="">
          <path fill="#FFFFFF" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
    </>
  )
}

export default DesktopNavigation
