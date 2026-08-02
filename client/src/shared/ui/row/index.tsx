import s from "./styles.module.css";
import cn from "classnames";

type Props = {
  gap?: number;
  children: React.ReactNode;
  justify?: "start" | "center" | "end" | "between" | "around";
  align?: "start" | "center" | "end" | "stretch";
  flexWrap?: "wrap" | "nowrap";
  className?: string;
  flex?: React.CSSProperties["flex"];
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

export const Row = ({
  gap,
  children,
  justify,
  align,
  flex,
  flexWrap,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <div
      className={cn(s.row, className)}
      style={{
        gap,
        justifyContent: justify,
        alignItems: align,
        flexWrap,
        flex,
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
