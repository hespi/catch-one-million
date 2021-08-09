import React, { useState } from 'react';
import Player from '../../classes/player';
import './player-input.css';

type PlayerInputProps = {
    className?: string;
    onChange(player: Player): void;
    player?: Player;
}

const PlayerInput = (props: PlayerInputProps) => {
  const [player, setPlayer] = useState(props.player);

  const onPlayerName_Change = (value: string) => {
      const changedPlayer = Object.assign({}, player);
      changedPlayer.name = value;
      setPlayer(changedPlayer);
      props.onChange(changedPlayer);
  };

  const onPlayerEmail_Change = (value: string) => {
    const changedPlayer = Object.assign({}, player);
    changedPlayer.email = value;
    setPlayer(changedPlayer);
    props.onChange(changedPlayer);
};

const onPlayerTeam_Change = (value: string) => {
    const changedPlayer = Object.assign({}, player);
    changedPlayer.team = value;
    setPlayer(changedPlayer);
    props.onChange(changedPlayer);
};

  return (
    <div className={"player-input " + props.className}>
      <div className="player-avatar">
      </div>
      <div className="player-info">
          <div className="form-input player-name">
              <label htmlFor="name">Name:</label>
              <input type="text" maxLength={50} value={player?.name} placeholder="Name Surname" onChange={(e) => onPlayerName_Change(e.target.value)}/>
          </div>
          <div className="form-input player-email">
              <label htmlFor="email">Email:</label>
              <input type="email" value={player?.email} placeholder="name.surname@edreamsodigeo.com" onChange={(e) => onPlayerEmail_Change(e.target.value)}/>
          </div>
          <div className="form-input player-team">
              <label htmlFor="team">Team:</label>
              <input type="text" value={player?.team} onChange={(e) => onPlayerTeam_Change(e.target.value)}/>
          </div>
      </div>
    </div>
  )
};

export default PlayerInput;