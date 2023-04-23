import {useRouter} from "next/router";
import dynamic from 'next/dynamic'

// const getComponent = (formattedSlug: string) => {
//   return dynamic(import(`@/components/${formattedSlug}`));
// }

const GamesPage = () => {
  const router = useRouter();
  const slug = router.query?.slug;
  console.log("slug: ", slug)
  if (!slug) {
    return <div>Loading...</div>;
  }

  const formattedSlug = (slug as string)
    .split("-")
    .map(substr => substr.charAt(0).toUpperCase() + substr.slice(1))
    .join("");
  console.log("formattedSlug: ", formattedSlug)
  const Component = dynamic(import(`@/components/${formattedSlug}`));

  console.log("Component: ", Component)

  return (
    <div className="relative">
      <h1 className="fixed top-4 left-1/2 -translate-x-1/2 text-blue-700">{formattedSlug}</h1>
      <div className="w-full h-full flex justify-center items-center min-h-[calc(100vh-60px)]">
        <Component/>
      </div>
    </div>
  );
};

export default GamesPage;
