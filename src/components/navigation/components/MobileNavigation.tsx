import Link from "next/link";
import {NavLink, navLinks} from "../config";

interface MobileNavigationProps {
  handleLinkClick: () => void;
  isDrawerOpen: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({handleLinkClick, isDrawerOpen}) => {
  return (
    <nav
      className={`${isDrawerOpen ? "fixed" : "hidden"} mobile-nav top-0 left-0 z-40 bg-black/75 backdrop-blur-sm w-screen h-screen overflow-hidden overflow-y-auto sm:hidden`}>
      <div
        className="h-full w-full flex items-center justify-center">
        <button
          onClick={handleLinkClick}
          className="closing absolute top-4 right-8 text-gray-500 hover:text-gray-300 focus:outline-none z-50"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M6 6L18 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"></path>
            <path d="M6 18L18 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"></path>
          </svg>
        </button>
        <div className="relative">
          <div className="flex flex-col items-start -mt-4 space-y-4 text-2xl overflow-hidden overflow-y-auto">
            {navLinks.map((link: NavLink, index: number) => (
              <Link key={index} href={link.path} onClick={handleLinkClick}
                    className="text-gray-300 hover:text-gray-500 ml-4 active:text-yellow-300">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
