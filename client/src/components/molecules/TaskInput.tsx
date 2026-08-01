import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Input, Button } from 'antd';

interface Props {
  onSubmit: (value: string) => void;
  placeholder?: string;
}

export const TaskInput = ({ onSubmit, placeholder }: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Input
        variant="filled"
        style={{ background: 'var(--color-dark)', color: 'var(--color-text-light)', border: '1px solid rgba(255,255,255,0.08)' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <Button 
        type="default" 
        onClick={handleSubmit}
        style={{ background: 'transparent', border: '1px solid var(--color-purple)', color: 'var(--color-purple)' }}
      >
        Add
      </Button>
    </div>
  );
};