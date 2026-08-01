import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Row } from "@/shared/ui/row";
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
    <Row gap={8} align="stretch" className={styles.container}>
      <Input
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Add new task..."
        style={{ flex: 1 }}
      />
      <Button variant="default" onClick={handleSubmit} className={styles.button}>
        Add
      </Button>
    </Row>
  );
};
