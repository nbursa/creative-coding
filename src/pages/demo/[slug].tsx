import {useRouter} from "next/router";
import dynamic from 'next/dynamic'

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

  return (
    <Component/>
  );
};

export default DemoPage;
