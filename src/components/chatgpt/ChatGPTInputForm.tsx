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

    const prompt = `As a helpful assistant, create a personalized ChatGPT model that imitates my writing style, interests, and communication preferences. Focus on providing practical advice and detailed examples when discussing various topics. Enclose any code snippets in triple backticks (\`\`\`).

      [User]: Who is Nenad Bursac?
      [AI]: Nenad is a frontend developer from Belgrade, Serbia, with 8 years of professional development experience working with popular frontend frameworks and libraries.`;

    const userPrompt = `[User]: ${input}`;
    const finalPrompt = `${prompt}\n${userPrompt}\n[AI]: `;

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
        aiResponse: `[AI]: ${formattedAiResponse}`,
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

  const Loader: React.FC = () => {
    return (
      <div className="flex items-baseline justify-start text-xs space-x-2 overflow-hidden py-1.5 px-3 rounded-lg">
        <span className="text-xs">Generating response</span>
        <span className="flex space-x-1">
        <span className="loader-dot w-1 h-1 bg-white rounded-full"></span>
        <span className="loader-dot w-1 h-1 bg-white rounded-full"></span>
        <span className="loader-dot w-1 h-1 bg-white rounded-full"></span>
      </span>
      </div>
    );
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSubmit(event);
    }
  };

  return (
    <div className="w-full h-full md:p-4 justify-between overflow-hidden">
      <div ref={messagesRef}
           className="h-[74vh] md:min-h-[60vh] md:max-h-[60vh] grid grid-cols-1 overflow-hidden overflow-y-auto">
        {conversation.map((item, index) => (
          <div key={index}
               className="shrink mb-2 p-2 grid grid-cols-1 grid-rows-1 gap-2 max-w-full min-w-full max-h-min order-last border-t">
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
      <form onSubmit={handleSubmit}
            className="fixed left-0 w-full p-4 bottom-0 md:relative flex justify-between items-center">
        {loading && (
          <div
            className="absolute -top-3 left-4 flex items-center justify-start bg-[var(--color-gray)] bg-opacity-90">
            <Loader/>
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

export default ChatGPTInputForm;
