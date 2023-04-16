import Link from 'next/link'
import Image from 'next/image'
import {NavLink, navLinks} from "../config";

const DesktopNavigation = () => {
  return (
    <>
      <div className="flex-shrink-0 flex items-center px-8">
        <Link href="/" className="text-gray-500 font-medium hover:text-gray-300">
          <Image src="/logo.svg" alt="Logo" width={45} height={24}/>
        </Link>
      </div>
      <nav className="desktop-nav hidden sm:inline-block w-fit px-8 py-4">
        <div className="flex justify-between">
          <div className="hidden sm:flex sm:items-center sm:ml-6 text-sm">
            {navLinks.map((link: NavLink, index: number) => (
              link.path !== "/" &&
              <Link href={link.path} key={index} className="text-gray-300 ml-3 hover:text-gray-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default DesktopNavigation
