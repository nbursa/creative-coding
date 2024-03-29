import Link from "next/link";
import {NavLink, navLinks} from "../config";
import React from "react";

interface MobileNavigationProps {
  toggleDrawer: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className: string;
}

export async function getServerSideProps({}) {
  return {
    props: {},
    ssr: false,
  };
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({toggleDrawer, className}) => {
  const handleClickLink = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    toggleDrawer(e);
  };

  return (
    <div
      className={`${className} mobile-nav top-0 left-0 z-40 bg-black/75 backdrop-blur-sm w-screen h-screen overflow-hidden overflow-y-auto lg:hidden`}>
      <div
        className="h-full w-full flex items-center justify-center">
        <button
          type="button"
          onClick={toggleDrawer}
          className="closing border border-amber-100 p-1 rounded absolute top-[11px] right-4 text-gray-500 hover:text-gray-300 focus:outline-none z-50"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M6 6L18 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"></path>
            <path d="M6 18L18 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className="relative">
          <div className="flex flex-col items-start -mt-24 space-y-12 text-2xl overflow-hidden overflow-y-auto">
            {navLinks.map((link: NavLink, index: number) => (
              <Link key={index} href={link.path}
                    className="text-gray-300 hover:text-gray-500 ml-4 active:text-yellow-300" legacyBehavior>
                <a onClick={handleClickLink} target={link.blank ? 'blank' : undefined}>{link.label}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
