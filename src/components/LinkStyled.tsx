import Link from "next/link";
import {LinkStyledProps} from "@/types";

const LinkStyled: React.FC<LinkStyledProps> = ({href, label}) => {
  return (
    <Link href={href} className="text-gray-300 hover:text-gray-500 ml-4 text-shadow">{label}</Link>
  )
}

export default LinkStyled