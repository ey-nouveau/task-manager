import styles from './styles.module.css';

interface Props {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Switch = ({ checked, onChange, className = '' }: Props) => {
  return (
    <button 
      type="button"
      className={`${styles.switch} ${checked ? styles.switchChecked : ''} ${className}`}
      onClick={() => onChange?.(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className={`${styles.thumb} ${checked ? styles.thumbChecked : ''}`} />
    </button>
  );
};
