import classNames from "classnames";
import s from "./styles.module.css";

type TypographyVariant =
  | "caption" // 12/16 — подписи, метаданные
  | "captionBold" // 12/16/bold — подписи, метаданные
  | "bodySmall" // 14/20 — основной текст, UI
  | "body" // 16/24 — основной текст, UI
  | "subtitle" // 18/28 — подзаголовки
  | "subtitleBold" // 20/30 — подзаголовки
  | "title" // 24/36 — заголовки секций
  | "display"; // 32/40 — крупные заголовки

type Color = "primary" | "primary60";

type Props = {
  variant?: TypographyVariant;
  text: string;
  color?: Color;
};

export const Typography = ({
  color = "primary",
  text,
  variant = "bodySmall",
}: Props) => {
  return (
    <span className={classNames(s.text, s[variant], s[color])}>{text}</span>
  );
};
