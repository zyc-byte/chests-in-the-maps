import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Drumstick, Coins } from 'lucide-react';

const StatusBar: React.FC = () => {
  const { hp, maxHp, hunger, maxHunger, money } = useGameStore();

  return (
    <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border-4 border-gray-700 rounded-lg p-4 shadow-2xl">
      <div className="grid grid-cols-3 gap-6">
        {/* Money */}
        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
          <Coins className="w-6 h-6 text-yellow-400" />
          <div>
            <div className="text-xs text-gray-400">金钱</div>
            <div className="text-lg font-bold text-yellow-400">${money.toLocaleString()}</div>
          </div>
        </div>

        {/* Health */}
        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
          <Heart className="w-6 h-6 text-red-500" />
          <div>
            <div className="text-xs text-gray-400">生命值</div>
            <div className="text-lg font-bold text-red-500">{hp} / {maxHp}</div>
          </div>
        </div>

        {/* Hunger */}
        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
          <Drumstick className="w-6 h-6 text-orange-500" />
          <div>
            <div className="text-xs text-gray-400">饱食度</div>
            <div className="text-lg font-bold text-orange-500">{hunger} / {maxHunger}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
