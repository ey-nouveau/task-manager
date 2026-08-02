import cn from "classnames";
import s from "./styles.module.css";

type Props = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export const Checkbox = ({ checked, onChange, disabled, className }: Props) => {
  return (
    <label className={cn(s.wrapper, className)}>
      <input
        className={s.input}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />

      <span className={cn(s.checkbox, checked && s.checked)}>
        {checked && <span className={s.icon} />}
      </span>
    </label>
  );
};
