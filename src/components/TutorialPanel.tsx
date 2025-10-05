import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface TutorialPanelProps {
  onClose: () => void;
}

const TutorialPanel: React.FC<TutorialPanelProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-3xl border border-white/40 rounded-3xl p-8 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-200">游戏教程</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="space-y-6 text-gray-200">
          <section>
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">1. 游戏画面</h3>
            <div className="bg-white/15 backdrop-blur-lg p-4 rounded-2xl space-y-2 border border-white/30">
              <p><strong>主世界:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
                <li>浅色方块 = 泥土</li>
                <li>灰色方块 (W) = 墙</li>
                <li>黄色方块 (箱子图标) = 箱子</li>
                <li>蓝色方块 (@) = 玩家</li>
                <li>绿色方块 (Z) = 僵尸</li>
                <li>灰白色方块 (骷髅图标) = 骷髅</li>
                <li>深灰色方块 (门图标) = 传送门</li>
                <li>白色方块 (箭头) = 箭矢</li>
              </ul>
              <p className="mt-3"><strong>下界:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
                <li>深红色方块 = 下界岩</li>
                <li>更深红色方块 (N) = 下界砖</li>
                <li>紫色方块 (门图标) = 下界传送门</li>
                <li>黄色方块 (箱子图标) = 箱子</li>
                <li>橙色方块 (火焰图标) = 熔岩僵尸</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">2. 操作方式</h3>
            <div className="bg-white/15 backdrop-blur-lg p-4 rounded-2xl border border-white/30">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                  <strong className="text-yellow-400">W/A/S/D</strong> - 上/左/下/右移动
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                  <strong className="text-yellow-400">O</strong> - 打开面前的箱子
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                  <strong className="text-yellow-400">K</strong> - 攻击周围怪物
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                  <strong className="text-yellow-400">E</strong> - 打开背包
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                  <strong className="text-yellow-400">U</strong> - 使用道具
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                  <strong className="text-yellow-400">Q</strong> - 吃东西
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                  <strong className="text-yellow-400">T</strong> - 查看教程
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
                  <strong className="text-yellow-400">R</strong> - 返回菜单
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">3. 游戏目标</h3>
            <div className="bg-white/15 backdrop-blur-lg p-4 rounded-2xl space-y-2 text-gray-700 border border-white/30">
              <p>• 探索地图，打开箱子获取资源</p>
              <p>• ⚠️ 小心怪物！僵尸会追击，骷髅会射箭</p>
              <p>• 击败僵尸和骷髅获得战利品</p>
              <p>• 到达地图右下角的门进入下一关</p>
              <p>• 每一关地图都会重新生成</p>
              <p>• 在商店出售资源赚取金钱</p>
              <p>• 购买强力道具帮助探险</p>
              <p>• 管理生命值和饱食度生存下去</p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">4. 道具说明</h3>
            <div className="bg-white/15 backdrop-blur-lg p-4 rounded-2xl space-y-2 text-gray-700 border border-white/30">
              <p><strong className="text-yellow-700">末影珍珠:</strong> 传送至附近9x9范围内</p>
              <p><strong className="text-yellow-700">治疗药水:</strong> 恢复至满血</p>
              <p><strong className="text-yellow-700">喷溅型伤害药水:</strong> 对5x5范围内的怪物造成伤害</p>
              <p><strong className="text-yellow-700">打火石:</strong> 在传送门旁使用直接进入下界</p>
              <p><strong className="text-yellow-700">面包:</strong> 恢复3点饱食度</p>
              <p><strong className="text-yellow-700">腐肉:</strong> 恢复1点饱食度</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TutorialPanel;
