import { IPomodoroRoundResponse } from "@/types/pomodoro.types";
import { ITimerState } from "../timer.types";
import { useLoadSettings } from "./useLoadSettings";
import { useUpdateRound } from "./useUpdateRound";

type TypeUseTimerActions = ITimerState & {
  rounds: IPomodoroRoundResponse[] | undefined,
};

export function useTimerActions(props: TypeUseTimerActions) {
  const { updateRound, isUpdateRoundPending } = useUpdateRound();
  const { workInterval } = useLoadSettings();
  const { activeRound, secondsLeft, rounds, setIsRunning, setActiveRound } = props;
  
  const pauseHandler = () => {
    // const totalSeconds = (workInterval * 60) - secondsLeft;

    setIsRunning(false);

    if (activeRound?.id) {
      updateRound({
        id: activeRound?.id,
        data: {
          totalSeconds: secondsLeft,
          isCompleted: Math.floor(secondsLeft / 60) >= workInterval,
        }
      });
    }
  };

  const playHandler = () => {
    setIsRunning(true);
  };

  const nextRoundHandler = () => {
    if (!activeRound?.id) return;

    updateRound({
      id: activeRound.id,
      data: {
        isCompleted: true,
        totalSeconds: workInterval * 60
      }
    });
  };

  const prevRoundHandler = () => {
    const lastComletedRound = rounds?.findLast(round => round.isCompleted);

    if (!lastComletedRound) return;

    updateRound({
      id: lastComletedRound?.id,
      data: {
        isCompleted: false,
        totalSeconds: 0
      }
    });
  };

  return {
    isUpdateRoundPending,
    pauseHandler,
    playHandler,
    nextRoundHandler,
    prevRoundHandler,
  };
}
