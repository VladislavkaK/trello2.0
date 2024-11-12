import { ITaskResponse, TypeTaskFormState } from "@/types/task.types";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import cn from "clsx";
import { useTaskDebounce } from "../hooks/useTaskDebounce";
import styles from "./ListView.module.scss";
import { GripVertical, Loader, Trash } from "lucide-react";
import Checkbox from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/task-edit/date-picker/DatePicker";
import { SingleSelect } from "@/components/ui/task-edit/SingleSelect";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { TransparentField } from "@/components/ui/fields/TransparentField";

interface IListRow {
  item: ITaskResponse;
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListRow({ item, setItems }: IListRow) {
  const { register, control, watch } = useForm<TypeTaskFormState>({
    defaultValues: {
      name: item.name,
      isCompleted: item.isCompleted,
      createdAt: item.createdAt,
      priority: item.priority,
    }
  });

  useTaskDebounce({ watch, itemId: item.id });

  const { deleteTask, isDeletePending } = useDeleteTask();
  
  return (
    <div
      className={cn(
        styles.row,
        watch('isCompleted') ? styles.completed : '',
        'animation-opacity'
      )}
    >
      <div>
        <span className="inline-flex items-center gap-2.5 w-full">
          <button aria-describedby="todo-item">
            <GripVertical className={styles.grip} />
          </button>

          <Controller
            control={control}
            name="isCompleted"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                onChange={onChange}
              />
            )}
          />

          <TransparentField {...register('name')} />
        </span>
      </div>
      <div>
        <Controller
          control={control}
          name="createdAt"
          render={({ field: { value, onChange } }) => (
            <DatePicker
              value={value || ''}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="capitalize">
        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange } }) => (
            <SingleSelect
              data={['high', 'medium', 'low'].map(item => ({ value: item, label: item }))}
              value={value || ''}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div>
        <button
          className="opacity-50 transition-opacity hover:opacity-100"
          onClick={() => item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}
        >
          {isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
        </button>
      </div>
    </div>
  );
}
