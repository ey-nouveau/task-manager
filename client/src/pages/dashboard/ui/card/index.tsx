import { ReactNode } from "react";
import s from "./styles.module.css";
import cn from "classnames";

export const Card = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn(s.card, className)}>{children}</div>;
};
