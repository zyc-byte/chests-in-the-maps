import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { X, ShoppingCart, DollarSign, ArrowRight } from 'lucide-react';
import { ITEM_PRICES } from '../types/game';

interface ShopPanelProps {
  onClose?: () => void;  // 可选，通关后不显示关闭按钮
  isVictoryShop?: boolean;  // 是否是通关后的商店
}

const ShopPanel: React.FC<ShopPanelProps> = ({ onClose, isVictoryShop = false }) => {
  const { money, buyItem, sellAllResources, nextLevel } = useGameStore();
  const [selectedAction, setSelectedAction] = useState<'buy' | 'sell'>('buy');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleContinue = () => {
    if (onClose) onClose();
    nextLevel();
  };

  const shopItems = [
    { key: 'enderPearl' as const, label: '末影珍珠', price: ITEM_PRICES.enderPearl, description: '传送至附近9x9范围' },
    { key: 'healingPotion' as const, label: '治疗药水', price: ITEM_PRICES.healingPotion, description: '恢复至满血' },
    { key: 'splashPotion' as const, label: '喷溅型伤害药水', price: ITEM_PRICES.splashPotion, description: '对5x5范围内怪物造成伤害' },
    { key: 'bread' as const, label: '面包', price: ITEM_PRICES.bread, description: '恢复3点饱食度' },
  ];

  const handleBuy = (item: typeof shopItems[0], amount: number) => {
    const success = buyItem(item.key, amount);
    if (!success) {
      alert('金钱不足！');
    }
  };

  const handleSell = () => {
    sellAllResources();
    alert('出售成功！');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-white/90 backdrop-blur-md border-4 ${isVictoryShop ? 'border-yellow-400' : 'border-gray-300'} rounded-3xl p-8 ${isVictoryShop ? 'max-w-5xl h-screen overflow-y-auto' : 'max-w-3xl'} w-full mx-4 shadow-2xl`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold ${isVictoryShop ? 'text-yellow-600' : 'text-gray-800'}`}>
            {isVictoryShop ? '🎉 恭喜通关！商店' : '商店'}
          </h2>
          {!isVictoryShop && onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          )}
        </div>

        <div className="mb-6 bg-yellow-50/70 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-3 border border-yellow-200">
          <DollarSign className="w-6 h-6 text-yellow-600" />
          <span className="text-gray-800 text-lg">当前金钱: </span>
          <span className="text-yellow-600 text-xl font-bold">${money.toLocaleString()}</span>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedAction('buy')}
            className={`flex-1 py-3 px-6 rounded-2xl font-bold transition-all ${
              selectedAction === 'buy'
                ? 'bg-green-500/80 backdrop-blur-md text-white shadow-lg'
                : 'bg-gray-200/70 text-gray-600 hover:bg-gray-300/70'
            }`}
          >
            <ShoppingCart className="w-5 h-5 inline mr-2" />
            购买
          </button>
          <button
            onClick={() => setSelectedAction('sell')}
            className={`flex-1 py-3 px-6 rounded-2xl font-bold transition-all ${
              selectedAction === 'sell'
                ? 'bg-blue-500/80 backdrop-blur-md text-white shadow-lg'
                : 'bg-gray-200/70 text-gray-600 hover:bg-gray-300/70'
            }`}
          >
            <DollarSign className="w-5 h-5 inline mr-2" />
            出售
          </button>
        </div>

        {selectedAction === 'buy' ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {shopItems.map((item) => (
              <div
                key={item.key}
                className="bg-blue-50/70 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-4 hover:bg-blue-100/70 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-gray-800 font-bold text-lg">{item.label}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <span className="text-yellow-600 font-bold text-xl">${item.price.toLocaleString()}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleBuy(item, 1)}
                    className="flex-1 bg-green-500/80 backdrop-blur-md hover:bg-green-600/80 text-white py-2 rounded-2xl font-semibold transition-colors"
                  >
                    购买 x1
                  </button>
                  <button
                    onClick={() => handleBuy(item, 5)}
                    className="flex-1 bg-green-500/80 backdrop-blur-md hover:bg-green-600/80 text-white py-2 rounded-2xl font-semibold transition-colors"
                  >
                    购买 x5
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-50/70 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-gray-800 mb-4 text-lg">
              出售所有资源 (圆石、煤炭、铁锥、金锥、红石、青金石、绿宝石、钻石、下界石英、萤石)
            </p>
            <button
              onClick={handleSell}
              className="bg-blue-500/80 backdrop-blur-md hover:bg-blue-600/80 text-white py-3 px-8 rounded-2xl font-bold transition-colors"
            >
              全部出售
            </button>
          </div>
        )}

        {/* 继续冒险按钮 */}
        <div className="mt-6 pt-6 border-t-2 border-gray-300">
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-orange-500/80 to-red-600/80 backdrop-blur-md hover:from-orange-600/80 hover:to-red-700/80 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <ArrowRight className="w-6 h-6" />
            继续冒险 - 进入下一关
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPanel;
