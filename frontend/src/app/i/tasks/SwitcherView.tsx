import cn from 'clsx';

import type { TypeView } from './TasksView';
import { Kanban, ListTodo } from 'lucide-react';

interface ISwitcherView {
  type: TypeView;
  setType: (value: TypeView) => void;
}

export function SwitcherView({ type, setType }: ISwitcherView) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <button
        className={cn('flex items-center gap-1', {
          'opacity-40': type === 'kanban',
        })}
        onClick={() => setType('list')}
      >
        <ListTodo />
        List
      </button>
      <button
        className={cn('flex items-center gap-1', {
          'opacity-40': type === 'list',
        })}
        onClick={() => setType('kanban')}
      >
        <Kanban />
        Board
      </button>
    </div>
  );
}
