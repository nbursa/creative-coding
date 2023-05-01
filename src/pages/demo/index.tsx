import Catalog from "@/components/Catalog";
import React from "react";
import PageHead from "@/components/PageHead";

const DemoPage = () => {
  const title = `Creative Coding | Demos`;
  const description = `Demos catalog`;

  return (
    <>
      <PageHead title={title} description={description}/>
      <h3 className="text-center text-4xl font-bold mt-14 mb-8">
        Demo components
      </h3>
      <Catalog className="w-full"/>
    </>
  )
}

export default DemoPage
