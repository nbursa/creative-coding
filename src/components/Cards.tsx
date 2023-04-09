import ButtonCard from "@/components/ButtonCard";

interface CardsProp {
  title?: string;
  description?: string;
  className?: string;
}

const Cards: React.FC<CardsProp> = ({title, description, className}) => {
  return (
    <div className={className}>
      {title && <h2>{title}</h2>}
      <ButtonCard title="Docs" description="Find in-depth information about Next.js features and API." href="/docs"/>
      <ButtonCard title="Learn" description="Learn about Next.js in an interactive course with&nbsp;quizzes!"
                  href="/learn"/>
      <ButtonCard title="Templates" description="Discover and deploy boilerplate example Next.js&nbsp;projects."
                  href="/demo"/>
      <ButtonCard title="Deploy" description="Instantly deploy your Next.js site to a shareable URL with Vercel."
                  href="/deploy"/>
      {description && <p>{description}</p>}
    </div>
  )
}

export default Cards;