import LinkStyled from "@/components/LinkStyled";
import React from "react";
import {CatalogProps} from "@/types";
import {catalogLinks} from "@/data";

const Catalog: React.FC<CatalogProps> = ({className}) => {
  return <div className={className}>
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:max-w-">
      {catalogLinks.map(({label, href}, index) => {
        return (
          <li key={index} className="mb-8 text-center md:text-left text-2xl px-5 py-4">
            <LinkStyled href={href} label={label}/>
          </li>
        )
      })}
    </ul>
  </div>
}

export default Catalog