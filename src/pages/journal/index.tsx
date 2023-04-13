import React, {useEffect, useState} from "react";
import Link from "next/link";

interface AttributesType {
  author: string;
  content: string;
  published: string | null;
  slug: string;
  summary: string | null;
  title: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface JournalEntryType {
  id: number;
  attributes: AttributesType;
}

const JournalPage: React.FC<JournalEntryType> = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntryType[]>([]);
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
          setJournalEntries(data as JournalEntryType[]);
        } else {
          console.log("Invalid data format: ", data);
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchJournalEntries();
  }, []);

  return (
    <main
      className="w-full bg-black max-w-6xl mx-auto grid grid-cols-1 grid-rows-[masonry] gap-8 md:grid-cols-2 lg:grid-cols-4 p-8 pt-28"
      style={{gridTemplateRows: "masonry", alignItems: "start"}}>
      {journalEntries.length &&
        journalEntries.map((entry: JournalEntryType) => (
          <Link href={`/journal/${entry.id}`} key={entry.id} className="inline-block max-h-min">
            <div className="w-full border rounded-md shadow-md p-4">
              <h2 className="text-gray-300 text-2xl font-semibold mb-2">{entry.attributes.title}</h2>
              <p className="text-gray-100 text-sm mb-2">{entry.attributes.createdAt}</p>
              <p className="text-gray-300 leading-relaxed">{entry.attributes.summary}</p>
            </div>
          </Link>
        ))}
    </main>
  );
};

export default JournalPage;
