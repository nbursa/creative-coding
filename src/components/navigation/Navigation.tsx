import React, {useState} from 'react';
import {DesktopNavigation, MobileNavigation} from './components';

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("handleLinkClick: ", e.currentTarget);
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="bg-black/75 w-full h-full flex items-center justify-between z-30">
      <DesktopNavigation/>
      {/*<button*/}
      {/*  onClick={(e) => {*/}
      {/*    console.log("handleLinkClick: ", e.currentTarget);*/}
      {/*    toggleDrawer(e);*/}
      {/*  }}*/}
      {/*  className="mx-7 p-1 text-gray-500 sm:hidden border rounded z-40"*/}
      {/*>*/}
      {/*  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"*/}
      {/*       className="pointer-events-none">*/}
      {/*    <path fill="#FFFFFF" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>*/}
      {/*  </svg>*/}
      {/*</button>*/}
      <MobileNavigation className={`${isDrawerOpen ? "absolute" : "hidden"}`} toggleDrawer={toggleDrawer}/>
    </nav>
  );
};

export default Navigation;
