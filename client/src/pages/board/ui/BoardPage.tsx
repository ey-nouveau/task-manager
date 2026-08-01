import { useBoardStore } from '@/entities/task/model/store';
import { BoardColumn } from '@/widgets/board-column/ui/BoardColumn/BoardColumn';
import { TaskDetailsSidebar } from '@/widgets/task-sidebar/ui/TaskDetailsSidebar/TaskDetailsSidebar';
import { Spin } from 'antd';
import styles from './BoardPage.module.css';

export const BoardPage = () => {
  const columns = useBoardStore((state) => state.columns);
  const activeTaskId = useBoardStore((state) => state.activeTaskId);
  const setActiveTask = useBoardStore((state) => state.setActiveTask);
  const tasks = useBoardStore((state) => state.tasks);
  const isLoading = useBoardStore((state) => state.isLoading);

  const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

  if (isLoading && tasks.length === 0) {
    return (
      <div className={styles.loader}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.columnsArea}>
        {columns.map((col, index) => (
          <BoardColumn key={col.id} column={col} index={index} />
        ))}
      </div>

      <TaskDetailsSidebar
        task={activeTask}
        isOpen={!!activeTaskId}
        onClose={() => setActiveTask(null)}
      />
    </div>
  );
};
