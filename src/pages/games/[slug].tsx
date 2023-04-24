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
    <Component/>
  );
};

export default GamesPage;
