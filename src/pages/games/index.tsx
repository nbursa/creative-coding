import Link from "next/link";
import PageHead from "@/components/PageHead";
import React from "react";

const GamesPage = () => {
  const title = `Creative Coding | Games`;
  const description = `Games catalog`;

  return (
    <>
      <PageHead title={title} description={description}/>
      <h3 className="text-center text-4xl font-bold my-8">Games</h3>
      <ul className="flex-col items-center justify-center">
        <li className="text-center text-base font-bold my-8">
          <Link href={"/games/space-invaders"}>
            Space Invaders
          </Link>
        </li>
        <li className="text-center text-base font-bold my-8">
          <Link href={"/games/snake-game"}>
            Snake
          </Link>
        </li>
        <li className="text-center text-base font-bold my-8">
          <Link href={"/games/flight"}>
            Flight
          </Link>
        </li>
      </ul>
    </>
  )
}
export default GamesPage;