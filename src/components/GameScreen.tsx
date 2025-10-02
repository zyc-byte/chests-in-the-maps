import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Direction } from '../types/game';
import GameMap from './GameMap';
import StatusBar from './StatusBar';
import InventoryPanel from './InventoryPanel';
import ShopPanel from './ShopPanel';
import TutorialPanel from './TutorialPanel';
import GameMessages from './GameMessages';
import CommandInput from './CommandInput';
import { Package, BookOpen, UtensilsCrossed, Sparkles, ArrowLeft, Terminal } from 'lucide-react';

const GameScreen: React.FC = () => {
  const {
    movePlayer,
    openChest,
    attackMobs,
    applyItem,
    eatFood,
    toggleDebug,
    setCurrentScreen,
    playerPos,
    mapSize,
    isDoorActivated,
    inventory,
    isDebugMode,
  } = useGameStore();

  const [showInventory, setShowInventory] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showUseItem, setShowUseItem] = useState(false);
  const [showEatFood, setShowEatFood] = useState(false);
  const [showCommand, setShowCommand] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // 防止打开命令面板时也触发其他功能
      if (key === '/' || key === 'e' || key === 'u' || key === 'q' || key === 't') {
        e.preventDefault(); // 阻止默认行为
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
        case 'u':
          setShowUseItem(true);
          break;
        case 'q':
          setShowEatFood(true);
          break;
        case 't':
          setShowTutorial(true);
          break;
        case 'r':
          setCurrentScreen('menu');
          break;
        case '1':
          toggleDebug();
          break;
        case '/':
          setShowCommand(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer, openChest, attackMobs, setCurrentScreen, toggleDebug]);

  // Check if player reached the door - now shows victory shop
  useEffect(() => {
    if (playerPos.x === mapSize - 1 && playerPos.y === mapSize - 1 && !showShop) {
      // 直接显示全屏商店，不再弹窗询问
      setShowShop(true);
    }
  }, [playerPos, mapSize, showShop]);

  const handleUseItem = (item: keyof typeof inventory) => {
    if (inventory[item] > 0) {
      applyItem(item);
      setShowUseItem(false);
    } else {
      alert('该道具数量不足！');
    }
  };

  const handleEatFood = (food: 'rottenFlesh' | 'bread') => {
    const amount = parseInt(prompt(`要吃多少个${food === 'rottenFlesh' ? '腐肉' : '面包'}？`) || '0');
    if (amount > 0) {
      eatFood(food, amount);
      setShowEatFood(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-green-400 p-8">
      <div className="max-w-7xl mx-auto">
        <StatusBar />

        <div className="mt-8 bg-white bg-opacity-90 rounded-xl p-6 shadow-2xl">
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
            onClick={() => setShowUseItem(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            使用道具 (U)
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
            onClick={() => setCurrentScreen('menu')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            返回菜单 (R)
          </button>
          <button
            onClick={() => setShowCommand(true)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Terminal className="w-5 h-5" />
            指令 (/)
          </button>
        </div>

        {/* Debug info */}
        {isDebugMode && (
          <div className="mt-4 bg-gray-800 text-white p-4 rounded-lg font-mono text-sm">
            <p>地图大小: {mapSize}</p>
            <p>玩家坐标: ({playerPos.x}, {playerPos.y})</p>
            <p>传送门激活: {isDoorActivated ? '是' : '否'}</p>
          </div>
        )}

        {/* Modals */}
        {showInventory && <InventoryPanel onClose={() => setShowInventory(false)} />}
        {showShop && <ShopPanel isVictoryShop={true} onClose={() => setShowShop(false)} />}
        {showTutorial && <TutorialPanel onClose={() => setShowTutorial(false)} />}
        {showCommand && <CommandInput onClose={() => setShowCommand(false)} />}
        
        {/* Game Messages */}
        <GameMessages />

        {showUseItem && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 border-4 border-gray-600 rounded-xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-white mb-4">使用道具</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleUseItem('enderPearl')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
                >
                  末影珍珠 ({inventory.enderPearl})
                </button>
                <button
                  onClick={() => handleUseItem('healingPotion')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                >
                  治疗药水 ({inventory.healingPotion})
                </button>
                <button
                  onClick={() => handleUseItem('splashPotion')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
                >
                  喷溅型伤害药水 ({inventory.splashPotion})
                </button>
                <button
                  onClick={() => handleUseItem('flintAndSteel')}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold"
                >
                  打火石 ({inventory.flintAndSteel})
                </button>
                <button
                  onClick={() => setShowUseItem(false)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

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

export default GameScreen;
