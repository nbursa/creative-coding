import React, {useEffect, useState} from 'react';
import tw from 'tailwind-styled-components';
import Link from "next/link";

const PageWrapper = tw.main`
  w-full
  min-h-screen
  bg-black
  flex
  flex-col
  justify-center
  items-center
  py-8
`;

const JournalEntry = tw.div`
  w-full
  max-w-md
  bg-white
  rounded-md
  shadow-md
  p-4
  mb-4
`;

const JournalTitle = tw.h2`
  text-gray-800
  text-2xl
  font-semibold
  mb-2
`;

const JournalDate = tw.p`
  text-gray-600
  text-sm
  mb-2
`;

const JournalContent = tw.p`
  text-gray-800
  leading-relaxed
`;

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
            Authorization: token
          }
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
    <PageWrapper>
      {journalEntries.length && journalEntries.map((entry: JournalEntryType) => (
        <Link href={`/journal/${entry.id}`} key={entry.id}>
          <JournalEntry>
            <JournalTitle>{entry.attributes.title}</JournalTitle>
            <JournalDate>{entry.attributes.createdAt}</JournalDate>
            <JournalContent>{entry.attributes.summary}</JournalContent>
          </JournalEntry>
        </Link>
      ))}
    </PageWrapper>
  );
};

export default JournalPage;
