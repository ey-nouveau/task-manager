import { useBoardStore } from "@/entities/task/model/store";
import { BoardColumn } from "@/widgets/board-column/ui/BoardColumn/BoardColumn";
import { TaskDetailsSidebar } from "@/widgets/task-sidebar/ui/TaskDetailsSidebar/TaskDetailsSidebar";
import { Input, Spin } from "antd";
import styles from "./BoardPage.module.css";
import { AddTask } from "@/features/task-management/ui/add-task";
import { Col } from "@/shared/ui/col";
import { Row } from "@/shared/ui/row";

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
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Col gap={10}>
        <Row>
          <AddTask onSubmit={(title) => addTask("", title)} />
          <Input.Search color="red" />
        </Row>

        {columns.length && (
          <Row gap={20}>
            {columns.map((col, index) => (
              <BoardColumn key={col.id} column={col} index={index} />
            ))}
          </Row>
        )}
      </Col>

      <TaskDetailsSidebar
        task={activeTask}
        isOpen={!!activeTaskId}
        onClose={() => setActiveTask(null)}
      />
    </div>
  );
};
