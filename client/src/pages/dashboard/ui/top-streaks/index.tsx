import { Col } from "@/shared/ui/col";
import { DumbbellIcon } from "lucide-react";
import { Card } from "../card";
import { Typography } from "../typography";
import { Track } from "../track";
import s from "./styles.module.css";

export const TopStreaks = () => {
  return (
    <Col gap={16}>
      <Typography variant="subtitle" text="Top Streaks" />

      <Track gap={16}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card className={s.minWidth} key={index}>
            <Col gap={8}>
              <DumbbellIcon />

              <Col>
                <Typography variant="subtitleBold" text="12 Days" />
                <Typography
                  text="MORNING RUN"
                  variant="captionBold"
                  color="primary60"
                />
              </Col>
            </Col>
          </Card>
        ))}
      </Track>
    </Col>
  );
};
