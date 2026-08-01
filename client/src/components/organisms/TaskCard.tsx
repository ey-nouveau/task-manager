import { useBoardStore } from '../../store/useBoardStore';
import type { Task } from '../../store/useBoardStore';
import { TaskActions } from '../molecules/TaskActions';
import { useState } from 'react';

interface Props {
  task: Task;
  columnIndex: number;
  accentColor: string;
}

export const TaskCard = ({ task, columnIndex, accentColor }: Props) => {
  const columns = useBoardStore((state) => state.columns);
  const moveTask = useBoardStore((state) => state.moveTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const setActiveTask = useBoardStore((state) => state.setActiveTask);
  
  const [isHovered, setIsHovered] = useState(false);

  const canMoveLeft = columnIndex > 0;
  const canMoveRight = columnIndex < columns.length - 1;

  const handleMoveLeft = () => moveTask(task.id, columns[columnIndex - 1].id);
  const handleMoveRight = () => moveTask(task.id, columns[columnIndex + 1].id);
  const handleDelete = () => deleteTask(task.id);

  return (
    <div
      onClick={() => setActiveTask(task.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--color-dark-grey)',
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.05)',
        borderLeft: `4px solid ${accentColor}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'all 0.2s ease',
        boxShadow: isHovered ? `0 4px 16px rgba(0,0,0,0.4)` : 'none'
      }}
    >
      <div style={{ color: 'var(--color-text-light)', fontWeight: 500, fontSize: '15px', lineHeight: 1.4 }}>
        {task.title}
      </div>
      
      {task.description && (
        <div style={{ color: 'var(--color-text-muted)', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {task.description}
        </div>
      )}

      {isHovered && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
          <TaskActions
            onMoveLeft={canMoveLeft ? handleMoveLeft : undefined}
            onMoveRight={canMoveRight ? handleMoveRight : undefined}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};