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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <StatusBar />

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl">
          <GameMap />
        </div>

        {/* Control buttons - compact grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <button
            onClick={() => setShowInventory(true)}
            className="bg-blue-600/90 hover:bg-blue-600 text-white px-3 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">背包</span>
            <span className="text-xs opacity-70">(E)</span>
          </button>
          <button
            onClick={() => setShowUseItem(true)}
            className="bg-purple-600/90 hover:bg-purple-600 text-white px-3 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">道具</span>
            <span className="text-xs opacity-70">(U)</span>
          </button>
          <button
            onClick={() => setShowEatFood(true)}
            className="bg-orange-600/90 hover:bg-orange-600 text-white px-3 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span className="hidden sm:inline">食物</span>
            <span className="text-xs opacity-70">(Q)</span>
          </button>
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-green-600/90 hover:bg-green-600 text-white px-3 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">教程</span>
            <span className="text-xs opacity-70">(T)</span>
          </button>
          <button
            onClick={() => setCurrentScreen('menu')}
            className="bg-red-600/90 hover:bg-red-600 text-white px-3 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">菜单</span>
            <span className="text-xs opacity-70">(R)</span>
          </button>
          <button
            onClick={() => setShowCommand(true)}
            className="bg-cyan-600/90 hover:bg-cyan-600 text-white px-3 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden sm:inline">指令</span>
            <span className="text-xs opacity-70">(/)</span>
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">使用道具</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleUseItem('enderPearl')}
                  className="w-full bg-purple-600/90 hover:bg-purple-600 text-white py-2.5 rounded-lg font-medium transition-all flex items-center justify-between px-4"
                >
                  <span>🔮 末影珍珠</span>
                  <span className="text-sm bg-purple-700 px-2 py-0.5 rounded">×{inventory.enderPearl}</span>
                </button>
                <button
                  onClick={() => handleUseItem('healingPotion')}
                  className="w-full bg-red-600/90 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium transition-all flex items-center justify-between px-4"
                >
                  <span>❤️ 治疗药水</span>
                  <span className="text-sm bg-red-700 px-2 py-0.5 rounded">×{inventory.healingPotion}</span>
                </button>
                <button
                  onClick={() => handleUseItem('splashPotion')}
                  className="w-full bg-orange-600/90 hover:bg-orange-600 text-white py-2.5 rounded-lg font-medium transition-all flex items-center justify-between px-4"
                >
                  <span>💥 伤害药水</span>
                  <span className="text-sm bg-orange-700 px-2 py-0.5 rounded">×{inventory.splashPotion}</span>
                </button>
                <button
                  onClick={() => handleUseItem('flintAndSteel')}
                  className="w-full bg-yellow-600/90 hover:bg-yellow-600 text-white py-2.5 rounded-lg font-medium transition-all flex items-center justify-between px-4"
                >
                  <span>🔥 打火石</span>
                  <span className="text-sm bg-yellow-700 px-2 py-0.5 rounded">×{inventory.flintAndSteel}</span>
                </button>
                <button
                  onClick={() => setShowUseItem(false)}
                  className="w-full bg-gray-700/90 hover:bg-gray-700 text-white py-2.5 rounded-lg font-medium transition-all mt-4"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {showEatFood && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">吃食物</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleEatFood('rottenFlesh')}
                  className="w-full bg-green-600/90 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-all"
                >
                  <div className="flex items-center justify-between px-4">
                    <span>🥩 腐肉</span>
                    <span className="text-sm bg-green-700 px-2 py-0.5 rounded">×{inventory.rottenFlesh}</span>
                  </div>
                  <div className="text-xs opacity-80 mt-1">恢复1点饱食度</div>
                </button>
                <button
                  onClick={() => handleEatFood('bread')}
                  className="w-full bg-orange-600/90 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-all"
                >
                  <div className="flex items-center justify-between px-4">
                    <span>🍞 面包</span>
                    <span className="text-sm bg-orange-700 px-2 py-0.5 rounded">×{inventory.bread}</span>
                  </div>
                  <div className="text-xs opacity-80 mt-1">恢复3点饱食度</div>
                </button>
                <button
                  onClick={() => setShowEatFood(false)}
                  className="w-full bg-gray-700/90 hover:bg-gray-700 text-white py-2.5 rounded-lg font-medium transition-all mt-4"
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
