import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { X } from 'lucide-react';

const GameMessages: React.FC = () => {
  const { messages, clearMessages, removeMessage } = useGameStore();

  // 自动移除3秒前的消息
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      messages.forEach((message) => {
        if (currentTime - message.timestamp > 3000) {
          removeMessage(message.id);
        }
      });
    }, 500); // 每0.5秒检查一次

    return () => clearInterval(interval);
  }, [messages, removeMessage]);

  if (messages.length === 0) return null;

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90 backdrop-blur-md border-green-400';
      case 'error':
        return 'bg-red-500/90 backdrop-blur-md border-red-400';
      case 'warning':
        return 'bg-yellow-500/90 backdrop-blur-md border-yellow-400';
      default:
        return 'bg-blue-500/90 backdrop-blur-md border-blue-400';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto space-y-2 z-40">
      <div className="flex justify-between items-center mb-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-t-2xl border-2 border-gray-300">
        <h3 className="text-gray-800 font-bold text-lg">📨 游戏消息</h3>
        <button
          onClick={clearMessages}
          className="text-gray-600 hover:text-gray-800 transition-colors bg-red-500/80 hover:bg-red-600/80 px-2 py-1 rounded-xl"
          title="清空消息"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${getMessageColor(message.type)} text-white px-4 py-3 rounded-2xl border-2 shadow-xl animate-slide-in font-semibold`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default GameMessages;
