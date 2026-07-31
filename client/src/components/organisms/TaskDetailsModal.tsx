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

  if (!task) return null;

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Space direction="vertical" style={{ width: '100%', marginTop: '24px' }} size="large">
        <Input
          variant="borderless"
          style={{ fontSize: '24px', fontWeight: 'bold', padding: 0 }}
          value={task.title}
          onChange={(e) => updateTask(task.id, { title: e.target.value })}
        />
        <Input.TextArea
          variant="filled"
          rows={6}
          value={task.description}
          onChange={(e) => updateTask(task.id, { description: e.target.value })}
          placeholder="Description"
        />
        <Button danger onClick={handleDelete}>Delete Task</Button>
      </Space>
    </Modal>
  );
};