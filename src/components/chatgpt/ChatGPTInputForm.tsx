import React, {useEffect, useRef, useState} from 'react';
import {apiConfig} from './config';
import {Configuration, OpenAIApi} from 'openai';

interface ConversationItem {
  userPrompt: string;
  aiResponse: string;
}

const configuration = new Configuration({
  apiKey: apiConfig.apiKey,
});
const openai = new OpenAIApi(configuration);

const ChatGPTInputForm: React.FC = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesElement = messagesRef.current;

    if (messagesElement) {
      messagesElement.scrollTop = messagesElement.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!input.trim()) return;

    let prompt = "Create a personalized ChatGPT model that imitates my writing style, interests, and communication preferences. Provide tips on how to effectively build and develop full stack applications using nodejs, javascript and css. My name is Nenad. \nUser: Who are you?\nAI: My name is Nenad, I am frontend developer from Belgrade, Serbia with 8 years of professional development experience working with popular frontend frameworks and libraries";

    const userPrompt = `${input}`;
    const aiPrompt = ``;

    prompt = `${prompt}\nUser: ${userPrompt}\nAI: ${aiPrompt}`
    const finalPrompt = `${prompt}`;

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: finalPrompt,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['\n'],
      });

      const aiResponse = response?.data?.choices?.[0]?.text?.trim() ?? "";

      // console.log("aiResponse", finalPrompt)

      const newItem: ConversationItem = {
        userPrompt: userPrompt,
        aiResponse: aiResponse,
      };

      setConversation((prevConversation) => [...prevConversation, newItem]);
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSubmit(event);
    }
  };

  return (
    <div className="w-full h-full p-4 justify-between">
      <div ref={messagesRef}
           className="min-h-[45vh] max-h-[45vh] grid grid-cols-1 overflow-hidden overflow-y-auto">
        {conversation.map((item, index) => (
          <div key={index}
               className="shrink mb-2 p-2 rounded-lg grid grid-cols-[15px_1fr] grid-rows-1 gap-2 max-w-full min-w-full max-h-min order-last">
            <div className="">{index + 1}</div>
            <div className="w-full h-full flex-wrap">
              <div className="grid gap-1 grid-cols-[50px_1fr]">
                <div className="">Q:</div>
                <div className="whitespace-pre break-words">{item.userPrompt}</div>
              </div>
              <div className="grid gap-1 grid-cols-[50px_1fr]">
                <div className="">AI:</div>
                <div className="">{item.aiResponse}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex justify-between items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask ChatGPT something..."
          className="w-full p-2 border border-[var(--color-gray)] bg-[var(--color-gray)] rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 text-white bg-[var(--color-gray)] rounded-lg hover:brightness-125 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatGPTInputForm;
