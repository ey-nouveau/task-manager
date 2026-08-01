import { useBoardStore } from '../../store/useBoardStore';
import type { Task } from '../../store/useBoardStore';
import { TaskActions } from '../molecules/TaskActions';
import { useState } from 'react';
import { 
  ClockCircleOutlined, 
  MessageFilled, 
  FolderFilled, 
  CheckSquareFilled 
} from '@ant-design/icons';
import { Avatar } from 'antd';

interface Props {
  task: Task;
  columnIndex: number;
  accentColor?: string;
}

// Fallback tags array if DB doesn't have them, mapped to pastel colors
const MOCK_TAGS = [
  { name: 'Web', color: 'var(--color-blue)' },
  { name: 'SaaS', color: 'var(--color-purple)' },
  { name: 'App', color: 'var(--color-orange)' },
  { name: 'Research', color: 'var(--color-mint)' },
  { name: 'Copywrite', color: 'var(--color-sage)' },
  { name: 'Redesign', color: 'var(--color-yellow)' }
];

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

  // Mock data mapping if empty
  const dueDate = task.dueDate || '24 Sep - 5 Oct';
  const comments = task.commentsCount || Math.floor(Math.random() * 5);
  const attachments = task.attachmentsCount || Math.floor(Math.random() * 8);
  const checklist = task.checklist || `${Math.floor(Math.random() * 3)}/5`;
  
  const displayTags = task.tags 
    ? task.tags.map(t => ({ name: t, color: 'var(--color-sky)' }))
    : [MOCK_TAGS[Math.floor(Math.random() * MOCK_TAGS.length)], MOCK_TAGS[Math.floor(Math.random() * MOCK_TAGS.length)]];
  // ensure unique displayTags
  const uniqueTags = displayTags.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);

  return (
    <div
      onClick={() => setActiveTask(task.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#1c1a1f', // Slightly lighter than the dark bg
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'border-color 0.2s ease',
        position: 'relative'
      }}
    >
      {/* Top Row: Date */}
      <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ClockCircleOutlined />
        <span>{dueDate}</span>
      </div>

      {/* Title */}
      <div style={{ color: 'var(--color-text-light)', fontWeight: 500, fontSize: '15px', lineHeight: 1.4 }}>
        {task.title}
      </div>
      
      {/* Description */}
      {task.description && (
        <div style={{ color: 'var(--color-text-muted)', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {task.description}
        </div>
      )}

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
        {uniqueTags.map(tag => (
          <div key={tag.name} style={{
            background: `color-mix(in srgb, ${tag.color} 15%, transparent)`,
            color: tag.color,
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 500
          }}>
            {tag.name}
          </div>
        ))}
      </div>

      {/* Footer: Meta & Avatars */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MessageFilled style={{ opacity: 0.6 }} /> {comments}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <FolderFilled style={{ opacity: 0.6 }} /> {attachments}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckSquareFilled style={{ opacity: 0.6 }} /> {checklist}
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <Avatar.Group size="small" maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            <Avatar src="https://i.pravatar.cc/150?img=32" />
            <Avatar src="https://i.pravatar.cc/150?img=12" />
            <Avatar src="https://i.pravatar.cc/150?img=5" />
          </Avatar.Group>
        </div>
      </div>

      {/* Absolute Actions Overlay on Hover */}
      {isHovered && (
        <div style={{ 
          position: 'absolute', 
          top: '12px', 
          right: '12px', 
          background: 'var(--color-dark)', 
          padding: '4px', 
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          display: 'flex',
          zIndex: 10
        }}>
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