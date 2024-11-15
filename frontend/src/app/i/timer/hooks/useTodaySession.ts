import { pomodoroService } from "@/services/timer.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ITimerState } from "../timer.types";
import { useLoadSettings } from "./useLoadSettings";

export function useTodaySession({ setActiveRound, setSecondsLeft }: ITimerState) {
  const { workInterval } = useLoadSettings();

  const {
    data: sessionResponse,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['get today session'],
    queryFn: () => pomodoroService.getTodaySesstion(),
  });

  const rounds = sessionResponse?.data.rounds;

  useEffect(() => {
    if (isSuccess && rounds) {
      const activeRound = rounds.find(round => !round.isCompleted);
      setActiveRound(activeRound);

      if (activeRound && activeRound?.totalSeconds !== 0) {
        setSecondsLeft(activeRound.totalSeconds);
      }
    }
  }, [isSuccess, rounds]);

  return { sessionResponse, isLoading, workInterval };
}
