'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ListView } from './list-view/ListView';
import { KanbanView } from './kanban-view/KanbanView';
import Loader from '@/components/ui/Loader';
import { SwitcherView } from './SwitcherView';

export type TypeView = 'list' | 'kanban';

export function TasksView() {
  const [type, setType, isLoading] = useLocalStorage<TypeView>('view-type', 'list');

  if (isLoading) return <Loader />

  return (
    <div>
      <SwitcherView
        type={type}
        setType={setType}
      />
      {type === 'list' ? <ListView /> : <KanbanView />}
    </div>
  );
}
