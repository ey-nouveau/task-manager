import { useBoardStore } from "@/entities/task/model/store";
import { BoardColumn } from "@/widgets/board-column/ui/BoardColumn/BoardColumn";
import { TaskDetailsSidebar } from "@/widgets/task-sidebar/ui/TaskDetailsSidebar/TaskDetailsSidebar";
import { Spin } from "@/shared/ui/spin";
import styles from "./styles.module.css";
import { AddTask } from "@/features/task-management/ui/add-task";
import { Col } from "@/shared/ui/col";
import { Row } from "@/shared/ui/row";
import { Input } from "@/shared/ui/input";

export const BoardPage = () => {
  const columns = useBoardStore((state) => state.columns);
  const activeTaskId = useBoardStore((state) => state.activeTaskId);
  const setActiveTask = useBoardStore((state) => state.setActiveTask);
  const addTask = useBoardStore((state) => state.addTask);
  const tasks = useBoardStore((state) => state.tasks);
  const isLoading = useBoardStore((state) => state.isLoading);

  const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

  if (isLoading && tasks.length === 0) {
    return (
      <div className={styles.loader}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Col gap={16} align="stretch" justify="start">
        <div style={{ padding: "32px 48px 0 48px" }}>
          <Row justify="between" align="center">
            <AddTask onSubmit={(title) => addTask("todo", title)} />
              
            <div style={{ width: "250px" }}>
              <Input.Search placeholder="Search tasks..." />
            </div>
          </Row>
        </div>

        <div className={styles.columnsArea}>
          {columns.map((col, index) => (
            <BoardColumn key={col.id} column={col} index={index} />
          ))}
        </div>
      </Col>

      <TaskDetailsSidebar
        task={activeTask}
        isOpen={!!activeTaskId}
        onClose={() => setActiveTask(null)}
      />
    </div>
  );
};
