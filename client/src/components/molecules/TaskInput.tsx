import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Input, Button, Space } from 'antd';

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
    <Space.Compact style={{ width: '100%', marginTop: '8px' }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <Button onClick={handleSubmit}>Add</Button>
    </Space.Compact>
  );
};