import React, { useMemo } from 'react';
import './game-results.css';

type GameResultsdProps = {
    maxScore: number;
    score: number;
    onResultsDownload(): void;
}

const GameResults = (props: GameResultsdProps) => {
  
  const rankClass = useMemo(() => {
    const rank = props.score * 4 / props.maxScore;
    if (rank >= 3.0) {
      return "awesome";
    } else if (rank >= 2.0) {
      return "high";
    } else if (rank >= 1.0) {
      return "medium";
    }
    return "low";
  }, [props.maxScore, props.score]);

  return (
    <div className="game-results" data-testid="game-results" tabIndex={0}>
      <div className={"final-score rank-" + rankClass}>
        <div>Your score is:{props.score}</div>
        <div>Your rank is: {rankClass.toUpperCase()}</div>
        <div className="result-download">
          <button className="blink" onClick={props.onResultsDownload}>Download</button>
        </div>
      </div>
    </div>
  )
};

export default GameResults;