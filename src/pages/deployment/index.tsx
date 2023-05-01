import PageHead from "@/components/PageHead";
import React from "react";

const DeployPage = () => {
  const title = `Creative Coding | Deploy`;
  const description = `Deployments page`;

  return (
    <>
      <PageHead title={title} description={description}/>
      <main className="flex flex-col items-center p-24">
        <h3 className="text-center text-4xl font-bold my-8">
          Deploy
        </h3>
      </main>
    </>
  )
}

export default DeployPage
