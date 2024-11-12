import { TypeTaskFormState } from "@/types/task.types";
import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";
import { useUpdateTask } from "./useUpdateTask";
import { useCreateTask } from "./useCreateTask";
import { UseFormWatch } from "react-hook-form";

interface IUseTaskDebounce {
  itemId: string;
  watch: UseFormWatch<TypeTaskFormState>;
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
  const { createTask } = useCreateTask();
  const { updateTask } = useUpdateTask();

  const debouncedCreateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      createTask(formData);
    }, 444),
    []
  );

  const debouncedUpdateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      updateTask({ id: itemId, data: formData });
    }, 444),
    []
  );

  useEffect(() => {
    const { unsubscribe } = watch(formData => {
      if (itemId) {
        debouncedUpdateTask({
          ...formData,
          priority: formData.priority || undefined
        });
      } else {
        debouncedCreateTask(formData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [watch(), debouncedCreateTask, debouncedUpdateTask]);
}
