import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Input, Button } from 'antd';
import styles from './TaskInput.module.css';

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
    <div className={styles.container}>
      <Input
        variant="filled"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <Button 
        type="default" 
        onClick={handleSubmit}
        className={styles.button}
      >
        Add
      </Button>
    </div>
  );
};
