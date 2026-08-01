import s from "./styles.module.css";

type Props = {
  gap?: number;
  children: React.ReactNode;
  justify?: "start" | "center" | "end" | "between" | "around";
  align?: "start" | "center" | "end" | "stretch";
  wrap?: boolean;
};

export const Col = ({ gap, children, justify, align, wrap }: Props) => {
  return (
    <div
      className={s.col}
      style={{
        gap,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? "wrap" : "nowrap",
      }}
    >
      {children}
    </div>
  );
};
