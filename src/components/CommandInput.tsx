import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Terminal, X, HelpCircle } from 'lucide-react';

interface CommandInputProps {
  onClose: () => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ onClose }) => {
  const [command, setCommand] = useState('');
  const { executeCommand, isCheatEnabled } = useGameStore();

  // 阻止游戏按键操作
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 阻止事件冒泡到游戏
      e.stopPropagation();
      
      // 如果按ESC，关闭面板
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // 捕获阶段拦截，优先级最高
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      if (!isCheatEnabled && !command.trim().startsWith('/help')) {
        alert('需要启用作弊模式才能使用指令！');
        return;
      }
      executeCommand(command);
      setCommand('');
    }
  };

  const commonCommands = [
    { cmd: '/help', desc: '显示帮助信息' },
    { cmd: '/tp <x> <y>', desc: '传送到指定坐标' },
    { cmd: '/give <item> <amount>', desc: '给予物品' },
    { cmd: '/heal', desc: '恢复生命值' },
    { cmd: '/kill <all/zombie/skeleton>', desc: '击杀指定实体' },
  ];

  const itemNames = [
    'cobblestone', 'coal', 'ironIngot', 'goldIngot', 'redstone',
    'lapisLazuli', 'emerald', 'diamond', 'enderPearl', 'healingPotion',
    'splashPotion', 'bread', 'flintAndSteel', 'netherQuartz', 'glowstone'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-4 border-cyan-500 rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            指令控制台
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isCheatEnabled && (
          <div className="bg-yellow-900/50 border-2 border-yellow-600 text-yellow-200 px-4 py-2 rounded-lg mb-4">
            ⚠️ 作弊模式未启用！只能使用 /help 指令
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="输入指令..."
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border-2 border-gray-700 focus:border-cyan-500 outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              执行
            </button>
          </div>
        </form>

        <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
          <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            常用指令
          </h3>
          <div className="space-y-2">
            {commonCommands.map((cmd, i) => (
              <div key={i} className="bg-gray-700 rounded p-2">
                <code className="text-green-400">{cmd.cmd}</code>
                <p className="text-gray-300 text-sm mt-1">{cmd.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-cyan-400 font-bold mt-4 mb-2">可用物品名称：</h3>
          <div className="flex flex-wrap gap-1">
            {itemNames.map((item) => (
              <span key={item} className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded">
                {item}
              </span>
            ))}
          </div>

          <h3 className="text-cyan-400 font-bold mt-4 mb-2">示例：</h3>
          <div className="space-y-1 text-gray-300 text-sm font-mono">
            <p>• /tp 5 5 - 传送到坐标(5, 5)</p>
            <p>• /give diamond 10 - 获得10个钻石</p>
            <p>• /kill zombie - 击杀所有僵尸</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandInput;
