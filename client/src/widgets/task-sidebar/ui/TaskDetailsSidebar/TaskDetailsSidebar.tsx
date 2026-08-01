import { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined, PlaySquareOutlined, UserOutlined, CalendarOutlined, TagsOutlined } from '@ant-design/icons';
import { useBoardStore } from '@/entities/task/model/store';
import type { Task } from '@/entities/task/model/store';
import { getMockTaskMeta } from '@/shared/lib/utils/mockData';
import styles from './TaskDetailsSidebar.module.css';

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyRow = ({ icon, label, value, valueColor }: { icon: React.ReactNode, label: string, value: React.ReactNode, valueColor?: string }) => (
  <div className={styles.propertyRow}>
    <div className={styles.propertyLabel}>
      {icon} <span>{label}</span>
    </div>
    <div className={styles.propertyValue} style={{ color: valueColor || 'var(--color-text-light)' }}>
      {value}
    </div>
  </div>
);

export const TaskDetailsSidebar = ({ task, isOpen, onClose }: Props) => {
  const updateTask = useBoardStore((state) => state.updateTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title || '');
      setDescription(task.description || '');
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
    ? task.tags.map(t => ({ name: t, color: 'var(--color-sky)' }))
    : meta.tags;

  return (
    <div className={styles.sidebar}>
      <div className={styles.inner}>
        
        <div className={styles.headerControls}>
          <div className={styles.headerTitle}>Task Details</div>
          <Button 
            type="text" 
            size="small"
            icon={<CloseOutlined style={{ color: 'var(--color-text-muted)' }} />} 
            onClick={onClose} 
          />
        </div>

        <Input.TextArea
          autoSize
          variant="borderless"
          className={styles.titleInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
        />

        <div className={styles.properties}>
          <PropertyRow 
            icon={<PlaySquareOutlined />} 
            label="Status" 
            value={
              <div className={styles.statusPill}>
                {task.status.replace('-', ' ')}
              </div>
            } 
          />
          <PropertyRow 
            icon={<UserOutlined />} 
            label="Assignee" 
            value={
              <>
                <img src="https://i.pravatar.cc/150?img=32" alt="assignee" className={styles.avatar} />
                {task.assigned_to || 'Shawn Soares'}
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
              <div className={styles.tagsContainer}>
                {displayTags.map(t => (
                  <span key={t.name} style={{ color: t.color }}>{t.name}</span>
                ))}
              </div>
            } 
          />
        </div>

        <div className={styles.bodyContainer}>
          <Input.TextArea
            variant="borderless"
            autoSize={{ minRows: 10 }}
            className={styles.descriptionInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details, acceptance criteria, or notes..."
          />
        </div>

        <div className={styles.footer}>
          <Button 
            type="default" 
            onClick={handleSave} 
            className={styles.saveButton}
          >
            Save Changes
          </Button>
          <Button 
            danger 
            type="default"
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
