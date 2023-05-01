import {Head, Html, Main, NextScript} from 'next/document';
import HeadComponent from '@/components/Head';

const Document = () => {
  const defaultTitle = 'Creative Coding';
  const defautDescription = 'Creative coding - nodejs application';

  return (
    <Html lang="en">
      <Head>
        <HeadComponent pageTitle={defaultTitle} description={defautDescription}/>
      </Head>
      <body>
      <Main/>
      </body>
      <NextScript/>
    </Html>
  );
};

export default Document;
