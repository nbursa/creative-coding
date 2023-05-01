import React from "react";
import ChatGPTForm from "@/pages/ai/components/ChatGPTForm";
import PageHead from "@/components/PageHead";
// import HeadComponent from "@/components/Head";

const ChatGptPage: React.FC = () => {
  const title = 'Creative Coding | AI';
  const description = 'AI powered chatbot with GPT-3.5';

  return (
    <>
      <PageHead title={title} description={description}/>
      <ChatGPTForm/>
    </>
  );
};

export default ChatGptPage;