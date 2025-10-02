export enum CellType {
  EMPTY = 0,
  DIRT_1 = 1,
  DIRT_2 = 2,
  DIRT_3 = 3,
  DIRT_4 = 4,
  WALL_1 = 5,
  WALL_2 = 6,
  WALL_3 = 7,
  CHEST = 8,
  ZOMBIE = 9,
  PLAYER = 10,
  DOOR = 11,
  ZOMBIE_2HP = 12,
  ZOMBIE_1HP = 13,
  SKELETON = 14,
  SKELETON_2HP = 15,
  SKELETON_1HP = 16,
  ARROW = 17,
  ACTIVATED_DOOR = 18,
}

export enum NetherCellType {
  NETHERRACK = 0,
  NETHER_BRICK = 1,
  NETHER_PLAYER = 2,
  NETHER_DOOR = 3,
  NETHER_CHEST = 4,
  LAVA_ZOMBIE = 5,
  LAVA_ZOMBIE_4HP = 6,
  LAVA_ZOMBIE_3HP = 7,
  LAVA_ZOMBIE_2HP = 8,
  LAVA_ZOMBIE_1HP = 9,
}

export enum Direction {
  EAST = 0,
  SOUTH = 1,
  WEST = 2,
  NORTH = 3,
}

export enum Biome {
  OVERWORLD = 0,
  NETHER = 1,
  NETHER_FORTRESS = 2,
}

export interface Position {
  x: number;
  y: number;
}

export interface Entity extends Position {
  hp: number;
  underlyingCell?: CellType | NetherCellType; // 记录怪物下方的原始方块
}

export interface Arrow extends Position {
  direction: Direction;
  underlyingCell?: CellType | NetherCellType; // 箭矢下方的原始方块
}

export interface Inventory {
  cobblestone: number;
  coal: number;
  ironIngot: number;
  goldIngot: number;
  redstone: number;
  lapisLazuli: number;
  emerald: number;
  diamond: number;
  enderPearl: number;
  healingPotion: number;
  splashPotion: number;
  rottenFlesh: number;
  bone: number;
  bread: number;
  flintAndSteel: number;
  netherQuartz: number;
  glowstone: number;
}

export interface GameMessage {
  id: number;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

export interface GameState {
  // Map
  mapSize: number;
  overworldMap: CellType[][];
  netherMap: NetherCellType[][];
  
  // Player
  playerPos: Position;
  playerDirection: Direction;
  playerUnderlyingCell: CellType | NetherCellType; // 玩家下方的原始方块
  hp: number;
  maxHp: number;
  hunger: number;
  maxHunger: number;
  money: number;
  inventory: Inventory;
  
  // Entities
  zombies: Entity[];
  skeletons: Entity[];
  arrows: Arrow[];
  lavaZombies: Entity[];
  
  // Game state
  biome: Biome;
  step: number;
  isGameOver: boolean;
  deathMessage: string;
  isDebugMode: boolean;
  isCheatEnabled: boolean;
  isDoorActivated: boolean;
  
  // UI state
  currentScreen: 'menu' | 'game' | 'nether' | 'shop' | 'inventory' | 'death';
  showTutorial: boolean;
  messages: GameMessage[];
}

export const ITEM_PRICES: Record<keyof Inventory, number> = {
  cobblestone: 1,
  coal: 5,
  ironIngot: 100,
  goldIngot: 100,
  redstone: 200,
  lapisLazuli: 300,
  emerald: 1000,
  diamond: 5000,
  enderPearl: 100000,
  healingPotion: 500000,
  splashPotion: 300000,
  rottenFlesh: 0,
  bone: 0,
  bread: 10,
  flintAndSteel: 0,
  netherQuartz: 100000,
  glowstone: 200000,
};

export const SLOGANS = [
  "The Next Level! It's the Nether!",
  "Will you open chests again?",
  "Open Chests, kill Mobs!",
  "Made By hezhibao!",
  "Canary Version Made By ZycNotFound!",
  "Publicize By kaikaikaihuaya!",
  "Inspiration By Heletong!",
  "Noooooooooooo! I want to play CHESTS IN THE MAPS!",
  "Where is the door???",
  "There's a chest!",
  "The colorful world!"
];
