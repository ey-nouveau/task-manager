import { Col } from "@/shared/ui/col";
import s from "./styles.module.css";
import { ReactNode } from "react";

export const ActivityCard = ({ children }: { children: ReactNode }) => {
  return <Col className={s.card}>{children}</Col>;
};
