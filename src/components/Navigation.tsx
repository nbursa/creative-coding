import Link from 'next/link'
import Image from 'next/image'

const Navigation = () => {
  return (
    <nav className="bg-transparent shadow fixed w-full top-0 z-50">
      <div className="w-full px-8 py-4">
        <div className="flex justify-between">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" legacyBehavior>
              <a className="text-gray-500 font-medium hover:text-gray-300">
                <Image src="/logo.svg" alt="Logo" width={45} height={24}/>
              </a>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <Link href="/demo" className="text-gray-300 hover:text-gray-500 ml-4 active:text-yellow-300">
              Templates
            </Link>
            <Link href="/docs" className="text-gray-300 hover:text-gray-500 ml-4 active:text-yellow-300">
              Documentation
            </Link>
            <Link href="/learn" className="text-gray-300 hover:text-gray-500 ml-4 active:text-yellow-300">
              Learn
            </Link>
            <Link href="/deploy" className="text-gray-300 hover:text-gray-500 ml-4 active:text-yellow-300">
              Deployment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
