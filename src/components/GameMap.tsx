import React from 'react';
import { useGameStore } from '../store/gameStore';
import { CellType, NetherCellType, Biome } from '../types/game';
import { Box, Skull, Flame, ChevronRight, DoorOpen, DoorClosed } from 'lucide-react';

const GameMap: React.FC = () => {
  const { overworldMap, netherMap, mapSize, biome } = useGameStore();
  const map = biome === Biome.OVERWORLD ? overworldMap : netherMap;

  const getCellColor = (cellType: number, isNether: boolean): string => {
    if (!isNether) {
      switch (cellType as CellType) {
        case CellType.EMPTY:
        case CellType.DIRT_1:
        case CellType.DIRT_2:
        case CellType.DIRT_3:
        case CellType.DIRT_4:
          return 'bg-amber-100';
        case CellType.WALL_1:
        case CellType.WALL_2:
        case CellType.WALL_3:
          return 'bg-gray-500';
        case CellType.CHEST:
          return 'bg-yellow-600';
        case CellType.ZOMBIE:
        case CellType.ZOMBIE_2HP:
        case CellType.ZOMBIE_1HP:
          return 'bg-green-600';
        case CellType.PLAYER:
          return 'bg-blue-500';
        case CellType.DOOR:
          return 'bg-gray-800';
        case CellType.SKELETON:
        case CellType.SKELETON_2HP:
        case CellType.SKELETON_1HP:
          return 'bg-gray-300';
        case CellType.ARROW:
          return 'bg-white';
        case CellType.ACTIVATED_DOOR:
          return 'bg-purple-600';
        default:
          return 'bg-amber-100';
      }
    } else {
      switch (cellType as NetherCellType) {
        case NetherCellType.NETHERRACK:
          return 'bg-red-900';
        case NetherCellType.NETHER_BRICK:
          return 'bg-red-950';
        case NetherCellType.NETHER_PLAYER:
          return 'bg-blue-500';
        case NetherCellType.NETHER_DOOR:
          return 'bg-purple-600';
        case NetherCellType.NETHER_CHEST:
          return 'bg-yellow-600';
        case NetherCellType.LAVA_ZOMBIE:
        case NetherCellType.LAVA_ZOMBIE_4HP:
        case NetherCellType.LAVA_ZOMBIE_3HP:
        case NetherCellType.LAVA_ZOMBIE_2HP:
        case NetherCellType.LAVA_ZOMBIE_1HP:
          return 'bg-orange-500';
        default:
          return 'bg-red-900';
      }
    }
  };

  const getCellIcon = (cellType: number, isNether: boolean): React.ReactNode => {
    if (!isNether) {
      switch (cellType as CellType) {
        case CellType.CHEST:
          return <Box className="w-4 h-4 text-white" />;
        case CellType.ZOMBIE:
        case CellType.ZOMBIE_2HP:
        case CellType.ZOMBIE_1HP:
          return <span className="text-white text-xs font-bold">Z</span>;
        case CellType.PLAYER:
          return <span className="text-white text-xs font-bold">@</span>;
        case CellType.DOOR:
          return <DoorClosed className="w-4 h-4 text-white" />;
        case CellType.ACTIVATED_DOOR:
          return <DoorOpen className="w-4 h-4 text-white" />;
        case CellType.SKELETON:
        case CellType.SKELETON_2HP:
        case CellType.SKELETON_1HP:
          return <Skull className="w-4 h-4 text-white" />;
        case CellType.ARROW:
          return <ChevronRight className="w-4 h-4 text-gray-700" />;
        case CellType.WALL_1:
        case CellType.WALL_2:
        case CellType.WALL_3:
          return <span className="text-white text-xs font-bold">W</span>;
        default:
          return null;
      }
    } else {
      switch (cellType as NetherCellType) {
        case NetherCellType.NETHER_BRICK:
          return <span className="text-red-400 text-xs font-bold">N</span>;
        case NetherCellType.NETHER_PLAYER:
          return <span className="text-white text-xs font-bold">@</span>;
        case NetherCellType.NETHER_DOOR:
          return <DoorOpen className="w-4 h-4 text-white" />;
        case NetherCellType.NETHER_CHEST:
          return <Box className="w-4 h-4 text-white" />;
        case NetherCellType.LAVA_ZOMBIE:
        case NetherCellType.LAVA_ZOMBIE_4HP:
        case NetherCellType.LAVA_ZOMBIE_3HP:
        case NetherCellType.LAVA_ZOMBIE_2HP:
        case NetherCellType.LAVA_ZOMBIE_1HP:
          return <Flame className="w-4 h-4 text-white" />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Column numbers */}
      <div className="flex gap-0.5">
        <div className="w-8" /> {/* Spacer for row numbers */}
        {Array.from({ length: mapSize }, (_, i) => (
          <div key={i} className="w-8 h-6 flex items-center justify-center text-xs font-bold text-gray-600">
            {i + 1}
          </div>
        ))}
      </div>
      
      {/* Map grid */}
      {map.slice(1, mapSize + 1).map((row, i) => (
        <div key={i} className="flex gap-0.5">
          {/* Row number */}
          <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-600">
            {i + 1}
          </div>
          
          {/* Row cells */}
          {row.slice(1, mapSize + 1).map((cell, j) => (
            <div
              key={j}
              className={`w-8 h-8 flex items-center justify-center border border-gray-400 ${getCellColor(cell, biome !== Biome.OVERWORLD)}`}
            >
              {getCellIcon(cell, biome !== Biome.OVERWORLD)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameMap;
