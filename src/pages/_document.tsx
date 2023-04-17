import {Head, Html, Main, NextScript} from 'next/document'
import Navigation from "@/components/navigation/Navigation";
import HeadComponent from "@/components/Head";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HeadComponent pageTitle="Home Page"/>
      </Head>
      <body className="absolute inset-0 overflow-hidden">
      <div className="grid-rows-2 h-full">
        <Navigation/>
        <Main/>
      </div>
      </body>
      <NextScript/>
    </Html>
  )
}
