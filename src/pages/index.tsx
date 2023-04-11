import Catalog from '@/components/Catalog'
import AnimatedButton from "@/components/AnimatedButton";
import Cards from "@/components/Cards";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AnimatedButton href="/" label="Some fansy cta"
                      className="mb-4 md:mt-[20vh] font-mono text-sm md:hover:transform md:hover:-translate-y-0.5"/>
      <Catalog className="mb-8 w-full"/>
      <Cards className="mb-32 grid text-center lg:mb-0 md:grid-cols-2 lg:grid-cols-4 lg:text-left"/>
    </main>
  )
}

export default Home;
