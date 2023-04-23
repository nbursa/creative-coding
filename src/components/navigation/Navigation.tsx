import React, {useState} from 'react';
import {DesktopNavigation, MobileNavigation} from './components';

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav className="h-[56px] w-full flex items-center justify-between z-30">
        <DesktopNavigation handleClick={toggleDrawer}/>
        <MobileNavigation className={`${isDrawerOpen ? "absolute" : "hidden"}`} toggleDrawer={toggleDrawer}/>
      </nav>
    </>
  );
};

export default Navigation;
