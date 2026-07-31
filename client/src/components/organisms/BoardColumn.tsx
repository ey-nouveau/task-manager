import { useBoardStore } from '../../store/useBoardStore';
import type { Column } from '../../store/useBoardStore';
import { TaskInput } from '../molecules/TaskInput';
import { TaskCard } from './TaskCard';

interface Props {
  column: Column;
  index: number;
}

export const BoardColumn = ({ column, index }: Props) => {
  const allTasks = useBoardStore((state) => state.tasks);
  
  // Если у таски пустой статус из БД, закидываем ее в первую колонку ('todo')
  const tasks = allTasks.filter((t) => 
    t.status === column.id || (!t.status && column.id === 'todo')
  );
  const addTask = useBoardStore((state) => state.addTask);

  return (
    <div style={{ minWidth: '350px', maxWidth: '350px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px', fontWeight: 'bold', borderBottom: '2px solid #000', marginBottom: '8px', fontSize: '18px' }}>
        {column.title}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnIndex={index} />
        ))}
      </div>
      <TaskInput onSubmit={(title) => addTask(column.id, title)} placeholder="New task..." />
    </div>
  );
};