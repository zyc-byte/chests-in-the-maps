import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Skull, RotateCcw, Home } from 'lucide-react';

const DeathScreen: React.FC = () => {
  const { deathMessage, resetGame, initGame, mapSize, isCheatEnabled } = useGameStore();

  const handleRespawn = () => {
    // 重生：重置游戏状态并重新生成地图
    resetGame();
    initGame(mapSize, isCheatEnabled);
  };

  const handleReturnMenu = () => {
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 via-purple-800 to-red-700 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 animate-bounce">
          <Skull className="w-32 h-32 text-red-600 mx-auto" />
        </div>

        <h1 className="text-6xl font-bold text-red-400 mb-8 drop-shadow-2xl">你死了！</h1>

        <div className="bg-white/10 backdrop-blur-3xl border-2 border-red-400/60 rounded-3xl p-8 mb-8 shadow-2xl">
          <p className="text-gray-400 text-lg mb-2">死亡信息:</p>
          <p className="text-gray-200 text-2xl font-semibold">{deathMessage}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRespawn}
            className="w-full bg-green-500/80 backdrop-blur-md hover:bg-green-600/80 text-white text-2xl font-bold py-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-8 h-8" />
            重生
          </button>

          <button
            onClick={handleReturnMenu}
            className="w-full bg-blue-500/80 backdrop-blur-md hover:bg-blue-600/80 text-white text-xl font-bold py-4 rounded-2xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <Home className="w-6 h-6" />
            返回标题屏幕
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeathScreen;
