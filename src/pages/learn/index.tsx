import PageHead from "@/components/PageHead";
import React from "react";

const LearnPage = () => {
  const title = `Creative Coding | Learning`;
  const description = `Learning page`;

  return (
    <>
      <PageHead title={title} description={description}/>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h3 className="text-center text-4xl font-bold my-8">Learning</h3>
      </main>
    </>
  )
}

export default LearnPage
