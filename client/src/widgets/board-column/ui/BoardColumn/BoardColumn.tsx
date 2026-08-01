import { useBoardStore } from "@/entities/task/model/store";
import type { Column } from "@/entities/task/model/store";
import { TaskCard } from "@/entities/task/ui/task-card";
import { Plus, MoreHorizontal } from "lucide-react";
import { Col } from "@/shared/ui/col";
import { Row } from "@/shared/ui/row";
import styles from "./BoardColumn.module.css";

interface Props {
  column: Column;
  index: number;
}

const COLUMN_COLORS: Record<string, string> = {
  todo: "var(--color-sky)",
  "in-progress": "var(--color-yellow)",
  done: "var(--color-purple)",
};

export const BoardColumn = ({ column, index }: Props) => {
  const allTasks = useBoardStore((state) => state.tasks);

  const tasks = allTasks.filter(
    (t) => t.status === column.id || (!t.status && column.id === "todo"),
  );

  const addTask = useBoardStore((state) => state.addTask);
  const accentColor = COLUMN_COLORS[column.id] || "var(--color-purple)";

  return (
    <Col className={styles.column}>
      <Row align="center" gap={12} className={styles.header}>
        <div className={styles.indicator} style={{ background: accentColor }} />
        <div className={styles.title}>{column.title}</div>
        <div className={styles.count}>{tasks.length}</div>

        <Row align="center" gap={12} className={styles.actions}>
          <Plus
            size={16}
            className={styles.actionIcon}
            onClick={() => addTask(column.id, "New Task")}
          />
          <MoreHorizontal size={16} className={styles.actionIcon} />
        </Row>
      </Row>

      <Col gap={12} className={styles.tasksArea}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnIndex={index} />
        ))}
      </Col>
    </Col>
  );
};
