import { Button, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import type { MouseEvent } from 'react';

interface Props {
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onDelete: () => void;
}

export const TaskActions = ({ onMoveLeft, onMoveRight, onDelete }: Props) => {
  const handle = (fn?: () => void) => (e: MouseEvent) => {
    e.stopPropagation();
    fn?.();
  };

  return (
    <Space size="small">
      {onMoveLeft && <Button type="text" size="small" icon={<ArrowLeftOutlined style={{ color: 'var(--color-text-muted)' }}/>} onClick={handle(onMoveLeft)} />}
      {onMoveRight && <Button type="text" size="small" icon={<ArrowRightOutlined style={{ color: 'var(--color-text-muted)' }}/>} onClick={handle(onMoveRight)} />}
      <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={handle(onDelete)} />
    </Space>
  );
};