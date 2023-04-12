import Catalog from '@/components/Catalog'
import Cards from "@/components/Cards";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/*<AnimatedButton href="/" label="Some fansy cta" className="mb-4 md:mt-[20vh] font-mono text-sm md:hover:transform md:hover:-translate-y-0.5"/>*/}
      <Catalog className="mb-32 lg:mb-0 md:mt-[15vh] w-full"/>
      <Cards
        className="mb-32 w-full grid gap-2 md:gap-4 text-center lg:mb-0 md:grid-cols-2 lg:grid-cols-4 lg:text-left"/>
    </main>
  )
}

export default Home;
