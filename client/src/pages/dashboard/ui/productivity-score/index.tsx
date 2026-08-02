import { Col } from "@/shared/ui/col";
import { Card } from "../card";
import { ProgressCircle } from "../progress-circle";
import { Typography } from "../typography";

export const ProductivityScore = () => {
  return (
    <Card>
      <Col align="center" justify="center" gap={16}>
        <ProgressCircle progress={70} subtile={"Daily"} />

        <Col align="center">
          <Typography variant="subtitle" text="Productivity Score" />
          <Typography
            variant="body"
            color="primary60"
            text="You're doing better than 85% of peers"
          />
        </Col>
      </Col>
    </Card>
  );
};
