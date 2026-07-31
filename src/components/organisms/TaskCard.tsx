import { Card } from 'antd';
import { useBoardStore } from '../../store/useBoardStore';
import type { Task } from '../../store/useBoardStore';
import { TaskActions } from '../molecules/TaskActions';

interface Props {
  task: Task;
  columnIndex: number;
}

export const TaskCard = ({ task, columnIndex }: Props) => {
  const columns = useBoardStore((state) => state.columns);
  const moveTask = useBoardStore((state) => state.moveTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const setActiveTask = useBoardStore((state) => state.setActiveTask);

  const canMoveLeft = columnIndex > 0;
  const canMoveRight = columnIndex < columns.length - 1;

  const handleMoveLeft = () => moveTask(task.id, columns[columnIndex - 1].id);
  const handleMoveRight = () => moveTask(task.id, columns[columnIndex + 1].id);
  const handleDelete = () => deleteTask(task.id);

  return (
    <Card
      size="small"
      hoverable
      onClick={() => setActiveTask(task.id)}
      style={{ marginBottom: '8px', cursor: 'pointer', border: '1px solid #000', borderRadius: 0 }}
      title={task.title}
      extra={
        <TaskActions
          onMoveLeft={canMoveLeft ? handleMoveLeft : undefined}
          onMoveRight={canMoveRight ? handleMoveRight : undefined}
          onDelete={handleDelete}
        />
      }
    >
      {task.description && (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {task.description}
        </div>
      )}
    </Card>
  );
};