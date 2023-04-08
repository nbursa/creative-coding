import React from "react";
import {useRouter} from "next/router";
import dynamic from 'next/dynamic'

const getComponent = (formatedSlug: string) => {
  const component = dynamic(import(`@/components/${formatedSlug}`))
  return component;
}

const DemoPage = () => {
  const router = useRouter();
  const slug = router.query?.slug;
  if (!slug) {
    return <div>Loading...</div>;
  }

  const formatedSlug = (slug as string)
    .split("-")
    .map(substr => substr.charAt(0).toUpperCase() + substr.slice(1))
    .join("");

  // console.log("joined: " + formatedSlug);
  const Component = getComponent(formatedSlug)

  return (
    <div className="relative mt-14">
      <h1 className="absolute top-2 left-1/2 -translate-x-1/2 text-blue-700">{formatedSlug}</h1>
      <Component/>
    </div>
  );
};

export default DemoPage;
