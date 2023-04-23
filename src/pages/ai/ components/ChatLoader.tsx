import React from "react";

const ChatLoader: React.FC = () => {
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

export default ChatLoader;