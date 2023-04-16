import Catalog from "@/components/Catalog";
import React from "react";

const DemoPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-center text-4xl font-bold mt-8 mb-8">
        Demo components
      </h1>
      <Catalog className="w-full"/>
    </main>
  )
}

export default DemoPage
