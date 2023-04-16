import { useState, useContext } from 'react';
import { PlayersContext } from '../../context/PlayerContext';
import './ContainerChilds.css'

const ContainerChilds = ({ onGoBackClick }) => {
  const [rounds, setRounds] = useState(0);
  const [playerPoints, setPlayerPoints] = useState({});
  const contextData = useContext(PlayersContext);

  const goBack = () => {
    onGoBackClick();
  };

  const handleCalculateClick = () => {
    setRounds(rounds + 1)
    let newPoints = {};
    contextData.players.forEach((player) => {
      const roundsToWin = Number(
        document.querySelector(`#${player}-rounds-to-win`).value
      );
      const roundsWon = Number(
        document.querySelector(`#${player}-rounds-won`).value
      );
      if (roundsToWin === roundsWon) {
        newPoints[player] = (playerPoints[player] || 0) + roundsWon;
      } else if (roundsToWin > roundsWon) {
        newPoints[player] = (playerPoints[player] || 0) - (roundsToWin);
      } else if (roundsToWin < roundsWon) {
        newPoints[player] = (playerPoints[player] || 0) - (roundsWon);
      }
    });
    setPlayerPoints(newPoints);
  };

  return (
    <div className='principalContainer'>
      <h1 className='title'>ROUNDS: {rounds} </h1>
      {contextData.players.map((player) => (
        <div className="playerDiv" key={player}>
          <div className='playerNameDiv'>
            <p className='playerName'>
              {player} | Points: {playerPoints[player] || 0}
            </p>
          </div>
          <div className='divRoundsToWin'>
            <p>Rounds to win:</p> 
            <input className='inputValues' id={`${player}-rounds-to-win`} type="number" />
          </div>
          <div className='divRoundsWon'>
            <p>Rounds won: </p>
            <input className='inputValues' id={`${player}-rounds-won`} type="number" />
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
