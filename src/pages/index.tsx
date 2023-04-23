import Catalog from '@/components/Catalog'
import Cards from "@/components/Cards";

const Home = () => {
  return (
    <main className="flex flex-col h-full">
      <Catalog
        className="flex flex-1 flex-grow items-center lg:transform lg:-translate-y-[25%] mt-8 md:mb-32 lg:mb-0 md:mt-[15vh] w-full p-o sm:px-24 sm:py-8"/>
      <Cards
        className="mb-0 w-full bg-black/75 grid gap-2 xl:gap-4 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left"/>
    </main>
  )
}

export default Home;
