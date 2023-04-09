import LinkStyled from "@/components/LinkStyled";
import React from "react";
import {CatalogProps} from "@/types";

const Catalog: React.FC<CatalogProps> = ({className}) => {
  return <div className={className}>
    <ol>
      <li>
        <LinkStyled href="/demo/flow-field" label="Flow Field"/>
      </li>
      <li>
        <LinkStyled href="/demo/perlin-noise" label="Perlin Noise"/>
      </li>
      <li>
        <LinkStyled href="/demo/fractal-noise" label="Fractal Noise"/>
      </li>
    </ol>
  </div>
}

export default Catalog