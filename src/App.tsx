import React from 'react';
import { useGameStore } from './store/gameStore';
import MenuScreen from './components/MenuScreen';
import GameScreen from './components/GameScreen';
import NetherScreen from './components/NetherScreen';
import DeathScreen from './components/DeathScreen';

const App: React.FC = () => {
  const { currentScreen } = useGameStore();

  return (
    <div className="min-h-screen">
      {currentScreen === 'menu' && <MenuScreen />}
      {currentScreen === 'game' && <GameScreen />}
      {currentScreen === 'nether' && <NetherScreen />}
      {currentScreen === 'death' && <DeathScreen />}
    </div>
  );
};

export default App;
