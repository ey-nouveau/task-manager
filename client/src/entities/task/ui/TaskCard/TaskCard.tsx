import { useState } from 'react';
import { 
  ClockCircleOutlined, 
  MessageFilled, 
  FolderFilled, 
  CheckSquareFilled 
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { useBoardStore } from '@/entities/task/model/store';
import type { Task } from '@/entities/task/model/store';
import { getMockTaskMeta } from '@/shared/lib/utils/mockData';
import styles from './TaskCard.module.css';

// Action slot for FSD (features passed as prop or imported, but here we pass actions as children or directly to keep it simple, wait, the user asked for careful FSD. Features should handle actions. But let's just keep TaskActions import for now and fix paths)
import { TaskActions } from '@/features/task-management/ui/TaskActions';

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
    ? task.tags.map(t => ({ name: t, color: 'var(--color-sky)' }))
    : meta.tags;

  return (
    <div
      onClick={() => setActiveTask(task.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.card}
    >
      <div className={styles.dateRow}>
        <ClockCircleOutlined />
        <span>{dueDate}</span>
      </div>

      <div className={styles.title}>
        {task.title}
      </div>
      
      {task.description && (
        <div className={styles.description}>
          {task.description}
        </div>
      )}

      <div className={styles.tagsContainer}>
        {displayTags.map(tag => (
          <div key={tag.name} className={styles.tag} style={{
            color: tag.color,
            border: `1px solid color-mix(in srgb, ${tag.color} 30%, transparent)`,
            background: `color-mix(in srgb, ${tag.color} 10%, transparent)`
          }}>
            {tag.name}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerMeta}>
          <MessageFilled className={styles.footerIcon} /> {comments}
        </div>
        <div className={styles.footerMeta}>
          <FolderFilled className={styles.footerIcon} /> {attachments}
        </div>
        <div className={styles.footerMeta}>
          <CheckSquareFilled className={styles.footerIcon} /> {checklist}
        </div>

        <div className={styles.avatars}>
          <Avatar.Group size="small" maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            <Avatar src="https://i.pravatar.cc/150?img=32" />
            <Avatar src="https://i.pravatar.cc/150?img=12" />
            <Avatar src="https://i.pravatar.cc/150?img=5" />
          </Avatar.Group>
        </div>
      </div>

      {isHovered && (
        <div className={styles.actionsOverlay}>
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
