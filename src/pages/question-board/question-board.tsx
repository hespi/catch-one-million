import React, { useState, useEffect, createRef, useRef } from 'react';
import Player from '../../classes/player';
import Question from '../../classes/question';
import AnswerOption from '../../components/answer-option/answer-option';
import Timer, {TimerHandle} from '../../components/timer/timer';
import useSound from 'use-sound';
import badOptionSound from '../../assets/audio/loose.mp3';
import goodOptionSound from '../../assets/audio/win.mp3';
import clockTickSound from '../../assets/audio/clock-tick.mp3';
import './question-board.css';

type QuestionBoardProps = {
    initialScore: number;
    questionTimeInSeconds: number;
    players: Player[];
    questions: Question[];
    onAllQuestionsAnswered(score:number, lastQuestionIx:number):void;
    onQuestionAnswered(index: number, question:Question):void;

}

const QuestionBoard = (props: QuestionBoardProps) => {
  const [score, setScore] = useState(props.initialScore);
  const [pendingAmount, setPendingAmount] = useState(props.initialScore);
  const [rightAnswerAmount, setRightAnswerAmount] = useState(0);
  const [currentQuestionIx, setCurrentQuestionIx] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [optionsDiscovered, setOptionsDiscovered] = useState("");
  const [isQuestionSolved, setIsQuestionSolved] = useState(false);
  const [playFailedOption] = useSound(badOptionSound);
  const [playSolutionOption] = useSound(goodOptionSound);
  const timerRef = useRef<TimerHandle>(null);
  var componentRef = createRef<HTMLDivElement>();
  var currentQuestion:Question = props.questions[currentQuestionIx - 1];
  
  useEffect(() =>{
    currentQuestion = props.questions[currentQuestionIx - 1];
  }, [currentQuestionIx]);

  const solveQuestion = () => {
    setOptionsDiscovered("," + currentQuestion.options.map((opt:string, ix:number) => ix).join(','));
    setIsQuestionSolved(true);
    setScore(rightAnswerAmount);
    setIsPaused(true);
    props.onQuestionAnswered(currentQuestionIx, currentQuestion);
    if (rightAnswerAmount > 0) {
      playSolutionOption();
    } else {
      playFailedOption();
    }
  }

  const moveToNextQuestion = () => {
    if (currentQuestionIx < props.questions.length && score > 0) {
      setIsQuestionSolved(false);
      setIsPaused(false);
      setOptionsDiscovered("");
      setPendingAmount(score);
      setCurrentQuestionIx(currentQuestionIx + 1);
      timerRef.current?.reset();
      setRightAnswerAmount(0);
    } else {
      props.onAllQuestionsAnswered(score, currentQuestionIx);
    }
  }; 

  const discoverRandomNonAnswerOption = ():number => {
    let undiscoveredNonAnswerOptions = getUndiscoveredNonAnswerOptions();
    if(undiscoveredNonAnswerOptions.length > 1) {
      var optionToDiscover = getRandomInt(0, undiscoveredNonAnswerOptions.length - 1);
      setOptionsDiscovered(optionsDiscovered + ',' + undiscoveredNonAnswerOptions[optionToDiscover]);
      playFailedOption();
      return undiscoveredNonAnswerOptions.length - 1;
    } else {
      solveQuestion();
      return 0;
    }
  };

  const getUndiscoveredNonAnswerOptions = ():number[] => {
    let options:number[] = [];
    for (var ix = 0; ix < currentQuestion.options.length; ix++) {
      if (ix !== currentQuestion.answerIx - 1 && optionsDiscovered.indexOf(`,${ix}`) === -1) {
        options.push(ix);
      }
    }

    return options;
  }

  const getRandomInt = (min:number, max:number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getAnswerOptionLabel = (optionIx:number) => {
    const labels:string = "abcdefghijklmnopqrstuvwxyz";
    return labels.charAt(optionIx);
  }

  const onKey_Pressed = (key:string, altKeyPressed: boolean) => {
    if (isQuestionSolved) {
      moveToNextQuestion();
    } else if (key === 'p') {
      setIsPaused(!isPaused);
    } else if (key === 'd') {
      discoverRandomNonAnswerOption();
    } else if (key === 's') {
      solveQuestion();
    }
  };

  const onTimer_Finished = () => {
    solveQuestion();
  };

  const onAnswerAmount_Changed = (previousAmount:number, newAmount:number, isRightAnswer:boolean) => {
    setPendingAmount(pendingAmount + previousAmount - newAmount);
    if (isRightAnswer) {
      setRightAnswerAmount(newAmount);
    }
  };

  return (
    <div ref={componentRef} className="question-board" data-testid="question-board" tabIndex={0} onKeyPress={(e) => onKey_Pressed(e.key, e.altKey)}>
      <div className="game-indicators">
        <div className="players">
          <label>#Players</label>
          <span>{props.players.length}</span>
        </div>
        <div className="score">
          <label>Score</label>
          <span>&nbsp;x {score}</span>
        </div>
        <div className="pending">
          <label>Pending</label>
          <span>&nbsp;x {pendingAmount}</span>
        </div>
        <div className="progress">
          <label>Question</label>
          <span>{currentQuestionIx} - {props.questions.length}</span>
        </div>
        <div className="timer">
          <label>TIME</label>
          <Timer 
            ref={timerRef}
            onFinished={onTimer_Finished}
            seconds={props.questionTimeInSeconds}
            isPaused={isPaused}
            tickSound={clockTickSound}
          />
        </div>
      </div>
      <div className="game-container">
        <div className="game-screen">
          <div className={"question-title presenter-" + currentQuestion.presenter}>
            {currentQuestion.question}
          </div>
          <div className="answer-options">
            {
            currentQuestion.options.map((sentence:string, ix: number) => 
              <AnswerOption 
                key={currentQuestion.id + '_' + ix} 
                label={getAnswerOptionLabel(ix)}
                text={sentence}
                amountStep={10000}
                isRightAnswer={(ix + 1) === currentQuestion.answerIx}
                isRevealed={optionsDiscovered.indexOf(',' + ix) !== -1}
                maxAmount={pendingAmount}
                onAmountChanged={onAnswerAmount_Changed}
              />)
            }
          </div>
        </div>
        {isQuestionSolved && <div className="next-question-msg blink">
          Press any key for next question
        </div>}
      </div>
      
    </div>
  )
};

export default QuestionBoard;