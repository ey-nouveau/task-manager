import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.css';

type ButtonVariant = 'default' | 'primary' | 'text' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  danger?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'medium', 
  icon, 
  danger,
  className = '', 
  ...rest 
}: Props) => {
  
  // If danger prop is explicitly passed (AntD style support)
  const finalVariant = danger ? 'danger' : variant;

  const classes = [
    styles.button,
    styles[`size-${size}`],
    styles[`variant-${finalVariant}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...rest}>
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      {children}
    </button>
  );
};
