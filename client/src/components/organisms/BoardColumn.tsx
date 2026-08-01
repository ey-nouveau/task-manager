import { useBoardStore } from '../../store/useBoardStore';
import type { Column } from '../../store/useBoardStore';
import { TaskInput } from '../molecules/TaskInput';
import { TaskCard } from './TaskCard';

interface Props {
  column: Column;
  index: number;
}

const COLUMN_COLORS: Record<string, string> = {
  'todo': 'var(--color-sky)',
  'in-progress': 'var(--color-peach)',
  'done': 'var(--color-mint)'
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
      background: 'rgba(255,255,255,0.02)', 
      borderRadius: '20px', 
      padding: '20px',
      height: '100%'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: accentColor }} />
        <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-light)' }}>
          {column.title}
        </div>
        <div style={{ 
          marginLeft: 'auto', 
          background: 'rgba(255,255,255,0.05)', 
          padding: '2px 10px', 
          borderRadius: '12px', 
          fontSize: '12px', 
          fontWeight: 600,
          color: 'var(--color-text-muted)' 
        }}>
          {tasks.length}
        </div>
      </div>

      {/* Tasks Area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px', paddingBottom: '12px' }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnIndex={index} accentColor={accentColor} />
        ))}
      </div>
      
      {/* Add Task Input */}
      <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <TaskInput onSubmit={(title) => addTask(column.id, title)} placeholder="Add new task..." />
      </div>
    </div>
  );
};