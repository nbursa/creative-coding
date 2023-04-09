import Catalog from '@/components/Catalog'
import AnimatedButton from "@/components/AnimatedButton";
import ButtonCard from "@/components/ButtonCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <AnimatedButton href="/" label="home"/>
        <div
          className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://nenadbursac.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}Nenad
          </Link>
        </div>
      </div>

      <Catalog/>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <ButtonCard title="Docs" description="Find in-depth information about Next.js features and API." href="/docs"/>
        <ButtonCard title="Learn" description="Learn about Next.js in an interactive course with&nbsp;quizzes!"
                    href="/learn"/>
        <ButtonCard title="Templates" description="Discover and deploy boilerplate example Next.js&nbsp;projects."
                    href="/demo"/>
        <ButtonCard title="Deploy" description="Instantly deploy your Next.js site to a shareable URL with Vercel."
                    href="/deploy"/>
      </div>
    </main>
  )
}
