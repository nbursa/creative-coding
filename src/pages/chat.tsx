import ChatGPTInputForm from '@/components/chatgpt/ChatGPTInputForm';

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h3 className="text-center text-4xl font-bold mt-16">
        ChatGPT API
      </h3>
      {/*<div className="relative w-full h-full max-w-2xl mx-auto">*/}
      <ChatGPTInputForm/>
      {/*</div>*/}
    </main>
  );
};

export default Home;
