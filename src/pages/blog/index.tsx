import React, {useEffect, useState} from "react";
import Link from "next/link";
import {BlogEntryType} from "@/types";
import PageHead from "@/components/PageHead";


const BlogPage: React.FC<BlogEntryType> = () => {
  const [journalEntries, setJournalEntries] = useState<BlogEntryType[]>([]);
  const API_URL = "http://localhost:1337/api/blog-posts";
  const token = "Bearer " + process.env.NEXT_PUBLIC_STRAPI_JWT_TOKEN;

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            Authorization: token,
          },
        });
        const {data} = await res.json();
        if (Array.isArray(data)) {
          setJournalEntries(data as BlogEntryType[]);
        } else {
          console.log("Invalid data format: ", data);
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchJournalEntries();
  }, [token]);

  const title = 'Creative Coding | Articles';
  const description = 'Creative Coding blog posts';

  return (
    <>
      <PageHead title={title} description={description}/>
      <h3 className="text-center text-4xl font-bold my-8">Blog</h3>
      {journalEntries.length &&
        journalEntries.map((entry: BlogEntryType) => (
          <Link href={`/blog/${entry.id}`} key={entry.id}
                className="group inline-block max-h-min hover:transform hover:-translate-y-2">
            <div
              className="w-full border border-[var(--color-gray)] rounded-md shadow-md p-4 group-hover:shadow-[0_0_10px_10px_rgba(255,255,255,0.005)]">
              <h2 className="text-gray-300 text-2xl font-semibold mb-2">{entry?.attributes?.title}</h2>
              <p
                className="text-gray-100 mb-2 text-xs">{entry?.attributes?.createdAt ? new Date(entry.attributes.createdAt).toLocaleDateString() : ""}</p>
              <p className="text-gray-300 leading-relaxed text-sm">{entry?.attributes?.summary}</p>
            </div>
          </Link>
        )) || <div className="w-screen h-full flex justify-center items-center">No journal entries found.</div>}
    </>
  );
};

export default BlogPage;
