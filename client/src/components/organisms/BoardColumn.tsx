import { useBoardStore } from '../../store/useBoardStore';
import type { Column } from '../../store/useBoardStore';
import { TaskInput } from '../molecules/TaskInput';
import { TaskCard } from './TaskCard';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';

interface Props {
  column: Column;
  index: number;
}

const COLUMN_COLORS: Record<string, string> = {
  'todo': 'var(--color-sky)',
  'in-progress': 'var(--color-yellow)',
  'done': 'var(--color-purple)'
};

export const BoardColumn = ({ column, index }: Props) => {
  const allTasks = useBoardStore((state) => state.tasks);
  
  const tasks = allTasks.filter((t) => 
    t.status === column.id || (!t.status && column.id === 'todo')
  );
  
  const addTask = useBoardStore((state) => state.addTask);
  const accentColor = COLUMN_COLORS[column.id] || 'var(--color-purple)';

  return (
    <div style={{ 
      minWidth: '320px', 
      maxWidth: '320px', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%'
    }}>
      {/* Header - No background, minimal padding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '0 4px' }}>
        <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: accentColor }} />
        <div style={{ fontWeight: 500, fontSize: '16px', color: 'var(--color-text-light)' }}>
          {column.title}
        </div>
        <div style={{ 
          background: 'var(--color-dark-grey)', 
          padding: '2px 8px', 
          borderRadius: '6px', 
          fontSize: '12px', 
          fontWeight: 600,
          color: 'var(--color-text-muted)' 
        }}>
          {tasks.length}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', color: 'var(--color-text-muted)' }}>
          <PlusOutlined style={{ cursor: 'pointer' }} onClick={() => addTask(column.id, 'New Task')} />
          <EllipsisOutlined style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Tasks Area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px', paddingBottom: '12px' }}>
        <TaskInput onSubmit={(title) => addTask(column.id, title)} placeholder="Add new task..." />
        
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnIndex={index} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
};