import { Outlet } from "react-router-dom";
import { Col } from "@/shared/ui/col";
import styles from "./styles.module.css";

import { AppHeader } from "@/widgets/app-header";

export const MainLayout = () => {
  return (
    <Col className={styles.appWindow}>
      <AppHeader />

      <Col flex={1} className={styles.children}>
        <Outlet />
      </Col>
    </Col>
  );
};
