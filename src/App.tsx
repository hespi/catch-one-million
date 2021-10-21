import React, { createContext, useReducer } from 'react';
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
import useSound from 'use-sound';
import clockTickSound from './assets/audio/clock-tick.mp3';

import './App.css';
import Question from './classes/question';

enum ROUTES {
  PLAYER_SELECTION = "/",
  GAME_BOARD = "/game",
  RESULTS = "/results",
};

function App() {
  const [state, dispatch] = useReducer(GameReducer, INITIAL_GAMEDATA);
  const GameContext = createContext(state);
  
  const [playTimerTick, {stop}] = useSound(clockTickSound);

  const history = useHistory();

  const playersAreSelected = (state.players && state.players.length > 0);

  const startGame = (players:Player[]) => {
    dispatch({
      type: GameActionType.SET_PLAYERS,
      data: players
    });

    history.push(ROUTES.GAME_BOARD);
  };

  const showResults = (score:number, lastQuestionIx: number) => {
    dispatch({
      type: GameActionType.SET_SCORE,
      data: {
        score: score,
        lastQuestion: lastQuestionIx
      }
    });

    history.push(ROUTES.RESULTS);
  };

  const onPlayerSelection_Finished = (players:Player[]) => {
    startGame(players);
    playTimerTick();
  };

  const onGame_QuestionAnswered = (index:number, question:Question) => {
    stop();
  }

  const onGame_QuestionsFinished = (score:number, lastQuestionIx:number) => {
      showResults(score, lastQuestionIx);    
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
    <GameContext.Provider value={state}>
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
                questions={state.questions.filter((q) => !q.disabled)}
                onAllQuestionsAnswered={onGame_QuestionsFinished}
                onQuestionAnswered={onGame_QuestionAnswered}
              /> 
            }
          </Route>
          <Route exact path={ROUTES.RESULTS}>
            { !playersAreSelected 
            ? <Redirect to={ROUTES.PLAYER_SELECTION} />
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
    </GameContext.Provider>
  );
}

export default App;
