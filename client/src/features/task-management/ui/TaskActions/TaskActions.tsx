import { Button } from '@/shared/ui/button';
import { Row } from '@/shared/ui/row';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
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
      {onMoveLeft && <Button variant="text"  icon={<ArrowLeft size={14} color="var(--color-text-muted)" />} onClick={handle(onMoveLeft)} />}
      {onMoveRight && <Button variant="text"  icon={<ArrowRight size={14} color="var(--color-text-muted)" />} onClick={handle(onMoveRight)} />}
      <Button variant="text"  danger icon={<Trash2 size={14} />} onClick={handle(onDelete)} />
    </Row>
  );
};
