import React from 'react';
import { useGameStore } from '../store/gameStore';
import { X } from 'lucide-react';

interface InventoryPanelProps {
  onClose: () => void;
}

const InventoryPanel: React.FC<InventoryPanelProps> = ({ onClose }) => {
  const { inventory } = useGameStore();

  const items = [
    { key: 'cobblestone', label: '圆石', value: inventory.cobblestone },
    { key: 'coal', label: '煤炭', value: inventory.coal },
    { key: 'ironIngot', label: '铁锭', value: inventory.ironIngot },
    { key: 'goldIngot', label: '金锭', value: inventory.goldIngot },
    { key: 'redstone', label: '红石', value: inventory.redstone },
    { key: 'lapisLazuli', label: '青金石', value: inventory.lapisLazuli },
    { key: 'emerald', label: '绿宝石', value: inventory.emerald },
    { key: 'diamond', label: '钻石', value: inventory.diamond },
    { key: 'enderPearl', label: '末影珍珠', value: inventory.enderPearl },
    { key: 'healingPotion', label: '治疗药水', value: inventory.healingPotion },
    { key: 'splashPotion', label: '喷溅型伤害药水', value: inventory.splashPotion },
    { key: 'rottenFlesh', label: '腐肉', value: inventory.rottenFlesh },
    { key: 'bone', label: '骨头', value: inventory.bone },
    { key: 'bread', label: '面包', value: inventory.bread },
    { key: 'flintAndSteel', label: '打火石', value: inventory.flintAndSteel },
    { key: 'netherQuartz', label: '下界石英', value: inventory.netherQuartz },
    { key: 'glowstone', label: '萤石', value: inventory.glowstone },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-600 rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">背包</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.key}
              className="bg-gray-700 border-2 border-gray-600 rounded-lg p-3 flex justify-between items-center hover:bg-gray-600 transition-colors"
            >
              <span className="text-white font-semibold">{item.label}</span>
              <span className="text-yellow-400 font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryPanel;
