import React, { useState, useEffect, createRef } from 'react';
import Player from '../../classes/player';
import PlayerInput from '../../components/player-input/player-input';
import './player-selection.css';

type PlayerSelectionProps = {
    initialPlayers?: Player[];
    maxPlayers: Number;
    onPlayerSelectionFinished(players:Player[]): void;
}

const PlayerSelection = (props: PlayerSelectionProps) => {
  const [players, setPlayers] = useState(props.initialPlayers === undefined ? [] : props.initialPlayers);
  var componentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    componentRef.current?.focus();
  });
  
  const tryAddNewPlayer = () => {
    if (players.length < props.maxPlayers) {
      addNewPlayer([...players]);
    }
  };

  const addNewPlayer = (playerList:Player[]) => {
    playerList.push(new Player());
    setPlayers(playerList);
  };

  const tryRemoveLastPlayer = () => {
    if (players.length > 0) {
      removeLastPlayer([...players]);
    }
  };

  const removeLastPlayer = (playerList:Player[]) => {
    playerList.pop();
    setPlayers(playerList);
  };

  const finishPlayerSelection = () => {
    if (window.confirm("Are you sure you want to start playing?")) {
      props.onPlayerSelectionFinished(players); 
    }
  }

  const onPlayer_Changed = (player: Player) => {
    const ix = players.findIndex((p:Player) => p.id === player.id);
    players[ix] = player;
    setPlayers(players)
  };

  const onKey_Pressed = (key:string, code: string) => {
    if (key === '+') {
      tryAddNewPlayer();
    } else if (key === '-') {
      tryRemoveLastPlayer();
    } else if (key === 'Enter') {
      finishPlayerSelection();
    }
  };

  return (
    <div ref={componentRef} className="player-selection" data-testid="player-selection" tabIndex={0} onKeyPress={(e) => onKey_Pressed(e.key, e.code)}>
      <div className="players-msg blink">
        Press + to add a player<br/><br/>
        Press - to remove a player<br/><br/>
        Press ENTER to start playing
      </div>
      {
        players?.map((player, ix) => <PlayerInput className={"player-" + (ix + 1)} key={player.id} onChange={onPlayer_Changed}/>)
      }
    </div>
  )
};

export default PlayerSelection;