import Cards from "@/components/Cards";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from "react";
import PageHead from "@/components/PageHead";

const PerlinNoise = dynamic(() => import("@/components/PerlinNoise"), {
  ssr: false,
});

const Typing = ({text, duration = 1000}: { text: string; duration?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 250;

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prevText) => prevText + text.charAt(currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [text, delay, currentIndex]);

  return <div className="text-[18vw] text-white font-extrabold text-shadow-yellow z-10">{displayText}</div>;
};

const title = 'Creative Coding | Homepage';
const description = 'Homepage description';

const Home = () => {
  return (
    <>
      <PageHead title={title} description={description}/>
      <div className="grid grid-cols-1 grid-rows-[1fr_auto] h-full">
        <PerlinNoise particleColor={"#404244"} backgroundColor={"#03050B"}/>
        <div className="flex items-center justify-center w-full h-full flex-grow">
          <Typing text="Hello world" duration={1000}/>
        </div>
        <Cards
          className="mb-0 w-full bg-black/75 grid gap-2 xl:gap-4 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left z-10"
        />
      </div>
    </>
  );
};

export default Home;
