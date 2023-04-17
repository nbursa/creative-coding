import LinkStyled from "@/components/LinkStyled";
import React from "react";
import {CatalogProps} from "@/types";
import {catalogLinks, CatalogLinkType} from "@/data";

const Catalog: React.FC<CatalogProps> = ({className}) => {
  return <div className={className}>
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:w-3/4 md:mx-auto">
      {catalogLinks.map((link: CatalogLinkType, index: number) => {
        return (
          <li key={index} className="mb-8 text-center text-base px-5 py-4">
            <LinkStyled href={link.href} label={link.label} className="ml-0"/>
          </li>
        )
      })}
    </ul>
  </div>
}

export default Catalog