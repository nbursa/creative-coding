import {DesktopNavigation, MobileNavigation} from "./components";
import {useState} from "react";

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleLinkClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="fixed bg-black/75 shadow w-full h-14 top-0 z-40 flex items-center justify-between">
      <DesktopNavigation/>
      <button
        onClick={handleLinkClick}
        className="mx-7 p-1 text-gray-500 hover:text-gray-300 focus:outline-none z-45 sm:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="#FFFFFF" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      <MobileNavigation handleLinkClick={handleLinkClick} isDrawerOpen={isDrawerOpen}/>
    </div>
  )
}

export default Navigation
