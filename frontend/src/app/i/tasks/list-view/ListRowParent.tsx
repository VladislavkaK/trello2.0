import { ITaskResponse } from "@/types/task.types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Dispatch, SetStateAction } from "react";

import styles from "./ListView.module.scss";
import { ListRow } from "./ListRow";
import { FILTERS } from "../colums.data";
import { ListAddRowInput } from "./ListAddRowInput";
import { filterTasks } from "../filter-task";

interface IListRowParent {
  value: string;
  label: string;
  items: ITaskResponse[] | undefined;
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListRowParent({
  value,
  label,
  items,
  setItems,
}: IListRowParent) {
  return (
    <Droppable droppableId={value}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={styles.colHeading}>
            <div className="w-full">{label}</div>
          </div>

          {filterTasks(items, value)?.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}
            >
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                >
                  <ListRow
                    key={item.id}
                    item={item}
                    setItems={setItems}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}

          {value !== 'complted' && !items?.some(item => !item.id) && (
            <ListAddRowInput
              filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
              setItems={setItems}
            />
          )}
        </div>
      )}
    </Droppable>
  );
}
