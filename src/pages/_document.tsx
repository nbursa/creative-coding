import {Head, Html, Main, NextScript} from 'next/document'
import Navigation from "@/components/Navigation";
import HeadComponent from "@/components/Head";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HeadComponent pageTitle="Home Page"/>
      </Head>
      <body>
      <div className="grid-rows-2 h-full overflow-hidden">
        <Navigation/>
        <Main/>
      </div>
      </body>
      <NextScript/>
    </Html>
  )
}
