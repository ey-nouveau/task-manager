import { Col } from "@/shared/ui/col";
import { Typography } from "../typography";
import s from "./styles.module.css";

type Props = {
  subtile: string;
  progress: number;
};

export const ProgressCircle = ({ subtile, progress }: Props) => {
  return (
    <Col
      className={s.circle}
      align="center"
      justify="center"
      style={
        {
          "--progress": `${progress}%`,
        } as React.CSSProperties
      }
    >
      <Col className={s.content} align="center" justify="center">
        <Typography text={`${progress.toString()}%`} variant="title" />
        <Typography text={subtile} variant="caption" color="primary60" />
      </Col>
    </Col>
  );
};
