import React from "react";
import {useRouter} from "next/router";
import dynamic from 'next/dynamic'

const getComponent = (formatedSlug: string) => {
  return dynamic(import(`@/components/${formatedSlug}`));
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

  const Component = getComponent(formatedSlug)

  return (
    <div className="relative mt-14">
      <h1 className="fixed top-4 left-1/2 -translate-x-1/2 text-blue-700">{formatedSlug}</h1>
      <div className="w-full h-full flex justify-center items-center min-h-[calc(100vh-60px)]">
        <Component/>
      </div>
    </div>
  );
};

export default DemoPage;
