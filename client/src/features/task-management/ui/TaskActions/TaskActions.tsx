import { Button } from '@/shared/ui/button';
import { Row } from '@/shared/ui/row';
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
    <Row >
      {onMoveLeft && <Button variant="text"  icon={<ArrowLeftOutlined style={{ color: 'var(--color-text-muted)' }}/>} onClick={handle(onMoveLeft)} />}
      {onMoveRight && <Button variant="text"  icon={<ArrowRightOutlined style={{ color: 'var(--color-text-muted)' }}/>} onClick={handle(onMoveRight)} />}
      <Button variant="text"  danger icon={<DeleteOutlined />} onClick={handle(onDelete)} />
    </Row>
  );
};
