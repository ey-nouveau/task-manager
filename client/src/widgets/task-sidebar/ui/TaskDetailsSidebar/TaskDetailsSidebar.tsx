import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import {
  CloseOutlined,
  PlaySquareOutlined,
  UserOutlined,
  CalendarOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { useBoardStore } from "@/entities/task/model/store";
import type { Task } from "@/entities/task/model/store";
import { getMockTaskMeta } from "@/shared/lib/utils/mockData";
import { Input } from "@/shared/ui/input";
import { Row } from "@/shared/ui/row";
import { Col } from "@/shared/ui/col";
import styles from "./TaskDetailsSidebar.module.css";

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyRow = ({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueColor?: string;
}) => (
  <Row align="center" className={styles.propertyRow}>
    <Row align="center" gap={8} className={styles.propertyLabel}>
      {icon} <span>{label}</span>
    </Row>
    <Row
      align="center"
      gap={8}
      className={styles.propertyValue}
      style={{ color: valueColor || "var(--color-text-light)" }}
    >
      {value}
    </Row>
  </Row>
);

export const TaskDetailsSidebar = ({ task, isOpen, onClose }: Props) => {
  const updateTask = useBoardStore((state) => state.updateTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task, isOpen]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    updateTask(task.id, { title, description });
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  const meta = getMockTaskMeta(task.id);
  const displayTags = task.tags
    ? task.tags.map((t) => ({ name: t, color: "var(--color-sky)" }))
    : meta.tags;

  return (
    <Col className={styles.sidebar}>
      <Col className={styles.inner}>
        <Row justify="between" align="center" className={styles.headerControls}>
          <div className={styles.headerTitle}>Task Details</div>
          <Button
            variant="text"
            size="small"
            icon={
              <CloseOutlined style={{ color: "var(--color-text-muted)" }} />
            }
            onClick={onClose}
          />
        </Row>

        <Input.TextArea
          autoSize
          className={styles.titleInput}
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="Untitled"
        />

        <Col gap={8} className={styles.properties}>
          <PropertyRow
            icon={<PlaySquareOutlined />}
            label="Status"
            value={
              <div className={styles.statusPill}>
                {task.status.replace("-", " ")}
              </div>
            }
          />
          <PropertyRow
            icon={<UserOutlined />}
            label="Assignee"
            value={
              <>
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt="assignee"
                  className={styles.avatar}
                />
                {task.assigned_to || "Shawn Soares"}
              </>
            }
          />
          <PropertyRow
            icon={<CalendarOutlined />}
            label="Due date"
            value={task.dueDate || meta.dueDate}
            valueColor="var(--color-text-muted)"
          />
          <PropertyRow
            icon={<TagsOutlined />}
            label="Tags"
            value={
              <Row gap={6} className={styles.tagsContainer}>
                {displayTags.map((t) => (
                  <span key={t.name} style={{ color: t.color }}>
                    {t.name}
                  </span>
                ))}
              </Row>
            }
          />
        </Col>

        <div className={styles.bodyContainer}>
          <Input.TextArea
            autoSize={{ minRows: 10 }}
            className={styles.descriptionInput}
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            placeholder="Add details, acceptance criteria, or notes..."
          />
        </div>

        <Row gap={12} className={styles.footer}>
          <Button
            variant="default"
            onClick={handleSave}
            className={styles.saveButton}
          >
            Save Changes
          </Button>
          <Button
            danger
            variant="default"
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            Delete
          </Button>
        </Row>
      </Col>
    </Col>
  );
};
