import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Terminal, X, HelpCircle } from 'lucide-react';

interface CommandInputProps {
  onClose: () => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ onClose }) => {
  const [command, setCommand] = useState('/');
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
    if (command.trim() && command.trim() !== '/') {
      if (!isCheatEnabled && !command.trim().startsWith('/help')) {
        alert('需要启用作弊模式才能使用指令！');
        return;
      }
      executeCommand(command);
      setCommand('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 确保总是以'/'开头
    if (value === '' || !value.startsWith('/')) {
      setCommand('/');
    } else {
      setCommand(value);
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md border-4 border-cyan-400 rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-cyan-600 flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            指令控制台
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isCheatEnabled && (
          <div className="bg-yellow-100/70 backdrop-blur-sm border-2 border-yellow-400 text-yellow-800 px-4 py-2 rounded-2xl mb-4">
            ⚠️ 作弊模式未启用！只能使用 /help 指令
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={command}
              onChange={handleInputChange}
              placeholder="/输入指令..."
              className="flex-1 bg-white/80 text-gray-800 px-4 py-2 rounded-2xl border-2 border-gray-300 focus:border-cyan-500 outline-none"
              autoFocus
              onFocus={(e) => {
                // 将光标移到末尾
                const len = e.target.value.length;
                e.target.setSelectionRange(len, len);
              }}
            />
            <button
              type="submit"
              className="bg-cyan-500/80 backdrop-blur-md hover:bg-cyan-600/80 text-white px-6 py-2 rounded-2xl font-semibold transition-colors"
            >
              执行
            </button>
          </div>
        </form>

        <div className="bg-blue-50/70 backdrop-blur-sm rounded-2xl p-4 max-h-96 overflow-y-auto border border-blue-200">
          <h3 className="text-cyan-600 font-bold mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            常用指令
          </h3>
          <div className="space-y-2">
            {commonCommands.map((cmd, i) => (
              <div key={i} className="bg-blue-100/70 rounded-xl p-2">
                <code className="text-green-600">{cmd.cmd}</code>
                <p className="text-gray-700 text-sm mt-1">{cmd.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-cyan-600 font-bold mt-4 mb-2">可用物品名称：</h3>
          <div className="flex flex-wrap gap-1">
            {itemNames.map((item) => (
              <span key={item} className="bg-blue-100/70 text-xs text-gray-700 px-2 py-1 rounded-xl">
                {item}
              </span>
            ))}
          </div>

          <h3 className="text-cyan-600 font-bold mt-4 mb-2">示例：</h3>
          <div className="space-y-1 text-gray-700 text-sm font-mono">
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
