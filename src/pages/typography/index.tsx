import TextFragments from "@/components/TextFragments";
import PageHead from "@/components/PageHead";
import React from "react";

const TypographyPage = () => {
  const title = `Creative Coding | Typography`;
  const description = `Typography page`;

  return (
    <>
      <PageHead title={title} description={description}/>
      <main className="flex h-screen flex-col items-center">
        <TextFragments/>
      </main>
    </>
  )
}
export default TypographyPage;