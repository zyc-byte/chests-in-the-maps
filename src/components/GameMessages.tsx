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
        return 'bg-green-500/30 backdrop-blur-xl border-green-400/50';
      case 'error':
        return 'bg-red-500/30 backdrop-blur-xl border-red-400/50';
      case 'warning':
        return 'bg-yellow-500/30 backdrop-blur-xl border-yellow-400/50';
      default:
        return 'bg-blue-500/30 backdrop-blur-xl border-blue-400/50';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto space-y-2 z-40">
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
