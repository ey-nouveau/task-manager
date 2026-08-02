import { CSSProperties } from "react";
import s from "./styles.module.css";

type Props = {
  gap?: number;
  children: React.ReactNode;
  justify?: "start" | "center" | "end" | "between" | "around";
  align?: "start" | "center" | "end" | "stretch";
  flex?: 1 | 0;
  flexWrap?: CSSProperties["flexWrap"];
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

export const Col = ({
  flex,
  gap,
  children,
  justify,
  align,
  flexWrap,
  className = "",
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <div
      className={`${s.col} ${className}`}
      style={{
        gap,
        flex,
        justifyContent: justify,
        alignItems: align,
        flexWrap,
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};
