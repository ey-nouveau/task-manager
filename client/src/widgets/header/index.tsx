import { useTheme, useToggleTheme } from "@/shared/stores/theme/selectors";
import { Responsive } from "@/shared/ui/responsive";
import { Row } from "@/shared/ui/row";
import { ThemeToggle } from "@/shared/ui/toggle";
import { Box, Home, LayoutGrid, Link, LinkIcon, Settings } from "lucide-react";
import styles from "./styles.module.css";

const navItems = [
  { path: "/", label: "Home", icon: <Home size={18} /> },
  { path: "/dashboard", label: "Dashboard", icon: <LayoutGrid size={18} /> },
  { path: "/board", label: "Task Board", icon: <LayoutGrid size={18} /> },
  {
    path: "/integrations",
    label: "Integrations",
    icon: <LinkIcon size={18} />,
  },
  { path: "/preferences", label: "Preferences", icon: <Settings size={18} /> },
];

export const AppHeader = () => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  const isDarkMode = theme === "dark";

  return (
    <Row justify="between" align="center" wrap className={styles.mainHeader}>
      <div style={{ fontSize: "24px" }}>
        <Box size={28} />
      </div>

      <Responsive layout="desktop">
        <Row align="center" className={styles.navPillContainer}>
          {navItems.map((item) => {
            const isActive = false;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`${styles.navPillItem} ${isActive ? styles.navPillItemActive : ""}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </Row>
      </Responsive>

      <Responsive layout="mobile">
        <Row
          align="center"
          className={styles.navPillContainer}
          style={{ width: "100%", marginTop: "16px" }}
        >
          {navItems.slice(0, 3).map((item) => {
            const isActive = true;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`${styles.navPillItem} ${isActive ? styles.navPillItemActive : ""}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </Row>
      </Responsive>

      <ThemeToggle isActive={isDarkMode} onToggle={toggleTheme} />
    </Row>
  );
};
