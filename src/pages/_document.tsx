import {Head, Html, Main, NextScript} from 'next/document'
import Navigation from "@/pages/components/Navigation";

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
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
