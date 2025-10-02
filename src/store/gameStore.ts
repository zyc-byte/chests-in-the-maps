import { create } from 'zustand';
import { GameState, CellType, NetherCellType, Direction, Biome, Entity, Inventory, ITEM_PRICES, GameMessage } from '../types/game';

const createEmptyInventory = (): Inventory => ({
  cobblestone: 0,
  coal: 0,
  ironIngot: 0,
  goldIngot: 0,
  redstone: 0,
  lapisLazuli: 0,
  emerald: 0,
  diamond: 0,
  enderPearl: 0,
  healingPotion: 0,
  splashPotion: 0,
  rottenFlesh: 0,
  bone: 0,
  bread: 0,
  flintAndSteel: 0,
  netherQuartz: 0,
  glowstone: 0,
});

const createEmptyMap = (size: number): CellType[][] => 
  Array(size + 1).fill(0).map(() => Array(size + 1).fill(CellType.EMPTY));

const createEmptyNetherMap = (size: number): NetherCellType[][] => 
  Array(size + 1).fill(0).map(() => Array(size + 1).fill(NetherCellType.NETHERRACK));

interface GameActions {
  initGame: (mapSize: number, isCheatEnabled: boolean) => void;
  movePlayer: (direction: Direction) => void;
  openChest: () => void;
  attackMobs: () => void;
  applyItem: (item: keyof Inventory) => void;
  eatFood: (food: 'rottenFlesh' | 'bread', amount: number) => void;
  toggleDebug: () => void;
  resetGame: () => void;
  enterNether: () => void;
  exitNether: () => void;
  updateStep: () => void;
  checkGameOver: () => void;
  setCurrentScreen: (screen: GameState['currentScreen']) => void;
  buyItem: (item: keyof Inventory, amount: number) => boolean;
  sellAllResources: () => void;
  nextLevel: () => void;
  addMessage: (text: string, type?: GameMessage['type']) => void;
  clearMessages: () => void;
  removeMessage: (id: number) => void;
  executeCommand: (command: string) => void;
  moveMobs: () => void;
  checkMobAttacks: () => void;
  moveArrows: () => void;
  skeletonShoot: () => void;
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  // Initial state
  mapSize: 10,
  overworldMap: createEmptyMap(10),
  netherMap: createEmptyNetherMap(10),
  playerPos: { x: 2, y: 2 },
  playerDirection: Direction.EAST,
  playerUnderlyingCell: CellType.EMPTY,
  hp: 20,
  maxHp: 20,
  hunger: 20,
  maxHunger: 20,
  money: 0,
  inventory: createEmptyInventory(),
  zombies: [],
  skeletons: [],
  arrows: [],
  lavaZombies: [],
  biome: Biome.OVERWORLD,
  step: 0,
  isGameOver: false,
  deathMessage: '',
  isDebugMode: false,
  isCheatEnabled: false,
  isDoorActivated: false,
  currentScreen: 'menu',
  showTutorial: false,
  messages: [],

  // Actions
  initGame: (mapSize: number, isCheatEnabled: boolean) => {
    const size = Math.max(5, Math.min(20, mapSize));
    const map = createEmptyMap(size);
    
    // Generate map using recursive algorithm
    const visited: boolean[][] = Array(size + 1).fill(false).map(() => Array(size + 1).fill(false));
    const directions = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ];
    
    const isInBounds = (x: number, y: number) => x >= 1 && x <= size && y >= 1 && y <= size;
    
    const generateMap = (x: number, y: number) => {
      visited[x][y] = true;
      map[x][y] = Math.floor(Math.random() * 5) as CellType;
      
      for (const dir of directions) {
        const newX = x + dir.x;
        const newY = y + dir.y;
        if (isInBounds(newX, newY) && !visited[newX][newY] && map[newX][newY] === CellType.EMPTY) {
          generateMap(newX, newY);
        }
      }
    };
    
    // Start generation from random point
    const startX = Math.floor(Math.random() * size) + 1;
    const startY = Math.floor(Math.random() * size) + 1;
    generateMap(startX, startY);
    
    // Place chests randomly
    const chestCount = Math.floor(Math.random() * size);
    for (let i = 0; i < chestCount; i++) {
      const x = Math.floor(Math.random() * size) + 1;
      const y = Math.floor(Math.random() * size) + 1;
      if (map[x][y] < CellType.WALL_1) {
        map[x][y] = CellType.CHEST;
      }
    }
    
    // Generate zombies (increased spawn rate)
    const zombieCount = Math.max(3, Math.floor(size / 2.5)); // 增加数量：size/2.5
    const zombies: Entity[] = [];
    const playerStartX = 2;
    const playerStartY = 2;
    
    const doorX = size - 1;
    const doorY = size - 1;
    
    for (let i = 0; i < zombieCount; i++) {
      let x, y, attempts = 0;
      do {
        x = Math.floor(Math.random() * size) + 1;
        y = Math.floor(Math.random() * size) + 1;
        x = Math.max(1, Math.min(size - 1, x));
        y = Math.max(1, Math.min(size - 1, y));
        attempts++;
      } while (
        attempts < 50 && 
        (Math.abs(x - playerStartX) < 4 || Math.abs(y - playerStartY) < 4 || // 确保离玩家至少4格
         (x === doorX && y === doorY)) // 避免生成在门的位置
      );
      
      if (map[x][y] < CellType.WALL_1) {
        // 记录底层方块，然后放置僵尸
        const underlyingCell = map[x][y];
        zombies.push({ x, y, hp: 3, underlyingCell });
        map[x][y] = CellType.ZOMBIE;
      }
    }
    
