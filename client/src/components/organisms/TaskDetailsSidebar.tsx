import { useState, useEffect } from 'react';
import { Drawer, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useBoardStore } from '../../store/useBoardStore';
import type { Task } from '../../store/useBoardStore';

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

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

  if (!task) return null;

  const handleSave = () => {
    updateTask(task.id, { title, description });
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      placement="right"
      width={450}
      closable={false}
      styles={{
        body: { background: 'var(--color-dark)', padding: '32px' },
        mask: { backdropFilter: 'blur(4px)' }
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ color: 'var(--color-purple)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Edit Task
          </div>
          <div 
            onClick={onClose} 
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <CloseOutlined style={{ color: 'var(--color-text-light)' }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Task Title</div>
            <Input
              variant="borderless"
              style={{ fontSize: '20px', fontWeight: 500, padding: '8px 12px', color: 'var(--color-text-light)', background: 'var(--color-dark-grey)', borderRadius: '8px' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Description</div>
            <Input.TextArea
              variant="borderless"
              rows={8}
              style={{ padding: '12px', color: 'var(--color-text-light)', background: 'var(--color-dark-grey)', borderRadius: '8px', resize: 'none' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, acceptance criteria..."
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Button 
            type="primary" 
            onClick={handleSave} 
            style={{ flex: 1, background: 'var(--color-purple)', border: 'none', height: '40px', fontWeight: 500 }}
          >
            Save Changes
          </Button>
          <Button 
            danger 
            type="text"
            onClick={handleDelete}
            style={{ height: '40px', fontWeight: 500, background: 'rgba(255,0,0,0.1)' }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Drawer>
  );
};