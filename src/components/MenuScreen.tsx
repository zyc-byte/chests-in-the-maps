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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-cyan-500 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Title */}
        <div className="text-center mb-12 animate-pulse">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.5)' }}>
            CHESTS IN THE MAPS
          </h1>
          <p className="text-2xl text-cyan-200 italic">{randomSlogan}</p>
          <p className="text-red-400 font-bold text-xl mt-2">勇闯下界 - Through the Nether</p>
        </div>

        {/* Game card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-cyan-400 rounded-xl p-8 shadow-2xl">
          {!showSettings ? (
            <>
              <button
                onClick={handleStartGame}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold py-6 rounded-lg shadow-lg transition-all transform hover:scale-105 mb-4 flex items-center justify-center gap-3"
              >
                <Play className="w-8 h-8" />
                开始游戏
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xl font-bold py-4 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <Settings className="w-6 h-6" />
                游戏设置
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">游戏设置</h2>

              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-white text-lg font-semibold mb-3">
                    地图大小: {mapSize}x{mapSize}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={mapSize}
                    onChange={(e) => setMapSize(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-1">
                    <span>5x5</span>
                    <span>20x20</span>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCheatEnabled}
                      onChange={(e) => setIsCheatEnabled(e.target.checked)}
                      className="w-6 h-6 rounded bg-gray-600 border-gray-500 text-cyan-500 focus:ring-cyan-500 focus:ring-2 cursor-pointer"
                    />
                    <span className="ml-3 text-white text-lg font-semibold">
                      启用作弊模式 (按"1"切换调试信息)
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white text-xl font-bold py-4 rounded-lg shadow-lg transition-all"
              >
                返回
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white">
          <p className="text-sm opacity-75">Made By hezhibao | Canary Version Made By ZycNotFound</p>
          <p className="text-sm opacity-75 mt-1">Modern Web Version - Alpha 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
