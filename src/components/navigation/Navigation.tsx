import React, {useState} from 'react';
import {DesktopNavigation, MobileNavigation} from './components';

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="flex items-center justify-between z-50">
      <DesktopNavigation handleClick={toggleDrawer}/>
      <MobileNavigation className={`${isDrawerOpen ? "absolute" : "hidden"}`} toggleDrawer={toggleDrawer}/>
    </nav>
  );
};

export default Navigation;
