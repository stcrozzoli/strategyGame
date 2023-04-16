import './App.css';
import Players from './components/Players/Players';
import { useState } from 'react';
import { PlayerProvider } from './context/PlayerContext';
import ContainerChilds from './components/ContainerChilds/ContainerChilds';

function App() {
  const [showPlayers, setShowPlayers] = useState(true);

  const handleGoClick = () => {
    setShowPlayers(false);
  };

  const handleGoClick2 = () => {
    setShowPlayers(true);
  };

  return (
    <PlayerProvider>
      <div className="App">
        {showPlayers && <Players onGoClick={handleGoClick} />}
        {!showPlayers && <ContainerChilds onGoBackClick={handleGoClick2} />}
      </div>
    </PlayerProvider>
  );
}

export default App;
