import {Head, Html, Main, NextScript} from 'next/document'
import HeadComponent from "@/components/Head";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HeadComponent/>
      </Head>
      <body>
      <Main/>
      </body>
      <NextScript/>
    </Html>
  )
}
