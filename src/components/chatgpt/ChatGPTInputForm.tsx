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
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.focus();
    }
  }, [input]);

  useEffect(() => {
    const messagesElement = messagesRef.current;

    if (messagesElement) {
      const lastMessageIndex = conversation.length - 1;
      const lastMessageElement = messagesElement.children[lastMessageIndex];

      if (lastMessageElement) {
        const lastMessageHeight = lastMessageElement.getBoundingClientRect().height;
        messagesElement.scrollTop = messagesElement.scrollHeight - lastMessageHeight;
      } else {
        messagesElement.scrollTop = messagesElement.scrollHeight;
      }
    }
  }, [conversation]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!input.trim()) return;

    setLoading(true);

    let prompt = "Create a personalized ChatGPT model that imitates my writing style, interests, and communication preferences. Provide tips on how to effectively build and develop full stack applications using nodejs, javascript and css. Provide any code from response wrapped in triple backticks (```). Your name is Nenad. \nUser: Who are you?\nAI: My name is Nenad, I am frontend developer from Belgrade, Serbia with 8 years of professional development experience working with popular frontend frameworks and libraries";

    const userPrompt = `User: ${input}`;
    const aiPrompt = `AI: `;
    const finalPrompt = `${prompt}\n${userPrompt}\n${aiPrompt}`;

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: "system", content: "You are a helpful assistant."},
          {role: "user", content: finalPrompt},
        ],
        max_tokens: 1000,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        // stop: ['\n'],
        // stop: ["User:"]
      });

      const aiResponse = response?.data?.choices?.[0]?.message?.content?.trim() ?? "";

      const newItem: ConversationItem = {
        userPrompt: userPrompt,
        aiResponse: aiResponse,
      };

      setConversation((prevConversation) => [...prevConversation, newItem]);
      setInput('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSubmit(event);
    }
  };

  return (
    <div className="w-full h-full md:p-4 justify-between">
      <div ref={messagesRef}
           className="h-[74vh] md:min-h-[60vh] md:max-h-[60vh] grid grid-cols-1 overflow-hidden overflow-y-auto">
        {loading && (
          <div
            className="absolute top-0 left-0 w-full flex items-center justify-center bg-[var(--background)]">
            <div className="loader"></div>
          </div>
        )}
        {conversation.map((item, index) => (
          <div key={index}
               className="shrink mb-2 p-2 grid grid-cols-1 grid-rows-1 gap-2 max-w-full min-w-full max-h-min order-last border-t">
            {/*<div className="text-xs">{index + 1}</div>*/}
            <div className="w-full h-full flex-wrap text-sm">
              <div className="grid gap-1 grid-cols-[50px_1fr] mb-4 text-yellow-300">
                <div className="">Q:</div>
                <div className="whitespace-pre break-words">
                  <pre className="whitespace-pre-line">{item.userPrompt}</pre>
                </div>
              </div>
              <div className="grid gap-1 grid-cols-[50px_1fr] text-blue-400">
                <div className="">AI:</div>
                <div className="">
                  <pre className="whitespace-pre-line">{item.aiResponse}</pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}
            className="fixed left-0 w-full p-4 bottom-0 md:relative flex justify-between items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask ChatGPT something..."
          className="w-full p-2 text-sm border border-[var(--color-gray)] bg-[var(--color-gray)] rounded-lg focus:outline-none"
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
