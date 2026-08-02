import { Col } from "@/shared/ui/col";
import { Row } from "@/shared/ui/row";
import { Card } from "../card";
import { Typography } from "../typography";
import { GlassWaterIcon, BookIcon, DumbbellIcon } from "lucide-react";

const habits = [
  {
    title: "Water",
    icon: GlassWaterIcon,
  },
  {
    title: "Read",
    icon: BookIcon,
  },
  {
    title: "Gym",
    icon: DumbbellIcon,
  },
  {
    title: "Zen",
    icon: DumbbellIcon,
  },
];

export const Habits = () => {
  return (
    <Card>
      <Row align="center" justify="center" gap={16}>
        {habits.map(({ title, icon: Icon }) => (
          <Col
            key={title}
            gap={8}
            align="center"
            style={{
              padding: "13px 15px",
              border: "1px solid gray",
              borderRadius: "12px",
            }}
          >
            <Icon width={16} height={20} color="#27251E99" />

            <Typography text={title} variant="captionBold" color="primary60" />
          </Col>
        ))}
      </Row>
    </Card>
  );
};
