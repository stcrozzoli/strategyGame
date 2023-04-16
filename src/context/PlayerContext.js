import React, {useState} from 'react';
 
export const PlayersContext = React.createContext();

export const PlayerProvider = (props) => {
    const [players, setPlayers] = useState([]);
    const value = {players, setPlayers}

    return(
        <PlayersContext.Provider value={value}>
            {props.children}
        </PlayersContext.Provider>
    )
}