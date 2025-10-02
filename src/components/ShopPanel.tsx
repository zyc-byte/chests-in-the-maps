import React, { useState } from 'react';
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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className={`bg-gradient-to-br from-gray-800 to-gray-900 border-4 ${isVictoryShop ? 'border-yellow-500' : 'border-gray-600'} rounded-xl p-8 ${isVictoryShop ? 'max-w-5xl h-screen overflow-y-auto' : 'max-w-3xl'} w-full mx-4 shadow-2xl`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold ${isVictoryShop ? 'text-yellow-400' : 'text-white'}`}>
            {isVictoryShop ? '🎉 恭喜通关！商店' : '商店'}
          </h2>
          {!isVictoryShop && onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          )}
        </div>

        <div className="mb-6 bg-gray-700 p-4 rounded-lg flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-yellow-400" />
          <span className="text-white text-lg">当前金钱: </span>
          <span className="text-yellow-400 text-xl font-bold">${money.toLocaleString()}</span>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedAction('buy')}
            className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
              selectedAction === 'buy'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <ShoppingCart className="w-5 h-5 inline mr-2" />
            购买
          </button>
          <button
            onClick={() => setSelectedAction('sell')}
            className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
              selectedAction === 'sell'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
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
                className="bg-gray-700 border-2 border-gray-600 rounded-lg p-4 hover:bg-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-white font-bold text-lg">{item.label}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                  <span className="text-yellow-400 font-bold text-xl">${item.price.toLocaleString()}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleBuy(item, 1)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    购买 x1
                  </button>
                  <button
                    onClick={() => handleBuy(item, 5)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    购买 x5
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-700 border-2 border-gray-600 rounded-lg p-6 text-center">
            <p className="text-white mb-4 text-lg">
              出售所有资源 (圆石、煤炭、铁锭、金锭、红石、青金石、绿宝石、钻石、下界石英、萤石)
            </p>
            <button
              onClick={handleSell}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold transition-colors"
            >
              全部出售
            </button>
          </div>
        )}

        {/* 继续冒险按钮 */}
        <div className="mt-6 pt-6 border-t-2 border-gray-700">
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 rounded-lg font-bold text-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
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
