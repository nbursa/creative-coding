import {useRouter} from "next/router";
import {Inter} from 'next/font/google'
import React from "react";

interface ButtonCardProps {
  href: string;
  title: string;
  description: string;
}

const inter = Inter({subsets: ['latin']})

const ButtonCard: React.FC<ButtonCardProps> = ({href, title, description}) => {
  const router = useRouter()

  const goTo = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault()
    return router.push(url)
  }

  return (
    <button
      onClick={(e) => goTo(e, href)}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      rel="noopener noreferrer"
    >
      <div className={`${inter.className} mb-3 text-2xl font-semibold text-left`}>
        {title}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
      </div>
      <p
        className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50 text-left`}
      >
        {description}
      </p>
    </button>
  )
}

export default ButtonCard