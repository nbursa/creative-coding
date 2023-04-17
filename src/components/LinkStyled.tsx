import Link from "next/link";
import {LinkStyledProps} from "@/types";

const LinkStyled: React.FC<LinkStyledProps> = ({href, label, className}) => {
  return (
    <Link href={href}
          className={`text-gray-300 hover:text-gray-500 sm:ml-4 text-shadow ${className}`}>{label}</Link>
  )
}

export default LinkStyled