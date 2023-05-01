import Head from "next/head";
import React from "react";

interface PageHeadProps {
  title?: string;
  description?: string;
}

const PageHead: React.FC<PageHeadProps> = ({title = "Empty page title", description = "Empty page description"}) => {
  return <Head>
    <title>{title}</title>
    <meta name="description" content={description}/>
  </Head>
}

export default PageHead;