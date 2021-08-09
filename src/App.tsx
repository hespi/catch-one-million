import React, { useReducer } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import PlayerSelection from './pages/player-selection/player-selection';
import QuestionBoard from './pages/question-board/question-board';
import GameResults from './pages/game-results/game-results';
import Player from './classes/player';
import GameReducer, { GameActionType } from './game-reducer';
import {INITIAL_GAMEDATA} from './assets/game-data';

import './App.css';

enum ROUTES {
  PLAYER_SELECTION = "/",
  GAME_BOARD = "/game",
  RESULTS = "/results",
};

function App() {
  const [state, dispatch] = useReducer(GameReducer, INITIAL_GAMEDATA);
  const history = useHistory();

  const playersAreSelected = (state.players && state.players.length > 0);

  const startGame = (players:Player[]) => {
    dispatch({
      type: GameActionType.SET_PLAYERS,
      data: players
    });

    history.push(ROUTES.GAME_BOARD);
  };

  const showResults = (score:number) => {
    dispatch({
      type: GameActionType.SET_SCORE,
      data: score
    });

    history.push(ROUTES.RESULTS);
  };

  const onPlayerSelection_Finished = (players:Player[]) => {
    startGame(players);
  };

  const onGame_Finished = (finalScore:number) => {
    showResults(finalScore);
  }

  const onResults_Download = () => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    var dlAnchorElem = document.getElementById('downloadGameData');
    if (dlAnchorElem != null) {
      dlAnchorElem.setAttribute("href",dataStr);
      dlAnchorElem.setAttribute("download", "game-results.json");
      dlAnchorElem.click();
    }
  }

  return (
    <div className="catch-one-million" data-testid="game-home">
      <div className="game-title">
        <h1>Catch one million</h1>
        <h2>The Prime Game</h2>
      </div>
      <Switch>
        <Route exact path={ROUTES.PLAYER_SELECTION}>
          <PlayerSelection maxPlayers={8} onPlayerSelectionFinished={onPlayerSelection_Finished} />
        </Route>
        <Route exact path={ROUTES.GAME_BOARD}>
          {!playersAreSelected 
          ? <Redirect to={ROUTES.PLAYER_SELECTION} /> 
          : <QuestionBoard 
              initialScore={state.score} 
              questionTimeInSeconds={state.questionTimeInSeconds} 
              players={state.players} 
              questions={state.questions}
              onQuestionsAnswered={onGame_Finished}
            /> 
          }
        </Route>
        <Route exact path={ROUTES.RESULTS}>
          { state.score === undefined 
          ? <Redirect to={ROUTES.GAME_BOARD} />
          : <GameResults
              maxScore={INITIAL_GAMEDATA.score}
              score={state.score}
              onResultsDownload={onResults_Download}
            />
          }
        </Route>
      </Switch>
      <a id="downloadGameData" style={{display: 'none'}}></a>
    </div>
  );
}

export default App;
