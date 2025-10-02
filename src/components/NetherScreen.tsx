import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Direction } from '../types/game';
import GameMap from './GameMap';
import StatusBar from './StatusBar';
import InventoryPanel from './InventoryPanel';
import TutorialPanel from './TutorialPanel';
import { Package, BookOpen, UtensilsCrossed, ArrowLeft } from 'lucide-react';

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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

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
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer, openChest, attackMobs, exitNether]);

  // Check if player reached the exit door
  useEffect(() => {
    if (playerPos.x === 1 && playerPos.y === 1) {
      const leave = window.confirm('你已到达传送门！是否返回主世界？');
      if (leave) {
        exitNether();
      }
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
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-700 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-red-200 mb-2">下界 - THE NETHER</h1>
          <p className="text-red-300">小心熔岩僵尸！</p>
        </div>

        <StatusBar />

        <div className="mt-8 bg-black bg-opacity-50 rounded-xl p-6 shadow-2xl">
          <GameMap />
        </div>

        {/* Control buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setShowInventory(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            背包 (E)
          </button>
          <button
            onClick={() => setShowEatFood(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <UtensilsCrossed className="w-5 h-5" />
            吃东西 (Q)
          </button>
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            教程 (T)
          </button>
          <button
            onClick={exitNether}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            返回主世界 (R)
          </button>
        </div>

        {/* Modals */}
        {showInventory && <InventoryPanel onClose={() => setShowInventory(false)} />}
        {showTutorial && <TutorialPanel onClose={() => setShowTutorial(false)} />}

        {showEatFood && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 border-4 border-gray-600 rounded-xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-white mb-4">吃食物</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleEatFood('rottenFlesh')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                >
                  腐肉 ({inventory.rottenFlesh}) - 恢复1点饱食度
                </button>
                <button
                  onClick={() => handleEatFood('bread')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
                >
                  面包 ({inventory.bread}) - 恢复3点饱食度
                </button>
                <button
                  onClick={() => setShowEatFood(false)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
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
