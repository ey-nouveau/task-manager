import { Col } from "@/shared/ui/col";
import { Row } from "@/shared/ui/row";
import { Card } from "../card";
import { Checkbox } from "../checkbox";
import { Separator } from "../separator";
import { Typography } from "../typography";
import { useState } from "react";

export const DailyTasks = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Card>
      <Col>
        <Row align="center" justify="between" stretchX>
          <Typography variant="subtitle" text="Today's Tasks" />
          <Typography variant="captionBold" text="VIEW ALL" />
        </Row>
        <Col>
          {Array.from({ length: 3 }).map((_, index) => {
            const isLast = index === 2;

            return (
              <>
                <Row
                  key={index}
                  gap={16}
                  style={{
                    paddingBlock: "16px",
                  }}
                >
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked((p) => !p)}
                  />

                  <Col>
                    <Typography variant="body" text="Finish landing page UI" />
                    <Typography color="primary60" text="Design • 10:00 AM" />
                  </Col>
                </Row>
                {!isLast && <Separator />}
              </>
            );
          })}
        </Col>
      </Col>
    </Card>
  );
};
