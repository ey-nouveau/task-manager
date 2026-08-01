import { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined, PlaySquareOutlined, UserOutlined, CalendarOutlined, TagsOutlined } from '@ant-design/icons';
import { useBoardStore } from '../../store/useBoardStore';
import type { Task } from '../../store/useBoardStore';
import { getMockTaskMeta } from '../../utils/mockData';

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyRow = ({ icon, label, value, valueColor }: { icon: React.ReactNode, label: string, value: React.ReactNode, valueColor?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', minHeight: '36px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
    <div style={{ width: '130px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
      {icon} <span>{label}</span>
    </div>
    <div style={{ flex: 1, color: valueColor || 'var(--color-text-light)', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
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
    <div style={{
      width: '450px',
      height: '100%',
      flexShrink: 0,
      borderLeft: '1px solid rgba(255,255,255,0.06)',
      background: 'var(--color-dark)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Task Details
          </div>
          <Button 
            type="text" 
            size="small"
            icon={<CloseOutlined style={{ color: 'var(--color-text-muted)' }} />} 
            onClick={onClose} 
          />
        </div>

        {/* Title */}
        <Input.TextArea
          autoSize
          variant="borderless"
          style={{ 
            fontSize: '28px', 
            fontWeight: 600, 
            padding: 0, 
            color: 'var(--color-text-light)',
            resize: 'none',
            lineHeight: 1.2,
            marginBottom: '32px'
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
        />

        {/* Properties (Notion/Linear Style) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
          <PropertyRow 
            icon={<PlaySquareOutlined />} 
            label="Status" 
            value={
              <div style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '2px 8px', 
                borderRadius: '6px', 
                color: 'var(--color-text-light)' 
              }}>
                {task.status.replace('-', ' ')}
              </div>
            } 
          />
          <PropertyRow 
            icon={<UserOutlined />} 
            label="Assignee" 
            value={
              <>
                <img src="https://i.pravatar.cc/150?img=32" alt="assignee" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
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
              <div style={{ display: 'flex', gap: '6px' }}>
                {displayTags.map(t => (
                  <span key={t.name} style={{ color: t.color }}>{t.name}</span>
                ))}
              </div>
            } 
          />
        </div>

        {/* Description Body */}
        <div style={{ flex: 1 }}>
          <Input.TextArea
            variant="borderless"
            autoSize={{ minRows: 10 }}
            style={{ 
              padding: 0, 
              color: 'var(--color-text-light)', 
              resize: 'none',
              fontSize: '15px',
              lineHeight: 1.6
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details, acceptance criteria, or notes..."
          />
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Button 
            type="default" 
            onClick={handleSave} 
            style={{ flex: 1, background: 'transparent', border: '1px solid var(--color-purple)', color: 'var(--color-purple)', fontWeight: 500, height: '36px' }}
          >
            Save Changes
          </Button>
          <Button 
            danger 
            type="default"
            onClick={handleDelete}
            style={{ fontWeight: 500, color: 'var(--color-salmon)', border: '1px solid var(--color-salmon)', height: '36px', background: 'transparent' }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};