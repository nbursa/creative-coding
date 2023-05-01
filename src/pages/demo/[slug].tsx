import {useRouter} from "next/router";
import dynamic from 'next/dynamic'
import PageHead from "@/components/PageHead";
import React from "react";

const getComponent = (formattedSlug: string) => {
  return dynamic(import(`@/components/${formattedSlug}`));
}

const DemoPage = () => {
  const router = useRouter();
  const slug = router.query?.slug;
  if (!slug) {
    return <div>Loading...</div>;
  }

  const formattedSlug = (slug as string)
    .split("-")
    .map(substr => substr.charAt(0).toUpperCase() + substr.slice(1))
    .join("");

  const Component = getComponent(formattedSlug)

  const title = `Creative Coding | ${formattedSlug} Demo`;
  const description = `${formattedSlug} - Demo component`;

  return (
    <>
      <PageHead title={title} description={description}/>
      <Component/>
    </>
  );
};

export default DemoPage;
