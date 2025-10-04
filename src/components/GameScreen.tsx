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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <StatusBar />

        <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-4 shadow-2xl">
          <GameMap />
        </div>

        {/* Control buttons - compact grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <button
            onClick={() => setShowInventory(true)}
            className="bg-blue-500/80 backdrop-blur-md hover:bg-blue-600/80 text-white px-3 py-2.5 rounded-2xl font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">背包</span>
            <span className="text-xs opacity-70">(E)</span>
          </button>
          <button
            onClick={() => setShowUseItem(true)}
            className="bg-purple-500/80 backdrop-blur-md hover:bg-purple-600/80 text-white px-3 py-2.5 rounded-2xl font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">道具</span>
            <span className="text-xs opacity-70">(U)</span>
          </button>
          <button
            onClick={() => setShowEatFood(true)}
            className="bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 text-white px-3 py-2.5 rounded-2xl font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span className="hidden sm:inline">食物</span>
            <span className="text-xs opacity-70">(Q)</span>
          </button>
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-green-500/80 backdrop-blur-md hover:bg-green-600/80 text-white px-3 py-2.5 rounded-2xl font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">教程</span>
            <span className="text-xs opacity-70">(T)</span>
          </button>
          <button
            onClick={() => setCurrentScreen('menu')}
            className="bg-red-500/80 backdrop-blur-md hover:bg-red-600/80 text-white px-3 py-2.5 rounded-2xl font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">菜单</span>
            <span className="text-xs opacity-70">(R)</span>
          </button>
          <button
            onClick={() => setShowCommand(true)}
            className="bg-cyan-500/80 backdrop-blur-md hover:bg-cyan-600/80 text-white px-3 py-2.5 rounded-2xl font-medium shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden sm:inline">指令</span>
            <span className="text-xs opacity-70">(/)</span>
          </button>
        </div>

        {/* Debug info */}
        {isDebugMode && (
          <div className="mt-4 bg-white/70 backdrop-blur-sm text-gray-800 p-4 rounded-2xl font-mono text-sm border border-gray-200">
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-md border border-gray-300 rounded-3xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">使用道具</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleUseItem('enderPearl')}
                  className="w-full bg-purple-500/80 backdrop-blur-md hover:bg-purple-600/80 text-white py-2.5 rounded-2xl font-medium transition-all flex items-center justify-between px-4"
                >
                  <span>🔮 末影珍珠</span>
                  <span className="text-sm bg-purple-600/70 px-2 py-0.5 rounded-xl">×{inventory.enderPearl}</span>
                </button>
                <button
                  onClick={() => handleUseItem('healingPotion')}
                  className="w-full bg-red-500/80 backdrop-blur-md hover:bg-red-600/80 text-white py-2.5 rounded-2xl font-medium transition-all flex items-center justify-between px-4"
                >
                  <span>❤️ 治疗药水</span>
                  <span className="text-sm bg-red-600/70 px-2 py-0.5 rounded-xl">×{inventory.healingPotion}</span>
                </button>
                <button
                  onClick={() => handleUseItem('splashPotion')}
                  className="w-full bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 text-white py-2.5 rounded-2xl font-medium transition-all flex items-center justify-between px-4"
                >
                  <span>💥 伤害药水</span>
                  <span className="text-sm bg-orange-600/70 px-2 py-0.5 rounded-xl">×{inventory.splashPotion}</span>
                </button>
                <button
                  onClick={() => handleUseItem('flintAndSteel')}
                  className="w-full bg-yellow-500/80 backdrop-blur-md hover:bg-yellow-600/80 text-white py-2.5 rounded-2xl font-medium transition-all flex items-center justify-between px-4"
                >
                  <span>🔥 打火石</span>
                  <span className="text-sm bg-yellow-600/70 px-2 py-0.5 rounded-xl">×{inventory.flintAndSteel}</span>
                </button>
                <button
                  onClick={() => setShowUseItem(false)}
                  className="w-full bg-gray-400/80 backdrop-blur-md hover:bg-gray-500/80 text-white py-2.5 rounded-2xl font-medium transition-all mt-4"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {showEatFood && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-md border border-gray-300 rounded-3xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">吃食物</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleEatFood('rottenFlesh')}
                  className="w-full bg-green-500/80 backdrop-blur-md hover:bg-green-600/80 text-white py-3 rounded-2xl font-medium transition-all"
                >
                  <div className="flex items-center justify-between px-4">
                    <span>🥩 腐肉</span>
                    <span className="text-sm bg-green-600/70 px-2 py-0.5 rounded-xl">×{inventory.rottenFlesh}</span>
                  </div>
                  <div className="text-xs opacity-80 mt-1">恢复1点饱食度</div>
                </button>
                <button
                  onClick={() => handleEatFood('bread')}
                  className="w-full bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 text-white py-3 rounded-2xl font-medium transition-all"
                >
                  <div className="flex items-center justify-between px-4">
                    <span>🍞 面包</span>
                    <span className="text-sm bg-orange-600/70 px-2 py-0.5 rounded-xl">×{inventory.bread}</span>
                  </div>
                  <div className="text-xs opacity-80 mt-1">恢复3点饱食度</div>
                </button>
                <button
                  onClick={() => setShowEatFood(false)}
                  className="w-full bg-gray-400/80 backdrop-blur-md hover:bg-gray-500/80 text-white py-2.5 rounded-2xl font-medium transition-all mt-4"
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
