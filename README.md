# Chests in the Maps - 地图中的宝箱

一个使用现代Web技术栈重写的地牢探险游戏，灵感来自Minecraft。

## 🎮 游戏介绍

这是一个基于网格的地牢探险游戏，玩家需要在随机生成的地图中探索、开启宝箱、战斗怪物，并通过传送门进入危险的下界获取稀有资源。

### 游戏特色

- 🗺️ **随机生成地图** - 每次游戏都是独特的冒险
- 📦 **开启宝箱** - 收集各种资源和材料
- ⚔️ **战斗系统** - 对抗僵尸、骷髅和熔岩僵尸
- 🔥 **下界维度** - 探索充满危险的下界堡垒
- 🛒 **商店系统** - 买卖物品，赚取金钱
- 🍖 **生存机制** - 管理生命值和饱食度
- 🎒 **物品系统** - 使用特殊道具帮助探险

## 🚀 技术栈

- **React 18** - 现代UI框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **Zustand** - 轻量级状态管理
- **TailwindCSS** - 实用优先的CSS框架
- **Lucide React** - 美观的图标库

## 📦 安装和运行

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

游戏将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🚀 部署

本项目支持多种部署平台，详细说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署

#### Vercel（推荐）
```bash
npm install -g vercel
vercel --prod
```

