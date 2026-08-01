import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Input, Button } from "antd";
import styles from "./styles.module.css";

interface Props {
  onSubmit: (value: string) => void;
}

export const AddTask = ({ onSubmit }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={styles.container}>
      <Input
        variant="filled"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={"Add new task..."}
      />
      <Button type="default" onClick={handleSubmit} className={styles.button}>
        Add
      </Button>
    </div>
  );
};
