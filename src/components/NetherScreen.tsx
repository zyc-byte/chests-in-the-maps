import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Direction } from '../types/game';
import GameMap from './GameMap';
import StatusBar from './StatusBar';
import InventoryPanel from './InventoryPanel';
import TutorialPanel from './TutorialPanel';
import { Package, BookOpen, UtensilsCrossed, ArrowLeft, Terminal } from 'lucide-react';
import CommandInput from './CommandInput';

const NetherScreen: React.FC = () => {
  const {
    movePlayer,
    openChest,
    attackMobs,
    eatFood,
    exitNether,
    playerPos,
    inventory,
  } = useGameStore();

  const [showInventory, setShowInventory] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showEatFood, setShowEatFood] = useState(false);
  const [showCommand, setShowCommand] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === '/' || key === 'e' || key === 'q' || key === 't') {
        e.preventDefault();
      }

      switch (key) {
        case 'w':
          movePlayer(Direction.NORTH);
          break;
        case 's':
          movePlayer(Direction.SOUTH);
          break;
        case 'a':
          movePlayer(Direction.WEST);
          break;
        case 'd':
          movePlayer(Direction.EAST);
          break;
        case 'o':
          openChest();
          break;
        case 'k':
          attackMobs();
          break;
        case 'e':
          setShowInventory(true);
          break;
        case 'q':
          setShowEatFood(true);
          break;
        case 't':
          setShowTutorial(true);
          break;
        case 'r':
          exitNether();
          break;
        case '/':
          setShowCommand(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer, openChest, attackMobs, exitNether]);

  // Check if player reached the exit door - auto trigger shop
  useEffect(() => {
    if (playerPos.x === 1 && playerPos.y === 1) {
      // 直接退出下界，显示商店
      exitNether();
    }
  }, [playerPos, exitNether]);

  const handleEatFood = (food: 'rottenFlesh' | 'bread') => {
    const amount = parseInt(prompt(`要吃多少个${food === 'rottenFlesh' ? '腐肉' : '面包'}？`) || '0');
    if (amount > 0) {
      eatFood(food, amount);
      setShowEatFood(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 via-orange-700 to-red-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-red-400 mb-2">下界 - THE NETHER</h1>
          <p className="text-red-300">小心熔岩僵尸！</p>
        </div>

        <StatusBar />

        <div className="mt-8 bg-white/10 backdrop-blur-3xl rounded-3xl p-6 shadow-2xl border border-white/30">
          <GameMap />
        </div>

        {/* Control buttons with glassmorphism container */}
        <div className="mt-6 bg-white/10 backdrop-blur-3xl border border-white/30 rounded-3xl p-4 shadow-xl">
          <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setShowInventory(true)}
            className="bg-blue-500/70 backdrop-blur-lg border border-blue-400/40 hover:bg-blue-600/70 hover:border-blue-400/60 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            背包 (E)
          </button>
          <button
            onClick={() => setShowEatFood(true)}
            className="bg-orange-500/70 backdrop-blur-lg border border-orange-400/40 hover:bg-orange-600/70 hover:border-orange-400/60 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <UtensilsCrossed className="w-5 h-5" />
            吃东西 (Q)
          </button>
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-green-500/70 backdrop-blur-lg border border-green-400/40 hover:bg-green-600/70 hover:border-green-400/60 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            教程 (T)
          </button>
          <button
            onClick={() => setShowCommand(true)}
            className="bg-cyan-500/70 backdrop-blur-lg border border-cyan-400/40 hover:bg-cyan-600/70 hover:border-cyan-400/60 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Terminal className="w-5 h-5" />
            指令 (/)
          </button>
          <button
            onClick={exitNether}
            className="bg-purple-500/70 backdrop-blur-lg border border-purple-400/40 hover:bg-purple-600/70 hover:border-purple-400/60 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            返回主世界 (R)
          </button>
          </div>
        </div>

        {/* Modals */}
        {showInventory && <InventoryPanel onClose={() => setShowInventory(false)} />}
        {showTutorial && <TutorialPanel onClose={() => setShowTutorial(false)} />}
        {showCommand && <CommandInput onClose={() => setShowCommand(false)} />}

        {showEatFood && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-3xl border border-white/40 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-200 mb-4">吃食物</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleEatFood('rottenFlesh')}
                  className="w-full bg-green-500/80 backdrop-blur-md hover:bg-green-600/80 text-white py-3 rounded-2xl font-semibold"
                >
                  腐肉 ({inventory.rottenFlesh}) - 恢复1点饱食度
                </button>
                <button
                  onClick={() => handleEatFood('bread')}
                  className="w-full bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 text-white py-3 rounded-2xl font-semibold"
                >
                  面包 ({inventory.bread}) - 恢复3点饱食度
                </button>
                <button
                  onClick={() => setShowEatFood(false)}
                  className="w-full bg-gray-400/80 backdrop-blur-md hover:bg-gray-500/80 text-white py-3 rounded-2xl font-semibold"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetherScreen;
