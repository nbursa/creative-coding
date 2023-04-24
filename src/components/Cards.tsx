import ButtonCard from "@/components/ButtonCard";
import {CardsProp} from "@/types";

const Cards: React.FC<CardsProp> = ({title, description, className}) => {
  return (
    <div className={className}>
      {title && <h2>{title}</h2>}
      <ButtonCard title="Docs" description="Find in-depth information about Next.js features and API." href="/docs"/>
      <ButtonCard title="Games" description="Play games to learn Next.js in an interactive way."
                  href="/games"/>
      <ButtonCard title="AI" description="AI powered chatbot with GPT-3.5"
                  href="/ai"/>
      <ButtonCard title="Deploy" description="Instantly deploy your Next.js site to a shareable URL with Vercel."
                  href="/deploy"/>
      {description && <p>{description}</p>}
    </div>
  )
}

export default Cards;