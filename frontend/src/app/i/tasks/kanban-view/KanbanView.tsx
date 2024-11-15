'use client'

import { DragDropContext } from "@hello-pangea/dnd";
import { useTaskDnd } from "../hooks/useTaskDnd";
import { useTasks } from "../hooks/useTasks";

import styles from './KanbanView.module.scss';
import { COLUMNS } from "../colums.data";
import { KanbanColumn } from "./KanbanColumn";

export function KanbanView() {
  const { items, setItems } = useTasks();
  const { onDragEnd } = useTaskDnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {COLUMNS.map(column => (
          <KanbanColumn
            key={column.value}
            value={column.value}
            label={column.label}
            items={items}
            setItems={setItems}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
