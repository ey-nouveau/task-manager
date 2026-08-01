import { useState } from "react";
import { Clock, MessageSquare, Folder, CheckSquare } from "lucide-react";
import { Avatar } from "@/shared/ui/avatar";
import { useBoardStore } from "@/entities/task/model/store";
import type { Task } from "@/entities/task/model/store";
import { getMockTaskMeta } from "@/shared/lib/utils/mockData";
import styles from "./styles.module.css";
import { TaskActions } from "@/features/task-management/ui/TaskActions";
import { Row } from "@/shared/ui/row";
import { Col } from "@/shared/ui/col";

interface Props {
  task: Task;
  columnIndex: number;
}

export const TaskCard = ({ task, columnIndex }: Props) => {
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

  const meta = getMockTaskMeta(task.id);
  const dueDate = task.dueDate || meta.dueDate;
  const comments = task.commentsCount || meta.comments;
  const attachments = task.attachmentsCount || meta.attachments;
  const checklist = task.checklist || meta.checklist;

  const displayTags = task.tags
    ? task.tags.map((t) => ({ name: t, color: "var(--color-sky)" }))
    : meta.tags;

  return (
    <Col
      gap={12}
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveTask(task.id)}
    >
      <Row align="center" gap={6} className={styles.dateRow}>
        <Clock size={12} />
        <span>{dueDate}</span>
      </Row>

      <div className={styles.title}>{task.title}</div>

      {task.description && (
        <div className={styles.description}>{task.description}</div>
      )}

      <Row gap={6} wrap className={styles.tagsContainer}>
        {displayTags.map((tag) => (
          <div
            key={tag.name}
            className={styles.tag}
            style={{
              color: tag.color,
              border: `1px solid color-mix(in srgb, ${tag.color} 30%, transparent)`,
              background: `color-mix(in srgb, ${tag.color} 10%, transparent)`,
            }}
          >
            {tag.name}
          </div>
        ))}
      </Row>

      <Row align="center" gap={12} className={styles.footer}>
        <Row align="center" gap={4} className={styles.footerMeta}>
          <MessageSquare size={13} className={styles.footerIcon} /> {comments}
        </Row>
        <Row align="center" gap={4} className={styles.footerMeta}>
          <Folder size={13} className={styles.footerIcon} /> {attachments}
        </Row>
        <Row align="center" gap={4} className={styles.footerMeta}>
          <CheckSquare size={13} className={styles.footerIcon} /> {checklist}
        </Row>

        <div className={styles.avatars}>
          <Avatar.Group size={24} maxCount={2}>
            <Avatar src="https://i.pravatar.cc/150?img=32" />
            <Avatar src="https://i.pravatar.cc/150?img=12" />
            <Avatar src="https://i.pravatar.cc/150?img=5" />
          </Avatar.Group>
        </div>
      </Row>

      {isHovered && (
        <div className={styles.actionsOverlay}>
          <TaskActions
            onMoveLeft={canMoveLeft ? handleMoveLeft : undefined}
            onMoveRight={canMoveRight ? handleMoveRight : undefined}
            onDelete={handleDelete}
          />
        </div>
      )}
    </Col>
  );
};
