import { useState, useEffect, useContext } from "react";
import "./Players.css";
import { PlayersContext } from "../../context/PlayerContext";
import logo from "../../assets/wallpapersg.png"

const Players = ({ onGoClick }) => {

  const contextData = useContext(PlayersContext);

  const [playerInput, setPlayerInput] = useState("");

  useEffect(() => {
    console.log(contextData.players);
  }, [contextData.players]);

  const handleAddPlayer = () => {
    if (playerInput === "" || /\d/.test(playerInput)) {
      return;
    }
    contextData.setPlayers([...contextData.players, playerInput]);
    setPlayerInput("");
  };

  const handleInputChange = (event) => {
    setPlayerInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleAddPlayer();
    }
  };

  const handleGoClick = () => {
    if (contextData.players.length === 0 || contextData.players.length === 1) {
      return;
    } else {
      onGoClick();
    }
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = [...contextData.players];
    updatedPlayers.splice(index, 1);
    contextData.setPlayers(updatedPlayers);
  };

  return (
    <div className="principal">
      <img className="logo" src={logo} alt="logo" width={250}></img>
      <div className="Players">
        
        <h2 className="titleAdd">Add Players!</h2>

        <input
          className="inputPlayers"
          type="text"
          placeholder="Enter a player"
          value={playerInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="buttonAddGo" onClick={handleAddPlayer}> Add </button>
        <button className="buttonAddGo" onClick={handleGoClick}>Go!</button>
        <ul>
          {contextData.players.map((player, index) => (
            <div className="divPlayer" key={index}>
              <button className="buttonRemovePlayer" onClick={() => handleRemovePlayer(index)}>X</button>
              <li className="liPlayer">{player}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Players;