    // Generate skeletons (increased spawn rate)
    const skeletonCount = Math.max(2, Math.floor(size / 4)); // 增加数量：size/4，至少2个
    const skeletons: Entity[] = [];
    for (let i = 0; i < skeletonCount; i++) {
      let x, y, attempts = 0;
      do {
        x = Math.floor(Math.random() * size) + 1;
        y = Math.floor(Math.random() * size) + 1;
        x = Math.max(1, Math.min(size - 1, x));
        y = Math.max(1, Math.min(size - 1, y));
        attempts++;
      } while (
        attempts < 50 && 
        (Math.abs(x - playerStartX) < 5 || Math.abs(y - playerStartY) < 5 || // 骷髅离得更远
         (x === doorX && y === doorY)) // 避免生成在门的位置
      );
      
      if (map[x][y] < CellType.WALL_1) {
        // 记录底层方块，然后放置骷髅
        const underlyingCell = map[x][y];
        skeletons.push({ x, y, hp: 3, underlyingCell });
        map[x][y] = CellType.SKELETON;
      }
    }
    
    // Set player position
    map[2][2] = CellType.PLAYER;
    
    // Set door position
    map[size - 1][size - 1] = CellType.DOOR;
    
    set({
      mapSize: size,
      overworldMap: map,
      netherMap: createEmptyNetherMap(size),  // 重置下界地图
      playerPos: { x: 2, y: 2 },
      playerDirection: Direction.EAST,
      playerUnderlyingCell: CellType.EMPTY,
      hp: 20,
      hunger: 20,
      zombies,
      skeletons,
      arrows: [],
      lavaZombies: [],  // 清空下界怪物
      biome: Biome.OVERWORLD,  // 确保回到主世界
      step: 0,
      isGameOver: false,
      deathMessage: '',
      isCheatEnabled,
      isDoorActivated: false,
      currentScreen: 'game',
    });
  },

  movePlayer: (direction: Direction) => {
    const state = get();
    const { playerPos, overworldMap, netherMap, mapSize, biome, arrows } = state;
    const map = biome === Biome.OVERWORLD ? overworldMap : netherMap;
    
    const directions = [
      { x: 0, y: 1 },  // EAST
      { x: 1, y: 0 },  // SOUTH
      { x: 0, y: -1 }, // WEST
      { x: -1, y: 0 }  // NORTH
    ];
    
    const dir = directions[direction];
    const newX = playerPos.x + dir.x;
    const newY = playerPos.y + dir.y;
    
    const isInBounds = newX >= 1 && newX <= mapSize && newY >= 1 && newY <= mapSize;
    
    if (isInBounds) {
      const cellType = map[newX][newY];
      const canMove = biome === Biome.OVERWORLD 
        ? cellType < CellType.WALL_1 || cellType === CellType.DOOR || cellType === CellType.ARROW || cellType === CellType.ACTIVATED_DOOR
        : cellType === NetherCellType.NETHERRACK || cellType === NetherCellType.NETHER_BRICK || cellType === NetherCellType.NETHER_DOOR;
      
      if (canMove) {
        let newPlayerUnderlyingCell: CellType | NetherCellType;
        
        if (biome === Biome.OVERWORLD) {
          // 恢复旧位置的底层方块
          if (overworldMap[playerPos.x][playerPos.y] === CellType.PLAYER) {
            overworldMap[playerPos.x][playerPos.y] = state.playerUnderlyingCell as CellType;
          }
          
          // 检查新位置是否有箭矢，如果有则清除
          const arrowIndex = arrows.findIndex(a => a.x === newX && a.y === newY);
          if (arrowIndex !== -1) {
            // 先记录箭矢的底层方块
            const arrow = arrows[arrowIndex];
            newPlayerUnderlyingCell = arrow.underlyingCell ?? CellType.EMPTY;
            // 然后移除箭矢
            arrows.splice(arrowIndex, 1);
          } else {
            // 记录新位置的底层方块
            newPlayerUnderlyingCell = overworldMap[newX][newY];
          }
          
          // 放置玩家
          overworldMap[newX][newY] = CellType.PLAYER;
        } else {
          // 恢复旧位置的底层方块
          if (netherMap[playerPos.x][playerPos.y] === NetherCellType.NETHER_PLAYER) {
            netherMap[playerPos.x][playerPos.y] = state.playerUnderlyingCell as NetherCellType;
          }
          // 记录新位置的底层方块
          newPlayerUnderlyingCell = netherMap[newX][newY];
          // 放置玩家
          netherMap[newX][newY] = NetherCellType.NETHER_PLAYER;
        }
        
        set({
          playerPos: { x: newX, y: newY },
          playerDirection: direction,
          step: state.step + 1,
          playerUnderlyingCell: newPlayerUnderlyingCell,
          arrows,
          overworldMap,
          netherMap,
        });
        
        // Move mobs and handle attacks
        get().moveMobs();
        get().updateStep();
        get().checkMobAttacks();
      }
    }
  },

  openChest: () => {
    const state = get();
    const { playerPos, overworldMap, netherMap, biome, inventory } = state;
    
    // 检查四周所有方向的箱子
    const directions = [
      { x: 0, y: 1 },  // EAST
      { x: 1, y: 0 },  // SOUTH
      { x: 0, y: -1 }, // WEST
      { x: -1, y: 0 }  // NORTH
    ];
    
    let chestFound = false;
    let targetX = 0, targetY = 0;
    
    // 搜索四周是否有箱子
    for (const dir of directions) {
      const checkX = playerPos.x + dir.x;
      const checkY = playerPos.y + dir.y;
      
      if (biome === Biome.OVERWORLD && overworldMap[checkX]?.[checkY] === CellType.CHEST) {
        targetX = checkX;
        targetY = checkY;
        chestFound = true;
        break;
      } else if (biome !== Biome.OVERWORLD && netherMap[checkX]?.[checkY] === NetherCellType.NETHER_CHEST) {
        targetX = checkX;
        targetY = checkY;
        chestFound = true;
        break;
      }
    }
    
    if (!chestFound) {
      get().addMessage('附近没有箱子！', 'warning');
      return;
    }
    
    if (biome === Biome.OVERWORLD && overworldMap[targetX][targetY] === CellType.CHEST) {
      // Generate random loot
      const newInventory = { ...inventory };
      const loot: string[] = [];
      
      const cobblestone = Math.floor(Math.random() * 20);
      const coal = Math.floor(Math.random() * 64);
      const ironIngot = Math.floor(Math.random() * 20);
      const goldIngot = Math.floor(Math.random() * 20);
      const redstone = Math.floor(Math.random() * 10);
      const lapisLazuli = Math.floor(Math.random() * 10);
      const emerald = Math.floor(Math.random() * 3);
      const diamond = Math.floor(Math.random() * 3);
      
      if (cobblestone > 0) { newInventory.cobblestone += cobblestone; loot.push(`圆石x${cobblestone}`); }
      if (coal > 0) { newInventory.coal += coal; loot.push(`煤炭x${coal}`); }
      if (ironIngot > 0) { newInventory.ironIngot += ironIngot; loot.push(`铁锭x${ironIngot}`); }
      if (goldIngot > 0) { newInventory.goldIngot += goldIngot; loot.push(`金锭x${goldIngot}`); }
      if (redstone > 0) { newInventory.redstone += redstone; loot.push(`红石x${redstone}`); }
      if (lapisLazuli > 0) { newInventory.lapisLazuli += lapisLazuli; loot.push(`青金石x${lapisLazuli}`); }
      if (emerald > 0) { newInventory.emerald += emerald; loot.push(`绿宝石x${emerald}`); }
      if (diamond > 0) { newInventory.diamond += diamond; loot.push(`钻石x${diamond}`); }
      
      const flintChance = Math.floor(Math.random() * 4);
      if (flintChance === 3) {
        newInventory.flintAndSteel += 1;
        loot.push('打火石x1');
      }
      
      overworldMap[targetX][targetY] = CellType.EMPTY;
      set({ inventory: newInventory, overworldMap });
      get().addMessage(`开启箱子获得: ${loot.join(', ')}`, 'success');
    } else if (biome !== Biome.OVERWORLD && netherMap[targetX][targetY] === NetherCellType.NETHER_CHEST) {
      const newInventory = { ...inventory };
      const loot: string[] = [];
      
      const netherQuartz = Math.floor(Math.random() * 10);
      const glowstone = Math.floor(Math.random() * 10);
      
      if (netherQuartz > 0) { newInventory.netherQuartz += netherQuartz; loot.push(`下界石英x${netherQuartz}`); }
      if (glowstone > 0) { newInventory.glowstone += glowstone; loot.push(`萤石x${glowstone}`); }
      
      netherMap[targetX][targetY] = NetherCellType.NETHERRACK;
      set({ inventory: newInventory, netherMap });
      get().addMessage(`开启下界箱子获得: ${loot.join(', ')}`, 'success');
    }
  },

  attackMobs: () => {
    const state = get();
    const { playerPos, overworldMap, netherMap, zombies, skeletons, lavaZombies, biome, inventory } = state;
    
    const directions = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ];
    
    if (biome === Biome.OVERWORLD) {
      for (const dir of directions) {
        const targetX = playerPos.x + dir.x;
        const targetY = playerPos.y + dir.y;
        
        // Attack zombies
        const zombieIndex = zombies.findIndex(z => z.x === targetX && z.y === targetY);
        if (zombieIndex !== -1) {
          zombies[zombieIndex].hp--;
          
          if (zombies[zombieIndex].hp === 2) {
            overworldMap[targetX][targetY] = CellType.ZOMBIE_2HP;
            get().addMessage('攻击僵尸！剩余2点生命', 'info');
          }
          else if (zombies[zombieIndex].hp === 1) {
            overworldMap[targetX][targetY] = CellType.ZOMBIE_1HP;
            get().addMessage('攻击僵尸！剩余1点生命', 'info');
          }
          else if (zombies[zombieIndex].hp <= 0) {
            overworldMap[targetX][targetY] = CellType.EMPTY;
            const rottenFlesh = Math.floor(Math.random() * 5);
            inventory.rottenFlesh += rottenFlesh;
            zombies.splice(zombieIndex, 1);
            get().addMessage(`击杀僵尸！获得腐肉x${rottenFlesh}`, 'success');
          }
        }
        
        // Attack skeletons
        const skeletonIndex = skeletons.findIndex(s => s.x === targetX && s.y === targetY);
        if (skeletonIndex !== -1) {
          skeletons[skeletonIndex].hp--;
          
          if (skeletons[skeletonIndex].hp === 2) {
            overworldMap[targetX][targetY] = CellType.SKELETON_2HP;
            get().addMessage('攻击骷髅！剩余2点生命', 'info');
          }
          else if (skeletons[skeletonIndex].hp === 1) {
            overworldMap[targetX][targetY] = CellType.SKELETON_1HP;
            get().addMessage('攻击骷髅！剩余1点生命', 'info');
          }
          else if (skeletons[skeletonIndex].hp <= 0) {
            overworldMap[targetX][targetY] = CellType.EMPTY;
            const bones = Math.floor(Math.random() * 4);
            inventory.bone += bones;
            skeletons.splice(skeletonIndex, 1);
            get().addMessage(`击杀骷髅！获得骨头x${bones}`, 'success');
          }
        }
      }
    } else {
      // Attack lava zombies in Nether
      for (const dir of directions) {
        const targetX = playerPos.x + dir.x;
        const targetY = playerPos.y + dir.y;
        
        const lavaZombieIndex = lavaZombies.findIndex(lz => lz.x === targetX && lz.y === targetY);
        if (lavaZombieIndex !== -1) {
          lavaZombies[lavaZombieIndex].hp--;
          
          if (lavaZombies[lavaZombieIndex].hp <= 0) {
            netherMap[targetX][targetY] = NetherCellType.NETHERRACK;
            const rottenFlesh = Math.floor(Math.random() * 5);
            const goldIngot = Math.floor(Math.random() * 2);
            inventory.rottenFlesh += rottenFlesh;
            inventory.goldIngot += goldIngot;
            lavaZombies.splice(lavaZombieIndex, 1);
          } else {
            netherMap[targetX][targetY] = (NetherCellType.LAVA_ZOMBIE + (5 - lavaZombies[lavaZombieIndex].hp)) as NetherCellType;
          }
        }
      }
    }
    
    set({ zombies, skeletons, lavaZombies, inventory, overworldMap, netherMap });
  },

  applyItem: (item: keyof Inventory) => {
    const state = get();
    const { inventory, playerPos, overworldMap } = state;
    
    if (inventory[item] <= 0) {
      get().addMessage('该道具数量不足！', 'warning');
      return;
    }
    
    if (item === 'enderPearl') {
      // Teleport logic
      inventory.enderPearl--;
      // TODO: 实现传送逻辑
      set({ inventory });
      get().addMessage('使用了末影珍珠！', 'info');
    } else if (item === 'healingPotion') {
      inventory.healingPotion--;
      set({ hp: state.maxHp, inventory });
      get().addMessage('生命值已恢复至满血！', 'success');
    } else if (item === 'splashPotion') {
      inventory.splashPotion--;
      // Damage mobs in 5x5 area
      const { zombies, skeletons } = state;
      
      let killedCount = 0;
      
      // 恢复被杀怪物的底层方块
      zombies.forEach(z => {
        if (Math.abs(z.x - playerPos.x) <= 2 && Math.abs(z.y - playerPos.y) <= 2) {
          overworldMap[z.x][z.y] = (z.underlyingCell as CellType) ?? CellType.EMPTY;
          killedCount++;
        }
      });
      
      skeletons.forEach(s => {
        if (Math.abs(s.x - playerPos.x) <= 2 && Math.abs(s.y - playerPos.y) <= 2) {
          overworldMap[s.x][s.y] = (s.underlyingCell as CellType) ?? CellType.EMPTY;
          killedCount++;
        }
      });
      
      const newZombies = zombies.filter(z => 
        Math.abs(z.x - playerPos.x) > 2 || Math.abs(z.y - playerPos.y) > 2
      );
      const newSkeletons = skeletons.filter(s => 
        Math.abs(s.x - playerPos.x) > 2 || Math.abs(s.y - playerPos.y) > 2
      );
      
      set({ zombies: newZombies, skeletons: newSkeletons, inventory, overworldMap });
      get().addMessage(`喷溅药水击杀了 ${killedCount} 个怪物！`, 'success');
    } else if (item === 'flintAndSteel') {
      // Use flint and steel to enter nether directly
      const directions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 }
      ];
      
      let foundDoor = false;
      for (const dir of directions) {
        const targetX = playerPos.x + dir.x;
        const targetY = playerPos.y + dir.y;
        if (overworldMap[targetX][targetY] === CellType.DOOR) {
          inventory.flintAndSteel--;
          foundDoor = true;
          set({ inventory });
          get().addMessage('打火石激活传送门，进入下界！', 'success');
          // Enter nether directly
          get().enterNether();
          break;
        }
      }
      
      if (!foundDoor) {
        get().addMessage('附近没有传送门！', 'warning');
      }
    }
  },

  eatFood: (food: 'rottenFlesh' | 'bread', amount: number) => {
    const state = get();
    const { inventory, hunger, maxHunger } = state;
    
    const actualAmount = Math.min(amount, inventory[food]);
    inventory[food] -= actualAmount;
    
    const hungerRestore = food === 'rottenFlesh' ? actualAmount * 1 : actualAmount * 3;
    const newHunger = Math.min(maxHunger, hunger + hungerRestore);
    
    set({ hunger: newHunger, inventory });
  },

  toggleDebug: () => {
    set(state => ({ isDebugMode: !state.isDebugMode }));
  },

  resetGame: () => {
    set({
      hp: 20,
      hunger: 20,
      money: 0,
      inventory: createEmptyInventory(),
      step: 0,
      isGameOver: false,
      deathMessage: '',
      isDoorActivated: false,
      arrows: [],
      currentScreen: 'menu',
    });
  },

  enterNether: () => {
    const state = get();
    const { mapSize, playerPos, overworldMap } = state;
    
    // 保存主世界玩家位置，不留下遗体
    overworldMap[playerPos.x][playerPos.y] = CellType.EMPTY;
    
    const netherMap = createEmptyNetherMap(mapSize);
    const mid = mapSize % 2 === 0 ? mapSize / 2 : (mapSize + 1) / 2;
    
    // Create nether fortress in center
    for (let i = 1; i <= mapSize; i++) {
      for (let j = 1; j <= mapSize; j++) {
        if (i >= mid - 1 && i <= mid + 1 || j >= mid - 1 && j <= mid + 1) {
          netherMap[i][j] = NetherCellType.NETHER_BRICK;
        }
      }
    }
    
    // Place doors and chest
    netherMap[1][1] = NetherCellType.NETHER_DOOR;
    netherMap[mid][mid] = NetherCellType.NETHER_CHEST;
    
    // Place player
    netherMap[1][2] = NetherCellType.NETHER_PLAYER;
    
    // Generate lava zombies
    const lavaZombieCount = mapSize < 10 ? 1 : 2;
    const lavaZombies: Entity[] = [];
    for (let i = 0; i < lavaZombieCount; i++) {
      const x = Math.floor(Math.random() * 3) + mid - 1;
      const y = Math.floor(Math.random() * 3) + mid - 1;
      if (x !== mid || y !== mid) {
        // 记录底层方块
        const underlyingCell = netherMap[x][y];
        lavaZombies.push({ x, y, hp: 5, underlyingCell });
        netherMap[x][y] = NetherCellType.LAVA_ZOMBIE;
      }
    }
    
    set({
      netherMap,
      lavaZombies,
      playerPos: { x: 1, y: 2 },
      biome: Biome.NETHER,
      currentScreen: 'nether',
      overworldMap, // 保存清理后的主世界地图
    });
  },

  exitNether: () => {
    const state = get();
    const { netherMap, playerPos: netherPos } = state;
    
    // 清理下界玩家位置，不留下遗体
    const mid = state.mapSize % 2 === 0 ? state.mapSize / 2 : (state.mapSize + 1) / 2;
    const isInFortress = (netherPos.x >= mid - 1 && netherPos.x <= mid + 1) || 
                         (netherPos.y >= mid - 1 && netherPos.y <= mid + 1);
    netherMap[netherPos.x][netherPos.y] = isInFortress ? NetherCellType.NETHER_BRICK : NetherCellType.NETHERRACK;
    
    // 从下界返回时，直接进入下一关
    set({ netherMap });
    get().addMessage('从下界返回，进入下一关！', 'success');
    get().nextLevel();
  },

  updateStep: () => {
    const state = get();
    const { step, hunger, hp } = state;
    
    // Update hunger every 10 steps
    if (step > 0 && step % 10 === 0 && hunger > 0) {
      const newHunger = hunger - 1;
      set({ hunger: newHunger });
      
      // Regenerate health when full
      if (hunger === 20 && hp < 20) {
        set({ hp: Math.min(20, hp + 1) });
      }
      
      // Take damage when starving
      if (newHunger === 0) {
        const newHp = hp - 1;
        set({ hp: newHp });
        if (newHp <= 0) {
          set({ 
            isGameOver: true, 
            deathMessage: 'You starved to death.',
            currentScreen: 'death'
          });
        }
      }
    }
  },

  checkGameOver: () => {
    const state = get();
    if (state.hp <= 0) {
      set({ 
        isGameOver: true,
        currentScreen: 'death'
      });
    }
  },

  setCurrentScreen: (screen: GameState['currentScreen']) => {
    set({ currentScreen: screen });
  },

  buyItem: (item: keyof Inventory, amount: number) => {
    const state = get();
    const { money, inventory } = state;
    const price = ITEM_PRICES[item];
    const totalCost = price * amount;
    
    if (money >= totalCost) {
      inventory[item] += amount;
      set({ money: money - totalCost, inventory });
      return true;
    }
    return false;
  },

  sellAllResources: () => {
    const state = get();
    const { inventory, money } = state;
    
    let totalEarnings = 0;
    const resourcesToSell: (keyof Inventory)[] = [
      'cobblestone', 'coal', 'ironIngot', 'goldIngot', 
      'redstone', 'lapisLazuli', 'emerald', 'diamond',
      'netherQuartz', 'glowstone'
    ];
    
    resourcesToSell.forEach(item => {
      totalEarnings += inventory[item] * ITEM_PRICES[item];
      inventory[item] = 0;
    });
    
    set({ money: money + totalEarnings, inventory });
  },

  nextLevel: () => {
    const state = get();
    const { mapSize, isCheatEnabled } = state;
    // 保持当前的生命值、饱食度、金钱和物品栏，只重新生成地图
    get().initGame(mapSize, isCheatEnabled);
    // 恢复玩家状态（因为initGame会重置）
    set({
      hp: state.hp,
      hunger: state.hunger,
      money: state.money,
      inventory: state.inventory,
      step: state.step,
    });
    get().addMessage('进入新的关卡！', 'success');
  },

  addMessage: (text: string, type: GameMessage['type'] = 'info') => {
    const state = get();
    const newMessage: GameMessage = {
      id: Date.now(),
      text,
      type,
      timestamp: Date.now(),
    };
    const messages = [...state.messages, newMessage];
    // 只保留最近20条消息
    if (messages.length > 20) {
      messages.shift();
    }
    set({ messages });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  removeMessage: (id: number) => {
    const state = get();
    const messages = state.messages.filter(m => m.id !== id);
    set({ messages });
  },

  executeCommand: (command: string) => {
    const state = get();
    const cmd = command.trim().toLowerCase();
    
    if (cmd.startsWith('/tp ')) {
      // 传送指令
      const parts = cmd.split(' ');
      if (parts.length >= 3) {
        const x = parseInt(parts[1]);
        const y = parseInt(parts[2]);
        if (!isNaN(x) && !isNaN(y) && x >= 1 && x <= state.mapSize && y >= 1 && y <= state.mapSize) {
          state.overworldMap[state.playerPos.x][state.playerPos.y] = CellType.EMPTY;
          state.overworldMap[x][y] = CellType.PLAYER;
          set({ playerPos: { x, y } });
          get().addMessage(`传送到 (${x}, ${y})`, 'success');
        } else {
          get().addMessage('无效的坐标！', 'error');
        }
      }
    } else if (cmd.startsWith('/give ')) {
      // 给予物品指令
      const parts = cmd.split(' ');
      if (parts.length >= 3) {
        const inputItemName = parts[1].toLowerCase();
        const amount = parseInt(parts[2]);
        if (!isNaN(amount) && amount > 0) {
          // 物品名称映射表（支持小写输入）
          const itemMap: Record<string, keyof Inventory> = {
            'cobblestone': 'cobblestone',
            'coal': 'coal',
            'ironingot': 'ironIngot',
            'iron': 'ironIngot',
            'goldingot': 'goldIngot',
            'gold': 'goldIngot',
            'redstone': 'redstone',
            'lapislazuli': 'lapisLazuli',
            'lapis': 'lapisLazuli',
            'emerald': 'emerald',
            'diamond': 'diamond',
            'enderpearl': 'enderPearl',
            'pearl': 'enderPearl',
            'healingpotion': 'healingPotion',
            'healing': 'healingPotion',
            'splashpotion': 'splashPotion',
            'splash': 'splashPotion',
            'rottenflesh': 'rottenFlesh',
            'flesh': 'rottenFlesh',
            'bone': 'bone',
            'bread': 'bread',
            'flintandsteel': 'flintAndSteel',
            'flint': 'flintAndSteel',
            'netherquartz': 'netherQuartz',
            'quartz': 'netherQuartz',
            'glowstone': 'glowstone',
            'glow': 'glowstone',
          };
          
          const itemKey = itemMap[inputItemName];
          if (itemKey) {
            // 直接更新状态，确保触发重新渲染
            set({ 
              inventory: {
                ...state.inventory,
                [itemKey]: state.inventory[itemKey] + amount
              }
            });
            get().addMessage(`获得 ${itemKey} x${amount}`, 'success');
          } else {
            get().addMessage(`未知物品: ${inputItemName}`, 'error');
          }
        } else {
          get().addMessage('无效的数量！', 'error');
        }
      } else {
        get().addMessage('用法: /give <item> <amount>', 'error');
      }
    } else if (cmd.startsWith('/heal')) {
      set({ hp: state.maxHp, hunger: state.maxHunger });
      get().addMessage('生命值和饱食度已恢复！', 'success');
    } else if (cmd.startsWith('/kill ')) {
      // 击杀实体指令
      const target = cmd.substring(6).trim();
      if (target === 'all') {
        state.zombies.forEach(z => {
          state.overworldMap[z.x][z.y] = CellType.EMPTY;
        });
        state.skeletons.forEach(s => {
          state.overworldMap[s.x][s.y] = CellType.EMPTY;
        });
        set({ zombies: [], skeletons: [] });
        get().addMessage('已击杀所有怪物！', 'success');
      } else if (target.startsWith('zombie')) {
        const zombies = [...state.zombies];
        zombies.forEach(z => {
          state.overworldMap[z.x][z.y] = CellType.EMPTY;
        });
        set({ zombies: [] });
        get().addMessage('已击杀所有僵尸！', 'success');
      } else if (target.startsWith('skeleton')) {
        const skeletons = [...state.skeletons];
        skeletons.forEach(s => {
          state.overworldMap[s.x][s.y] = CellType.EMPTY;
        });
        set({ skeletons: [] });
        get().addMessage('已击杀所有骷髅！', 'success');
      }
    } else if (cmd === '/help') {
      get().addMessage('可用指令: /tp <x> <y>, /give <item> <amount>, /heal, /kill <all/zombie/skeleton>', 'info');
    } else {
      get().addMessage('未知指令！输入 /help 查看帮助', 'error');
    }
  },

  moveMobs: () => {
    const state = get();
    const { playerPos, overworldMap, netherMap, zombies, skeletons, lavaZombies, biome, arrows } = state;
    
    if (biome === Biome.OVERWORLD) {
      // Move zombies (with randomness to prevent all moving at once)
      zombies.forEach((zombie) => {
        // 60%的概率移动，避免所有僵尸同时行动
        if (Math.random() > 0.6) return;
        
        // 增加追击范围从3到5，但移动更慢
        const distance = Math.abs(zombie.x - playerPos.x) + Math.abs(zombie.y - playerPos.y);
        if (distance < 6 && distance > 1) { // 距离1格时不移动（已经相邻）
          const oldX = zombie.x;
          const oldY = zombie.y;
          
          // 随机选择优先方向，避免僵尸聚集
          const moveHorizontal = Math.random() > 0.5;
          let moved = false;
          
          if (moveHorizontal) {
            if (playerPos.x < zombie.x && overworldMap[zombie.x - 1][zombie.y] < CellType.WALL_1) {
              zombie.x--;
              moved = true;
            } else if (playerPos.x > zombie.x && overworldMap[zombie.x + 1][zombie.y] < CellType.WALL_1) {
              zombie.x++;
              moved = true;
            }
          }
          
          if (!moved) {
            if (playerPos.y < zombie.y && overworldMap[zombie.x][zombie.y - 1] < CellType.WALL_1) {
              zombie.y--;
            } else if (playerPos.y > zombie.y && overworldMap[zombie.x][zombie.y + 1] < CellType.WALL_1) {
              zombie.y++;
            }
          }
          
          // 检查新位置是否与玩家重叠
          if (zombie.x === playerPos.x && zombie.y === playerPos.y) {
            // 回退到旧位置，不移动
            zombie.x = oldX;
            zombie.y = oldY;
          } else if (oldX !== zombie.x || oldY !== zombie.y) {
            // 成功移动：恢复旧位置的底层方块
            overworldMap[oldX][oldY] = (zombie.underlyingCell as CellType) ?? CellType.EMPTY;
            
            // 检查新位置是否有箭矢，如果有则清除
            const arrowIndex = arrows.findIndex(a => a.x === zombie.x && a.y === zombie.y);
            if (arrowIndex !== -1) {
              // 先记录箭矢的底层方块
              const arrow = arrows[arrowIndex];
              zombie.underlyingCell = arrow.underlyingCell ?? CellType.EMPTY;
              // 然后移除箭矢
              arrows.splice(arrowIndex, 1);
            } else {
              // 记录新位置的底层方块
              zombie.underlyingCell = overworldMap[zombie.x][zombie.y];
            }
            
            // 放置僵尸
            overworldMap[zombie.x][zombie.y] = CellType.ZOMBIE;
          }
        }
      });
      
      // Move skeletons (keep optimal distance, more defensive)
      skeletons.forEach((skeleton) => {
        if (skeleton.x === 0 || skeleton.y === 0) return;
        
        // 骷髅移动概率40%
        if (Math.random() > 0.4) return;
        
        const distance = Math.abs(skeleton.x - playerPos.x) + Math.abs(skeleton.y - playerPos.y);
        const oldX = skeleton.x;
        const oldY = skeleton.y;
        
        // 保持3-4格的理想距离
        if (distance < 3) {
          // 太近了，后退
          if (skeleton.x < playerPos.x && overworldMap[skeleton.x - 1][skeleton.y] < CellType.WALL_1) {
            skeleton.x--;
          } else if (skeleton.x > playerPos.x && overworldMap[skeleton.x + 1][skeleton.y] < CellType.WALL_1) {
            skeleton.x++;
          } else if (skeleton.y < playerPos.y && overworldMap[skeleton.x][skeleton.y - 1] < CellType.WALL_1) {
            skeleton.y--;
          } else if (skeleton.y > playerPos.y && overworldMap[skeleton.x][skeleton.y + 1] < CellType.WALL_1) {
            skeleton.y++;
          }
        } else if (distance > 5) {
          // 太远了，靠近
          if (skeleton.x < playerPos.x && overworldMap[skeleton.x + 1][skeleton.y] < CellType.WALL_1) {
            skeleton.x++;
          } else if (skeleton.x > playerPos.x && overworldMap[skeleton.x - 1][skeleton.y] < CellType.WALL_1) {
            skeleton.x--;
          } else if (skeleton.y < playerPos.y && overworldMap[skeleton.x][skeleton.y + 1] < CellType.WALL_1) {
            skeleton.y++;
          } else if (skeleton.y > playerPos.y && overworldMap[skeleton.x][skeleton.y - 1] < CellType.WALL_1) {
            skeleton.y--;
          }
        }
        // 距离3-5格时不移动，保持射击距离
        
        // 检查新位置是否与玩家重叠
        if (skeleton.x === playerPos.x && skeleton.y === playerPos.y) {
          // 回退到旧位置
          skeleton.x = oldX;
          skeleton.y = oldY;
        } else if (oldX !== skeleton.x || oldY !== skeleton.y) {
          // 成功移动：恢复旧位置的底层方块
          overworldMap[oldX][oldY] = (skeleton.underlyingCell as CellType) ?? CellType.EMPTY;
          
          // 检查新位置是否有箭矢，如果有则清除
          const arrowIndex = arrows.findIndex(a => a.x === skeleton.x && a.y === skeleton.y);
          if (arrowIndex !== -1) {
            // 先记录箭矢的底层方块
            const arrow = arrows[arrowIndex];
            skeleton.underlyingCell = arrow.underlyingCell ?? CellType.EMPTY;
            // 然后移除箭矢
            arrows.splice(arrowIndex, 1);
          } else {
            // 记录新位置的底层方块
            skeleton.underlyingCell = overworldMap[skeleton.x][skeleton.y];
          }
          
          // 放置骷髅
          overworldMap[skeleton.x][skeleton.y] = CellType.SKELETON;
        }
      });
      
      set({ zombies, skeletons, arrows, overworldMap });
    } else {
      // Move lava zombies in nether
      lavaZombies.forEach((lavaZombie) => {
        if (Math.abs(lavaZombie.x - playerPos.x) < 4 && Math.abs(lavaZombie.y - playerPos.y) < 4) {
          const oldX = lavaZombie.x;
          const oldY = lavaZombie.y;
          
          if (playerPos.x < lavaZombie.x && netherMap[lavaZombie.x - 1][lavaZombie.y] < NetherCellType.NETHER_DOOR) {
            lavaZombie.x--;
          } else if (playerPos.x > lavaZombie.x && netherMap[lavaZombie.x + 1][lavaZombie.y] < NetherCellType.NETHER_DOOR) {
            lavaZombie.x++;
          } else if (playerPos.y < lavaZombie.y && netherMap[lavaZombie.x][lavaZombie.y - 1] < NetherCellType.NETHER_DOOR) {
            lavaZombie.y--;
          } else if (playerPos.y > lavaZombie.y && netherMap[lavaZombie.x][lavaZombie.y + 1] < NetherCellType.NETHER_DOOR) {
            lavaZombie.y++;
          }
          
          // 检查新位置是否与玩家重叠
          if (lavaZombie.x === playerPos.x && lavaZombie.y === playerPos.y) {
            // 回退到旧位置
            lavaZombie.x = oldX;
            lavaZombie.y = oldY;
          } else if (oldX !== lavaZombie.x || oldY !== lavaZombie.y) {
            // 成功移动：恢复旧位置的底层方块
            netherMap[oldX][oldY] = (lavaZombie.underlyingCell as NetherCellType) ?? NetherCellType.NETHERRACK;
            // 记录新位置的底层方块
            lavaZombie.underlyingCell = netherMap[lavaZombie.x][lavaZombie.y];
            // 放置熔岩僵尸
            netherMap[lavaZombie.x][lavaZombie.y] = NetherCellType.LAVA_ZOMBIE;
          }
        }
      });
      
      set({ lavaZombies, netherMap });
    }
    
    // Shoot arrows and move existing ones
    get().skeletonShoot();
    get().moveArrows();
  },

  checkMobAttacks: () => {
    const state = get();
    const { playerPos, zombies, lavaZombies, biome, hp } = state;
    const directions = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 }
    ];
    
    let newHp = hp;
    
    if (biome === Biome.OVERWORLD) {
      // Check zombie attacks
      zombies.forEach((zombie) => {
        for (const dir of directions) {
          if (playerPos.x === zombie.x + dir.x && playerPos.y === zombie.y + dir.y) {
            newHp -= 2;
            get().addMessage(`被僵尸攻击！生命值 -2`, 'error');
            break;
          }
        }
      });
      
      // 箭矢伤害已在 moveArrows() 中处理
    } else {
      // Check lava zombie attacks
      lavaZombies.forEach((lavaZombie) => {
        for (const dir of directions) {
          if (playerPos.x === lavaZombie.x + dir.x && playerPos.y === lavaZombie.y + dir.y) {
            newHp -= 2;
            get().addMessage(`被熔岩僵尸攻击！生命值 -2`, 'error');
            break;
          }
        }
      });
    }
    
    if (newHp !== hp) {
      set({ hp: newHp });
      if (newHp <= 0) {
        set({
          isGameOver: true,
          deathMessage: 'You were killed by monsters.',
          currentScreen: 'death'
        });
      }
    }
  },

  moveArrows: () => {
    const state = get();
    const { arrows, overworldMap, mapSize, playerPos, zombies, skeletons } = state;
    const directions = [
      { x: 0, y: 1 },  // EAST
      { x: 1, y: 0 },  // SOUTH
      { x: 0, y: -1 }, // WEST
      { x: -1, y: 0 }  // NORTH
    ];
    
    const newArrows = arrows.filter(arrow => {
      // 检查箭矢是否还在地图内
      if (arrow.x === 0 || arrow.y === 0 || arrow.x > mapSize || arrow.y > mapSize) {
        // 清理旧位置
        if (overworldMap[arrow.x]?.[arrow.y] === CellType.ARROW) {
          overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
        }
        return false;
      }
      
      // Move arrow
      const dir = directions[arrow.direction];
      const newX = arrow.x + dir.x;
      const newY = arrow.y + dir.y;
      
      // Check bounds
      if (newX < 1 || newX > mapSize || newY < 1 || newY > mapSize) {
        // 恢复旧位置的底层方块
        if (overworldMap[arrow.x][arrow.y] === CellType.ARROW) {
          overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
        }
        return false;
      }
      
      // Check target cell before moving
      const targetCell = overworldMap[newX][newY];
      
      // Check if hits player
      if (newX === playerPos.x && newY === playerPos.y) {
        // 恢复旧位置的底层方块
        if (overworldMap[arrow.x][arrow.y] === CellType.ARROW) {
          overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
        }
        // 造成伤害
        const currentHp = get().hp;
        const newHp = currentHp - 1;
        set({ hp: newHp });
        get().addMessage(`被箭矢击中！生命值 -1`, 'error');
        
        // 检查是否死亡
        if (newHp <= 0) {
          set({
            isGameOver: true,
            deathMessage: '你被箭矢击杀了！',
            currentScreen: 'death'
          });
        }
        return false;
      }
      
      // Check if hits zombies
      const hitZombie = zombies.some(z => z.x === newX && z.y === newY);
      if (hitZombie) {
        // 恢复旧位置的底层方块
        if (overworldMap[arrow.x][arrow.y] === CellType.ARROW) {
          overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
        }
        return false;
      }
      
      // Check if hits skeletons
      const hitSkeleton = skeletons.some(s => s.x === newX && s.y === newY);
      if (hitSkeleton) {
        // 恢复旧位置的底层方块
        if (overworldMap[arrow.x][arrow.y] === CellType.ARROW) {
          overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
        }
        return false;
      }
      
      // Check obstacles (墙壁和箱子)
      if (targetCell >= CellType.WALL_1 && targetCell <= CellType.CHEST) {
        // 恢复旧位置的底层方块
        if (overworldMap[arrow.x][arrow.y] === CellType.ARROW) {
          overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
        }
        return false;
      }
      
      // Check if hits another arrow (避免箭矢重叠滞留)
      if (targetCell === CellType.ARROW) {
        // 恢复旧位置的底层方块
        if (overworldMap[arrow.x][arrow.y] === CellType.ARROW) {
          overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
        }
        return false;
      }
      
      // Check door - arrows should pass through doors but not destroy them
      if (targetCell === CellType.DOOR) {
        // 允许箭矢穿过门，但保持门的存在
        // 恢复旧位置的底层方块
        if (overworldMap[arrow.x][arrow.y] === CellType.ARROW) {
          overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
        }
        // 记录新位置的底层方块（门）
        arrow.underlyingCell = CellType.DOOR;
        arrow.x = newX;
        arrow.y = newY;
        overworldMap[newX][newY] = CellType.ARROW;
        return true;
      }
      
      // Normal movement - 恢复旧位置，移动到新位置
      if (overworldMap[arrow.x][arrow.y] === CellType.ARROW) {
        overworldMap[arrow.x][arrow.y] = (arrow.underlyingCell as CellType) ?? CellType.EMPTY;
      }
      
      // 记录新位置的底层方块
      arrow.underlyingCell = overworldMap[newX][newY];
      arrow.x = newX;
      arrow.y = newY;
      overworldMap[newX][newY] = CellType.ARROW;
      
      return true;
    });
    
    set({ arrows: newArrows, overworldMap });
  },

  skeletonShoot: () => {
    const state = get();
    const { skeletons, playerPos, overworldMap, arrows } = state;
    
    skeletons.forEach((skeleton) => {
      if (skeleton.x === 0 || skeleton.y === 0) return;
      
      const distance = Math.abs(skeleton.x - playerPos.x) + Math.abs(skeleton.y - playerPos.y);
      if (distance > 3) return;
      
      // Shoot if aligned
      if (skeleton.x === playerPos.x) {
        if (skeleton.y < playerPos.y && overworldMap[skeleton.x][skeleton.y + 1] < CellType.WALL_1) {
          const underlyingCell = overworldMap[skeleton.x][skeleton.y + 1];
          arrows.push({ x: skeleton.x, y: skeleton.y + 1, direction: Direction.EAST, underlyingCell });
          overworldMap[skeleton.x][skeleton.y + 1] = CellType.ARROW;
        } else if (skeleton.y > playerPos.y && overworldMap[skeleton.x][skeleton.y - 1] < CellType.WALL_1) {
          const underlyingCell = overworldMap[skeleton.x][skeleton.y - 1];
          arrows.push({ x: skeleton.x, y: skeleton.y - 1, direction: Direction.WEST, underlyingCell });
          overworldMap[skeleton.x][skeleton.y - 1] = CellType.ARROW;
        }
      } else if (skeleton.y === playerPos.y) {
        if (skeleton.x < playerPos.x && overworldMap[skeleton.x + 1][skeleton.y] < CellType.WALL_1) {
          const underlyingCell = overworldMap[skeleton.x + 1][skeleton.y];
          arrows.push({ x: skeleton.x + 1, y: skeleton.y, direction: Direction.SOUTH, underlyingCell });
          overworldMap[skeleton.x + 1][skeleton.y] = CellType.ARROW;
        } else if (skeleton.x > playerPos.x && overworldMap[skeleton.x - 1][skeleton.y] < CellType.WALL_1) {
          const underlyingCell = overworldMap[skeleton.x - 1][skeleton.y];
          arrows.push({ x: skeleton.x - 1, y: skeleton.y, direction: Direction.NORTH, underlyingCell });
          overworldMap[skeleton.x - 1][skeleton.y] = CellType.ARROW;
        }
      }
    });
    
    set({ arrows, overworldMap });
  },
}));
