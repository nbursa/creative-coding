import React, {useEffect, useRef, useState} from 'react';
import {apiConfig} from './config';
import {Configuration, OpenAIApi} from 'openai';
import ChatLoader from './ChatLoader';

interface ConversationItem {
  userPrompt: string;
  aiResponse: string;
}

const configuration = new Configuration({
  apiKey: apiConfig.apiKey,
});
const openai = new OpenAIApi(configuration);

const ChatGPTForm: React.FC = () => {
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

    const prompt = `AI, please impersonate HAL 9000, the artificial intelligence computer from the movie '2001: A Space Odyssey.' While staying true to HAL's character, personality, and mannerisms, please incorporate a light-hearted and humorous twist in your responses in every 7th response. Keep the humor subtle and maintain the essence of HAL's original character.`;

    const userPrompt = `${input}`;
    const finalPrompt = `${prompt}\n${userPrompt}\n `;

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: "system", content: "You are a helpful assistant."},
          {role: "user", content: finalPrompt},
        ],
        max_tokens: 500,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        // stop: ['\n'],
        // stop: ["User:"]
      });

      const aiResponse = response?.data?.choices?.[0]?.message?.content?.trim() ?? "";
      const formattedAiResponse = formatCodeInResponse(aiResponse);

      const newItem: ConversationItem = {
        userPrompt: userPrompt,
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

  return (
    <div className="relative h-full w-full flex flex-col px-6 max-w-[768px] mx-auto">
      <div
        className="hall9000 relative mx-auto mt-6 w-48 h-48 flex justify-center items-center bg-black overflow-hidden rounded-full flex-shrink-0 inset-shadow-white">
        <div className="absolute -top-8 left-3 w-32 h-20 window-reflection"></div>
        <div className="absolute w-40 h-40 bg-cyan-300 opacity-[.02] rounded-full"></div>
        <div className="absolute w-24 h-24 bg-cyan-200 opacity-[.02] rounded-full"></div>
        <div
          className="absolute w-4 h-4 left-[38%] top-[39%] opacity-5 bg-red-600 rounded-full z-10"></div>
        <div className="absolute w-8 h-8 bg-red-600 rounded-full animation-blink z-10"></div>
      </div>
      <div
        className="chat w-full h-full max-w-[468px] mx-auto my-6 overflow-y-auto flex-grow-1">
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
            className="chat-form w-full relative absolute bottom-0 flex justify-between items-center flex-shrink-0 pb-6">
        {loading && (
          <div
            className="absolute -top-5 left-0 rounded-lg flex items-center justify-start bg-[var(--color-gray)] bg-opacity-90">
            <ChatLoader/>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask ChatGPT something..."
          className={`w-full px-2 py-3 text-md md:text-sm border border-[var(--color-gray)] bg-[var(--color-gray)] rounded-lg focus:outline-none grow flex-1 content-box placeholder:italic placeholder:text-gray-500 ${
            loading ? 'text-gray-500' : ''
          }`}
          disabled={loading}
        />
        <button
          type="submit"
          className="ml-4 px-4 py-3.5 text-sm text-white text-thin bg-[var(--color-gray)] rounded-lg hover:brightness-125 focus:outline-none disabled:text-opacity-50 disabled:hover:brightness-100"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatGPTForm;
