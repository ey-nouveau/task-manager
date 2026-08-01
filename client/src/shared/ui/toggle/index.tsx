import { Row } from "../row";
import styles from "./styles.module.css";

export const ThemeToggle = ({
  onToggle,
  isActive,
}: {
  isActive: boolean;
  onToggle: () => void;
}) => {
  return (
    <Row align="center" className={styles.themeToggle} onClick={onToggle}>
      <Row
        align="center"
        justify="center"
        className={`${styles.themeThumb} ${isActive ? styles.themeThumbDark : ""}`}
      >
        {isActive ? "🌙" : "☀️"}
      </Row>
    </Row>
  );
};
