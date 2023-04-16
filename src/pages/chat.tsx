import React from 'react';
import ChatGPTInputForm from '@/components/chatgpt/ChatGPTInputForm';

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-16 md:p-24 md:pb-0">
      <h1 className="text-center text-4xl font-bold mt-4 md:mt-8 mb-4">
        ChatGPT API
      </h1>
      <div className="relative w-full h-full max-w-2xl mx-auto">
        <ChatGPTInputForm/>
      </div>
    </main>
  );
};

export default Home;
