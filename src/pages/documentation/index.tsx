import PageHead from "@/components/PageHead";
import React from "react";

const DocsPage = () => {
  const title = `Creative Coding | Documentation`;
  const description = `Documentation page`;

  return (
    <>
      <PageHead title={title} description={description}/>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h3 className="text-center text-4xl font-bold my-8">
          Documentation
        </h3>
      </main>
    </>
  )
}

export default DocsPage
