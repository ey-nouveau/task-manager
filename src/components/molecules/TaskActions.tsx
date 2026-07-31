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
      {onMoveLeft && <Button size="small" icon={<ArrowLeftOutlined />} onClick={handle(onMoveLeft)} />}
      {onMoveRight && <Button size="small" icon={<ArrowRightOutlined />} onClick={handle(onMoveRight)} />}
      <Button size="small" danger icon={<DeleteOutlined />} onClick={handle(onDelete)} />
    </Space>
  );
};