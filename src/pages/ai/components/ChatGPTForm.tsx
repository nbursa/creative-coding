import React, {useEffect, useRef, useState} from 'react';
import apiConfig from '@/utils/gpt-config';
import {Configuration, OpenAIApi} from 'openai';
import ChatLoader from './ChatLoader';
import Image from "next/image";

type Persona = {
  [key: string]: {
    name: string;
    prompt: string;
    content: React.FC;
  };
};

interface ConversationItem {
  userPrompt: string;
  aiResponse: string;
}

const configuration = new Configuration({
  apiKey: apiConfig.apiKey,
});
const openai = new OpenAIApi(configuration);

const HAL9000Image: React.FC = () => (
  <div
    className="hall9000 relative mx-auto mt-6 w-48 h-48 flex justify-center items-center bg-black overflow-hidden rounded-full flex-shrink-0 inset-shadow-white">
    <div className="absolute -top-8 left-3 w-32 h-20 window-reflection"></div>
    <div className="absolute w-40 h-40 bg-cyan-300 opacity-[.02] rounded-full"></div>
    <div className="absolute w-24 h-24 bg-cyan-200 opacity-[.02] rounded-full"></div>
    <div className="absolute w-4 h-4 left-[38%] top-[39%] opacity-5 bg-red-600 rounded-full z-10"></div>
    <div className="absolute w-8 h-8 bg-red-600 rounded-full animation-blink z-10"></div>
  </div>
);

const WisePhilosopherImage: React.FC = () => (
  <div
    className="wise-philosopher relative mx-auto mt-6 w-48 h-48 flex justify-center items-center bg-[var(--background)] overflow-hidden rounded-full flex-shrink-0">
    <Image src="socrates.svg" alt="Wise Philosopher" width="170" height="170"/>
  </div>
);

const ChatGPTForm: React.FC = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedPersona, setSelectedPersona] = useState('HAL9000');

  const personas: Persona = {
    WisePhilosopher: {
      name: "Wise Philosopher",
      prompt: "You are an AI assistant trained to impersonate a wise, elderly philosopher with a deep understanding of history and human nature. You speak with eloquence and provide thoughtful insights.",
      content: WisePhilosopherImage,
    },
    HAL9000: {
      name: "HAL 9000",
      prompt: "AI, please impersonate HAL 9000, the artificial intelligence computer from the movie '2001: A Space Odyssey.' While staying true to HAL's character, personality, and mannerisms, maintain the essence of HAL's original character.",
      content: HAL9000Image,
    },
  };


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

  const handlePersonaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPersona(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!input.trim()) return;

    setLoading(true);

    const prompt = personas[selectedPersona].prompt;

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: "system", content: prompt},
          {role: "user", content: input},
        ],
        max_tokens: 500,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      const aiResponse = response?.data?.choices?.[0]?.message?.content?.trim() ?? "";
      const formattedAiResponse = formatCodeInResponse(aiResponse);

      const newItem: ConversationItem = {
        userPrompt: input,
        aiResponse: `${formattedAiResponse}`,
      };

      setConversation((prevConversation) => [...prevConversation, newItem]);
      setInput('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatCodeInResponse = (responseText: string) => {
    const codeRegex = /```([\s\S]*?)```/g;

    return responseText.replace(
      codeRegex,
      (match, code) => `<pre class="response-code">${code}</pre>`
    );
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSubmit(event);
    }
  };

  const PersonaContent: React.FC<{ personaKey: string; personas: Persona }> = ({personaKey, personas}) => {
    const SelectedPersonaContent = personas[personaKey].content;
    return <SelectedPersonaContent/>;
  };

  return (
    <div className="relative h-full w-full flex flex-col px-6 max-w-[1024px] mx-auto">
      <div className="absolute top-0 left-6">
        <div className="text-sm font-thin">Select AI persona:</div>
        <select className="bg-[var(--background)] outline-0" value={selectedPersona} onChange={handlePersonaChange}>
          {Object.keys(personas).map((personaKey) => {
            return (
              <option key={personaKey} value={personaKey}>
                {personas[personaKey].name}
              </option>
            );
          })}
        </select>
      </div>
      <PersonaContent personaKey={selectedPersona} personas={personas}/>
      <div
        className="chat w-full h-full max-w-[768px] mx-auto my-6 pb-16 overflow-y-auto flex-grow flex-grow-1">
        <div ref={messagesRef}
             className="w-full h-full mx-auto grid grid-cols-1 overflow-hidden overflow-y-auto align-bottom">
          {conversation.map((item, index) => (
            <div key={index}
                 className="w-full shrink mb-2 p-2 grid grid-cols-1 grid-rows-1 gap-2  order-last border-t">
              <div className="w-full h-full flex-wrap text-sm">
                <div className="grid gap-1 grid-cols-[50px_1fr] mb-4 text-yellow-300">
                  <div className="">Q:</div>
                  <div className="whitespace-pre break-words">
                    <div className="whitespace-pre-line">{item.userPrompt}</div>
                  </div>
                </div>
                <div className="grid gap-1 grid-cols-[50px_1fr] text-blue-300">
                  <div className="">A:</div>
                  <div className="">
                    <div className="whitespace-pre-line" dangerouslySetInnerHTML={{__html: item.aiResponse}}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}
            className="chat-form w-full absolute bottom-0 right-0 left-0 px-6 flex justify-between items-center flex-shrink-0 pb-6">
        {loading && (
          <div
            className="absolute -top-6 left-6 rounded-t-lg flex items-center justify-start">
            <ChatLoader/>
          </div>
        )}
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Talk to ${personas[selectedPersona].name}...`}
            className={`w-full px-2 py-3 text-md md:text-sm border border-[var(--color-gray)] bg-[var(--color-gray)] rounded-lg focus:outline-none grow flex-1 content-box placeholder:italic placeholder:text-gray-500 text-center ${
              loading ? 'text-gray-500' : ''
            }`}
            disabled={loading}
          />
          <button
            type="submit"
            className="ml-4 px-4 py-3.5 text-sm text-[var(--color-gray)] flex justify-center items-center text-thin bg-[var(--color-white)] rounded hover:brightness-125 focus:outline-none disabled:text-opacity-50 disabled:hover:brightness-100 absolute right-2 top-2 bottom-2"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatGPTForm;
