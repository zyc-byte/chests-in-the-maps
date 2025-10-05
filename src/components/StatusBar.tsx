import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Drumstick, Coins } from 'lucide-react';

const StatusBar: React.FC = () => {
  const { hp, maxHp, hunger, maxHunger, money } = useGameStore();

  const hpPercent = (hp / maxHp) * 100;
  const hungerPercent = (hunger / maxHunger) * 100;

  return (
    <div className="w-full bg-white/10 backdrop-blur-3xl border border-white/30 rounded-3xl p-4 shadow-2xl">
      <div className="grid grid-cols-3 gap-4">
        {/* Money */}
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs text-gray-300 font-semibold mb-0.5">金钱</div>
            <div className="text-base font-bold text-yellow-600">${money.toLocaleString()}</div>
          </div>
        </div>

        {/* Health */}
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 flex-shrink-0" fill={hpPercent > 30 ? 'currentColor' : 'none'} />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-300 font-semibold">生命</span>
              <span className="text-xs font-bold text-red-500">{hp}/{maxHp}</span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-md rounded-full h-2 border border-white/30">
              <div 
                className={`h-2 rounded-full transition-all shadow-lg ${
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
              <span className="text-xs text-gray-300 font-semibold">饱食度</span>
              <span className="text-xs font-bold text-orange-500">{hunger}/{maxHunger}</span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-md rounded-full h-2 border border-white/30">
              <div 
                className={`h-2 rounded-full transition-all shadow-lg ${
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
