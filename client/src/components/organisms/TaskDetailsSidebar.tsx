import { useState, useEffect } from 'react';
import { Input, Button, Divider } from 'antd';
import { CloseOutlined, PlaySquareOutlined, UserOutlined, CalendarOutlined, TagsOutlined } from '@ant-design/icons';
import { useBoardStore } from '../../store/useBoardStore';
import type { Task } from '../../store/useBoardStore';

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', minHeight: '32px' }}>
    <div style={{ width: '120px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon} <span>{label}</span>
    </div>
    <div style={{ flex: 1, color: 'var(--color-text-light)', fontWeight: 500 }}>
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

  return (
    <div style={{
      width: '400px',
      height: '100%',
      flexShrink: 0,
      borderLeft: '1px solid rgba(255,255,255,0.05)',
      background: 'var(--color-bg-outer)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Button 
            type="text" 
            icon={<CloseOutlined style={{ color: 'var(--color-text-muted)' }} />} 
            onClick={onClose} 
          />
        </div>

        {/* Title */}
        <Input.TextArea
          autoSize
          variant="borderless"
          style={{ 
            fontSize: '32px', 
            fontWeight: 700, 
            padding: 0, 
            color: 'var(--color-text-light)',
            resize: 'none',
            lineHeight: 1.2
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
        />

        {/* Properties (Notion Style) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
          <PropertyRow icon={<PlaySquareOutlined />} label="Status" value={task.status} />
          <PropertyRow icon={<UserOutlined />} label="Assignee" value={task.assigned_to || 'Empty'} />
          <PropertyRow icon={<CalendarOutlined />} label="Due date" value={task.dueDate || 'Empty'} />
          <PropertyRow icon={<TagsOutlined />} label="Tags" value={task.tags?.join(', ') || 'Empty'} />
        </div>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.05)' }} />

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
            placeholder="Empty page. Type here..."
          />
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px' }}>
          <Button 
            type="primary" 
            onClick={handleSave} 
            style={{ background: 'var(--color-purple)', border: 'none', fontWeight: 500 }}
          >
            Save Changes
          </Button>
          <Button 
            danger 
            type="text"
            onClick={handleDelete}
            style={{ fontWeight: 500, color: 'var(--color-salmon)' }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};