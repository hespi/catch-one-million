import React, { useEffect, useMemo, useState } from 'react';
import './answer-option.css';

type AnswerOptionProps = {
    text: string;
    isRightAnswer: boolean;
    isRevealed?: boolean;
    maxAmount: number;
    amountStep: number;
    onAmountChanged(prevAmount:number, newAmount:number, isRightAnswer: boolean): void;
}

const AnswerOption = (props: AnswerOptionProps) => {
  const [amount, setAmount] = useState(0);
  const answerRevealClass:string = useMemo(() => {
    if (props.isRevealed) {
      return props.isRightAnswer ? "correct" : "incorrect";
    }
    return "";
  }, [props.isRevealed, props.isRightAnswer]);

  const onAmountInput_Change = (value:string) => {
    let val = Math.min(parseInt(value), (props.maxAmount + amount));
    if (isNaN(val)) {
      val = 0;
    }
    props.onAmountChanged(amount, val, props.isRightAnswer);
    setAmount(val)
  }

  return (
    <div className={"answer-option " + answerRevealClass}>
      <label>{props.text}</label>
      <input 
        type="number"
        disabled={props.isRevealed} 
        max={props.maxAmount + amount} 
        min={0} 
        step={props.amountStep} 
        onChange={(e) => onAmountInput_Change(e.target.value)} 
        value={amount}
      />
    </div>
  )
};

export default AnswerOption;