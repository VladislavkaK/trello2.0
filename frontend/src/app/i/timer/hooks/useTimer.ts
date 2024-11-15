import { useEffect, useState } from "react";
import { useLoadSettings } from "./useLoadSettings";
import { IPomodoroRoundResponse } from "@/types/pomodoro.types";
import { ITimerState } from "../timer.types";

export function useTimer(): ITimerState {
  const { workInterval, breakInterval } = useLoadSettings();
  const [isRunning, setIsRunning] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(workInterval * 60);
  const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1);
      }, 1000);
    } else if (!isRunning && secondsLeft !== 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft, workInterval, activeRound]);

  // switch режим отдаха или режим работы
  useEffect(() => {
    // Ранний выход, если время не истекло
    if (secondsLeft > 0) return;

    // Переключение режима и установка нового времени одной операцией
    setIsBreakTime(!isBreakTime);
    setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60);
  }, [secondsLeft, isBreakTime, workInterval, breakInterval]);

  return {
    isRunning,
    activeRound,
    secondsLeft,
    setActiveRound,
    setIsRunning,
    setSecondsLeft,
  };
}
