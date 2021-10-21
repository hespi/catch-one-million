import React, { useEffect, useImperativeHandle, useState } from 'react';
import useSound from '../../../node_modules/use-sound/dist';
import './timer.css';

type TimerProps = {
    className?: string;
    onFinished(): void;
    seconds: number;
    tickSound: string;
    isPaused: boolean;
}

export type TimerHandle = {
  reset(): void;
}

const Timer = React.forwardRef<TimerHandle, TimerProps>((props, ref) => {
  const [pendingTimeInSeconds, setPendingTimeInSeconds] = useState(props.seconds);
  const [playTimerTick, {stop}] = useSound(props.tickSound);
  const stopTimerTick = stop;

  useImperativeHandle(ref, () => ({
    reset: () => {
      setPendingTimeInSeconds(props.seconds);
    }
  }));

  useEffect(() =>{
    if (pendingTimeInSeconds === 0) {
      props.onFinished();
    } else if (!props.isPaused) {
      const timer = tickTimer();
      return () => clearTimeout(timer);
    }
  });

  useEffect(() =>{
    if (props.isPaused) {
      stopTimerTick();
    } else {
      playTimerTick();
    }
  }, [props.isPaused])

  const tickTimer = () => {
    return setTimeout(() => {
      setPendingTimeInSeconds(pendingTimeInSeconds - 1);
    }, 1000);
  }

  const formatSecondsToMinutesAndSeconds = (seconds: number) => {
    const twoDigitFormatOptions = {minimumIntegerDigits: 2, useGrouping:false};
    let minutes = Math.floor(seconds / 60);
    let leftSeconds = seconds % 60;
    return `${minutes.toLocaleString('en-US', twoDigitFormatOptions)}:${leftSeconds.toLocaleString('en-US', twoDigitFormatOptions)}`;
  };

  return (<span className={'timer ' + props.className}>
    { formatSecondsToMinutesAndSeconds(pendingTimeInSeconds) }
  </span>)
});

export default Timer;