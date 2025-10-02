import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Drumstick, Coins } from 'lucide-react';

const StatusBar: React.FC = () => {
  const { hp, maxHp, hunger, maxHunger, money } = useGameStore();

  const hpPercent = (hp / maxHp) * 100;
  const hungerPercent = (hunger / maxHunger) * 100;

  return (
    <div className="w-full bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-xl">
      <div className="grid grid-cols-3 gap-4">
        {/* Money */}
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs text-gray-400 mb-0.5">金钱</div>
            <div className="text-base font-bold text-yellow-400">${money.toLocaleString()}</div>
          </div>
        </div>

        {/* Health */}
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400 flex-shrink-0" fill={hpPercent > 30 ? 'currentColor' : 'none'} />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">生命</span>
              <span className="text-xs font-semibold text-red-400">{hp}/{maxHp}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all ${
                  hpPercent > 60 ? 'bg-green-500' : hpPercent > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Hunger */}
        <div className="flex items-center gap-2">
          <Drumstick className="w-5 h-5 text-orange-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">饱食度</span>
              <span className="text-xs font-semibold text-orange-400">{hunger}/{maxHunger}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all ${
                  hungerPercent > 60 ? 'bg-green-500' : hungerPercent > 30 ? 'bg-yellow-500' : 'bg-orange-500'
                }`}
                style={{ width: `${hungerPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
