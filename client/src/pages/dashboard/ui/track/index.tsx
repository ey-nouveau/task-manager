import { Row } from "@/shared/ui/row";
import cn from "classnames";
import { ReactNode } from "react";
import s from "./styles.module.css";

type Props = {
  gap?: number;
  className?: string;
  children: ReactNode;
};

export const Track = ({ gap, className, children }: Props) => {
  return (
    <Row stretchY className={cn(s.track, className)} gap={gap}>
      {children}
    </Row>
  );
};
