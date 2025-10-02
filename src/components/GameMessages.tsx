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
        return 'bg-green-600 border-green-700';
      case 'error':
        return 'bg-red-600 border-red-700';
      case 'warning':
        return 'bg-yellow-600 border-yellow-700';
      default:
        return 'bg-blue-600 border-blue-700';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto space-y-2 z-40">
      <div className="flex justify-between items-center mb-2 bg-gray-800 px-4 py-2 rounded-t-lg border-2 border-gray-700">
        <h3 className="text-white font-bold text-lg">📨 游戏消息</h3>
        <button
          onClick={clearMessages}
          className="text-white/70 hover:text-white transition-colors bg-red-600/50 hover:bg-red-600 px-2 py-1 rounded"
          title="清空消息"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${getMessageColor(message.type)} text-white px-4 py-3 rounded-lg border-2 shadow-xl animate-slide-in font-semibold`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default GameMessages;
