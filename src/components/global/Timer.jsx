import React, { useState, useRef, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const Timer = () => {
  const { palette, setIsTimerOn, isTimerOn, resetTimer } =
    useContext(GlobalContext);
  const [timeRemaining, setTimeRemaining] = useState(
    localStorage.getItem("timerTimeRemaining") || 60
  ); // 180 seconds = 3 minutes

  useEffect(() => {
    let timer;
    if (isTimerOn && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("timerTimeRemaining", newTime);
          localStorage.setItem("isTimerOn", isTimerOn);
          return newTime;
        });
      }, 1000);
    } else {
      resetTimer();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isTimerOn, timeRemaining]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return <h2>{formatTime(timeRemaining)}</h2>;
};

export default Timer;
