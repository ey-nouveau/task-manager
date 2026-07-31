import { useState, useEffect } from 'react';
import { Modal, Input, Space, Button } from 'antd';
import { useBoardStore } from '../../store/useBoardStore';
import type { Task } from '../../store/useBoardStore';

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskDetailsModal = ({ task, isOpen, onClose }: Props) => {
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
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSave}>Save</Button>
      ]}
      destroyOnClose
    >
      <Space direction="vertical" style={{ width: '100%', marginTop: '24px' }} size="large">
        <Input
          variant="borderless"
          style={{ fontSize: '24px', fontWeight: 'bold', padding: 0 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input.TextArea
          variant="filled"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <Button danger onClick={handleDelete}>Delete Task</Button>
      </Space>
    </Modal>
  );
};