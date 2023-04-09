import Link from "next/link";

interface LinkStyledProps {
  href: string;
  label: string;
}

const LinkStyled: React.FC<LinkStyledProps> = ({href, label}) => {
  return (
    <Link href={href} className="text-white text-shadow">{label}</Link>
  )
}

export default LinkStyled