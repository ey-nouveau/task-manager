import { useTheme, useToggleTheme } from "@/shared/stores/theme/selectors";
import { Row } from "../../shared/ui/row";
import styles from "./styles.module.css";

export const ThemeToggle = () => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const isDarkMode = theme === "dark";
  return (
    <Row align="center" className={styles.themeToggle} onClick={toggleTheme}>
      <Row
        align="center"
        justify="center"
        className={`${styles.themeThumb} ${isDarkMode ? styles.themeThumbDark : ""}`}
      >
        {isDarkMode ? "🌙" : "☀️"}
      </Row>
    </Row>
  );
};
