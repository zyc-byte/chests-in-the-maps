import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Drumstick, Coins } from 'lucide-react';

const StatusBar: React.FC = () => {
  const { hp, maxHp, hunger, maxHunger, money } = useGameStore();

  const hpPercent = (hp / maxHp) * 100;
  const hungerPercent = (hunger / maxHunger) * 100;

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-gray-300 rounded-3xl p-4 shadow-xl">
      <div className="grid grid-cols-3 gap-4">
        {/* Money */}
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs text-gray-600 mb-0.5">金钱</div>
            <div className="text-base font-bold text-yellow-600">${money.toLocaleString()}</div>
          </div>
        </div>

        {/* Health */}
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 flex-shrink-0" fill={hpPercent > 30 ? 'currentColor' : 'none'} />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">生命</span>
              <span className="text-xs font-semibold text-red-500">{hp}/{maxHp}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
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
          <Drumstick className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">饱食度</span>
              <span className="text-xs font-semibold text-orange-500">{hunger}/{maxHunger}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
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
