import { useState, useContext, useRef } from 'react';
import { PlayersContext } from '../../context/PlayerContext';
import './ContainerChilds.css'

const ContainerChilds = ({ onGoBackClick }) => {
  const [rounds, setRounds] = useState(0);
  const [playerPoints, setPlayerPoints] = useState({});
  const contextData = useContext(PlayersContext);
  const inputRefs = useRef([]);

  const goBack = () => {
    onGoBackClick();
  };

  const handleCalculateClick = () => {
    setRounds(rounds + 1)
    let newPoints = {};
    contextData.players.forEach((player, index) => {
      const roundsToWin = Number(inputRefs.current[index].value);
      const roundsWon = Number(inputRefs.current[index + contextData.players.length].value);
      if (roundsToWin === roundsWon) {
        newPoints[player] = (playerPoints[player] || 0) + roundsWon;
      } else if (roundsToWin > roundsWon) {
        newPoints[player] = (playerPoints[player] || 0) - (roundsToWin);
      } else if (roundsToWin < roundsWon) {
        newPoints[player] = (playerPoints[player] || 0) - (roundsWon);
      }
      inputRefs.current[index].value = "";
      inputRefs.current[index + contextData.players.length].value = "";
    });
    setPlayerPoints(newPoints);
  };

  return (
    <div className='principalContainer'>
      <h1 className='title'>ROUNDS: {rounds} </h1>
      {contextData.players.map((player, index) => (
        <div className="playerDiv" key={player}>
          <div className='playerNameDiv'>
            <p className='playerName'>
              {player} | Points: {playerPoints[player] || 0}
            </p>
          </div>
          <div className='divRoundsToWin'>
            <p>Rounds to win:</p> 
            <input ref={el => inputRefs.current[index] = el} className='inputValues' id={`${player}-rounds-to-win`} type="number" />
          </div>
          <div className='divRoundsWon'>
            <p>Rounds won: </p>
            <input ref={el => inputRefs.current[index + contextData.players.length] = el} className='inputValues' id={`${player}-rounds-won`} type="number" />
          </div>
        </div>
      ))}
      <div className='divButtons'>
        <button className='buttonBack' onClick={goBack}>Back</button>
        <button className='buttonCalculate' onClick={handleCalculateClick}>Calculate</button>
      </div>
    </div>
  );
};

export default ContainerChilds;
