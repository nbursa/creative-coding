import Catalog from "@/components/Catalog";
import React from "react";

const DemoPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h3 className="text-center text-4xl font-bold my-8">
        Demo components
      </h3>
      <Catalog className="w-full"/>
    </main>
  )
}

export default DemoPage