#### Cloudflare Pages（无限流量）
```bash
npm install -g wrangler
npm run deploy:cf
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages（推荐使用 GitHub Actions）

**方式 1: GitHub Actions 自动部署**
1. 在仓库 Settings → Pages 选择 "GitHub Actions"
2. 推送代码自动部署（已配置 `.github/workflows/deploy-gh-pages.yml`）

**方式 2: CLI 手动部署**
```bash
npm install -D gh-pages
# 在 package.json 添加 homepage 字段
npm run deploy:gh
```

### 可用的部署脚本

```bash
npm run deploy              # Vercel 生产部署（默认）
npm run deploy:vercel       # Vercel 生产部署
npm run deploy:vercel:preview  # Vercel 预览部署
npm run deploy:cf           # Cloudflare Pages 部署
npm run deploy:gh           # GitHub Pages 部署（CLI）
npm run deploy:netlify      # Netlify 生产部署
npm run deploy:netlify:preview # Netlify 预览部署
```

### GitHub Actions 自动部署

本项目已配置 GitHub Actions，支持自动部署到：
- ✅ **GitHub Pages** - 推送到 main 分支自动部署
- ✅ **Cloudflare Pages** - 需配置 Secrets 后自动部署

**优势**：
- 🤖 完全自动化，推送代码即部署
- ☁️ 云端构建，不占用本地资源
- 📊 可视化日志，部署状态一目了然
- 🆓 公开仓库完全免费

### 推荐平台

| 平台 | 免费流量 | 特点 | 适用场景 |
|------|----------|------|----------|
| **Cloudflare Pages** | ♾️ 无限 | 全球 CDN，国内访问好 | ⭐ 首选 |
| **Vercel** | 100GB/月 | 最佳体验，功能最强 | ⭐ 推荐 |
| **Netlify** | 100GB/月 | 功能全面，生态成熟 | ✅ 可选 |
| **GitHub Pages** | ♾️ 无限 | 永久免费，稳定可靠 | ✅ 备选 |

## 🎯 游戏玩法

### 操作方式

| 按键 | 功能 |
|------|------|
| W/A/S/D | 上/左/下/右移动 |
| O | 打开面前的箱子 |
| K | 攻击周围的怪物 |
| E | 打开背包 |
| U | 使用道具 |
| Q | 吃食物 |
| T | 查看教程 |
| R | 返回菜单 |
| 1 | 切换调试模式（需启用作弊） |

### 游戏目标

1. **探索地图** - 在随机生成的地图中移动
2. **收集资源** - 打开箱子获取材料
3. **战斗怪物** - 击败僵尸和骷髅（怪物不会主动攻击）
4. **通关闯关** - 到达地图右下角的门进入下一关
5. **无限关卡** - 每关地图都会重新生成，难度逐渐增加
6. **交易赚钱** - 在商店出售资源，购买强力道具

### 地图元素

#### 主世界
- 🟫 **泥土** - 可通行的地面
- ⬛ **墙壁** - 无法通过的障碍
- 📦 **箱子** - 包含随机战利品
- 🧟 **僵尸** - 可以攻击它们获得战利品（不会主动攻击）
- 💀 **骷髅** - 可以攻击它们获得战利品（不会主动攻击）
- 🚪 **门** - 到达门即可进入下一关
- 👤 **玩家** - 你的角色

### 道具系统

- **末影珍珠** ($100,000) - 短距离传送
- **治疗药水** ($500,000) - 恢复满血
- **喷溅型伤害药水** ($300,000) - 范围伤害
- **打火石** - 激活传送门（可在箱子中找到）
- **面包** ($10) - 恢复3点饱食度
- **腐肉** - 击败僵尸获得，恢复1点饱食度

### 资源和价格

| 资源 | 价格 |
|------|------|
| 圆石 | $1 |
| 煤炭 | $5 |
| 铁锭 | $100 |
| 金锭 | $100 |
| 红石 | $200 |
| 青金石 | $300 |
| 绿宝石 | $1,000 |
| 钻石 | $5,000 |
| 下界石英 | $100,000 |
| 萤石 | $200,000 |

## 🎨 游戏特性

### 生存机制

- **生命值** - 被怪物攻击会减少，归零即死亡
- **饱食度** - 每10步消耗1点，归零时会持续掉血
- **自动恢复** - 饱食度满时会缓慢恢复生命值

### 怪物机制

- **僵尸** - 静态敌人，可以主动攻击它们（3点生命值）
- **骷髅** - 静态敌人，可以主动攻击它们（3点生命值）
- **提示** - 怪物不会移动或主动攻击，这是一个休闲探索游戏！

### 战利品系统

箱子会随机生成各种资源，稀有度不同：
- **常见**: 圆石、煤炭
- **罕见**: 铁锭、金锭、红石、青金石
- **稀有**: 绿宝石、钻石、打火石

## 🏗️ 项目结构

```
chests-in-the-maps/
├── src/
│   ├── components/         # React组件
│   │   ├── GameMap.tsx    # 地图渲染
│   │   ├── StatusBar.tsx  # 状态栏
│   │   ├── GameScreen.tsx # 主游戏界面
│   │   ├── NetherScreen.tsx # 下界界面
│   │   ├── MenuScreen.tsx # 主菜单
│   │   ├── DeathScreen.tsx # 死亡界面
│   │   ├── InventoryPanel.tsx # 背包界面
│   │   ├── ShopPanel.tsx  # 商店界面
│   │   └── TutorialPanel.tsx # 教程界面
│   ├── store/
│   │   └── gameStore.ts   # Zustand状态管理
│   ├── types/
│   │   └── game.ts        # TypeScript类型定义
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── public/                # 静态资源
├── index.html            # HTML模板
├── package.json          # 项目配置
├── vite.config.ts        # Vite配置
├── tailwind.config.js    # Tailwind配置
└── tsconfig.json         # TypeScript配置
```

## 🔧 开发说明

### 状态管理

使用Zustand进行全局状态管理，主要状态包括：
- 地图数据（主世界和下界）
- 玩家状态（位置、生命、饱食度、金钱）
- 物品栏
- 实体列表（僵尸、骷髅、箭矢等）
- 游戏状态（当前屏幕、游戏结束等）

### 地图生成

使用递归算法生成随机的连通地图，确保玩家能够到达终点。

### 组件架构

- **屏幕组件** - 负责不同游戏状态的完整界面
- **UI组件** - 可复用的界面元素
- **游戏逻辑** - 集中在Zustand store中

## 📝 与原版对比

### 保留的特性
- ✅ 核心游戏玩法
- ✅ 地图生成算法
- ✅ 怪物AI行为
- ✅ 物品和商店系统
- ✅ 下界维度

### 现代化改进
- 🎨 美观的图形界面（替代字符界面）
- 🖱️ 支持鼠标操作
- 📱 响应式设计
- 🎮 更流畅的游戏体验
- 🔧 易于扩展和维护的代码结构
- 🚀 更快的启动和运行速度
- 🌐 跨平台支持（浏览器）

## 🎯 未来计划

- [ ] 音效和背景音乐
- [ ] 保存/加载游戏
- [ ] 成就系统
- [ ] 更多怪物类型
- [ ] 更多维度
- [ ] 多人游戏支持
- [ ] 移动端优化

## 👥 制作团队

- **原作者**: hezhibao
- **金丝雀版本**: ZycNotFound
- **宣传**: kaikaikaihuaya
- **灵感来源**: Heletong
- **现代Web版本**: 基于React + TypeScript重写

## 📄 许可证

重制版以 MIT 发布，并致谢原作者 hezhibao

## 🙏 致谢

感谢原作者hezhibao创造了这个有趣的游戏！

---

**享受游戏吧！ Have Fun! 🎮**
