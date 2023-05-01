import ButtonCard from "@/components/ButtonCard";
import {CardsProp} from "@/types";

const Cards: React.FC<CardsProp> = ({title, description, className}) => {
  return (
    <div className={className}>
      {title && <h2>{title}</h2>}
      <ButtonCard title="Demo" description="Take a look at some demo components." href="/demo"/>
      <ButtonCard title="Games" description="Play games to learn Next.js in an interactive way."
                  href="/games"/>
      <ButtonCard title="AI" description="AI powered chatbot with GPT-3.5"
                  href="/ai"/>
      <ButtonCard title="Blog" description="Instantly deploy your site to a shareable URL."
                  href="/blog/1"/>
      {description && <p>{description}</p>}
    </div>
  )
}

export default Cards;