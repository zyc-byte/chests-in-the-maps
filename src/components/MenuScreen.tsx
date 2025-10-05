import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { SLOGANS } from '../types/game';
import { Play, Settings } from 'lucide-react';

const MenuScreen: React.FC = () => {
  const { initGame } = useGameStore();
  const [mapSize, setMapSize] = useState(10);
  const [isCheatEnabled, setIsCheatEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const randomSlogan = SLOGANS[Math.floor(Math.random() * SLOGANS.length)];

  const handleStartGame = () => {
    initGame(mapSize, isCheatEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-700 via-purple-700 to-blue-800 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Title */}
        <div className="text-center mb-12 animate-pulse">
          <h1 className="text-6xl font-bold text-cyan-400 mb-4 drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(6,182,212,0.5)' }}>
            CHESTS IN THE MAPS
          </h1>
          <p className="text-2xl text-cyan-300 italic">{randomSlogan}</p>
          <p className="text-red-400 font-bold text-xl mt-2">勇闯下界 - Through the Nether</p>
        </div>

            {/* Game card */}
            <div className="bg-white/10 backdrop-blur-3xl rounded-3xl p-8 shadow-2xl">
          {!showSettings ? (
            <>
              <button
                onClick={handleStartGame}
                className="w-full bg-green-500/80 backdrop-blur-md hover:bg-green-600/80 text-white text-2xl font-bold py-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 mb-4 flex items-center justify-center gap-3"
              >
                <Play className="w-8 h-8" />
                开始游戏
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="w-full bg-blue-500/80 backdrop-blur-md hover:bg-blue-600/80 text-white text-xl font-bold py-4 rounded-2xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <Settings className="w-6 h-6" />
                游戏设置
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-200 mb-6 text-center">游戏设置</h2>

              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-gray-200 text-lg font-semibold mb-3">
                    地图大小: {mapSize}x{mapSize}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={mapSize}
                    onChange={(e) => setMapSize(parseInt(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((mapSize - 5) / (20 - 5)) * 100}%, #e5e7eb ${((mapSize - 5) / (20 - 5)) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-gray-600 text-sm mt-1">
                    <span>5x5</span>
                    <span>20x20</span>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-lg p-4 rounded-2xl border border-white/30">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCheatEnabled}
                      onChange={(e) => setIsCheatEnabled(e.target.checked)}
                      className="w-6 h-6 rounded bg-white border-gray-300 text-cyan-500 focus:ring-cyan-400 focus:ring-2 cursor-pointer"
                    />
                    <span className="ml-3 text-gray-200 text-lg font-semibold">
                      启用作弊模式 (按"1"切换调试信息)
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full bg-gray-400/80 backdrop-blur-md hover:bg-gray-500/80 text-white text-xl font-bold py-4 rounded-2xl shadow-lg transition-all"
              >
                返回
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-700">
          <p className="text-sm opacity-75">Made By hezhibao | Canary Version Made By ZycNotFound</p>
          <p className="text-sm opacity-75 mt-1">Modern Web Version - Alpha 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
