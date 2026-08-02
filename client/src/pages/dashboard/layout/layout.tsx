import { useIsMobile } from "@/shared/lib/hooks/use-is-mobile";
import { Col } from "@/shared/ui/col";
import { Outlet } from "react-router-dom";
import s from "./layout.module.css";
import { Row } from "@/shared/ui/row";
import { BellIcon, BotIcon, UserIcon } from "lucide-react";

export const DashboardPageLayout = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Col>
        <header className={s.header}>
          <Row>
            <Row gap={12}>
              <BotIcon />
              <span style={{ color: "red" }}>LifeHub</span>
            </Row>

            <Row gap={16}>
              <BellIcon />
              <UserIcon />
            </Row>
          </Row>
        </header>

        <div className={s.children}>
          <Outlet />
        </div>
      </Col>
    );
  }

  return <div>123123123</div>;
};
