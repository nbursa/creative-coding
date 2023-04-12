import React, {useEffect} from 'react';
import tw from 'tailwind-styled-components';
import {useRouter} from "next/router";

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

const JournalAuthor = tw.p`
  text-gray-600
  text-sm
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
  id: number | null;
  attributes: AttributesType | null;
}

const BlogPage: React.FC = () => {
  const {slug} = useRouter().query;
  console.log("slug: ", slug);
  const API_URL = `http://localhost:1337/api/blog-posts/${slug!}`;
  const token = "Bearer " + process.env.NEXT_PUBLIC_STRAPI_JWT_TOKEN;
  const [post, setPost] = React.useState<JournalEntryType>({id: null, attributes: null})

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            Authorization: token
          }
        });
        const {data} = await res.json();
        console.log("data: ", data);
        if (data) {
          setPost(data);
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
      <JournalEntry key={post.id}>
        <JournalTitle>{post?.attributes?.title}</JournalTitle>
        <JournalAuthor>{post?.attributes?.author}</JournalAuthor>
        <JournalDate>{post?.attributes?.createdAt}</JournalDate>
        <JournalContent>{post?.attributes?.content}</JournalContent>
      </JournalEntry>
    </PageWrapper>
  );
};

export default BlogPage;
