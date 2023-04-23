import {Head, Html, Main, NextScript} from 'next/document'
import Navigation from "@/components/navigation/Navigation";
import HeadComponent from "@/components/Head";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HeadComponent/>
      </Head>
      <body>
      <Navigation/>
      <Main/>
      </body>
      <NextScript/>
    </Html>
  )
}
