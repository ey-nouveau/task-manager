import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import styles from './styles.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <input className={styles.input} {...props} />
    </div>
  );
};

export const Search = ({ className = '', ...props }: InputProps) => {
  return (
    <div className={`${styles.wrapper} ${styles.searchWrapper} ${className}`}>
      <input className={styles.input} {...props} />
      <SearchIcon size={16} className={styles.searchIcon} />
    </div>
  );
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoSize?: boolean | { minRows?: number };
}

export const TextArea = ({ className = '', autoSize, ...props }: TextAreaProps) => {
  const minHeight = typeof autoSize === 'object' && autoSize.minRows ? autoSize.minRows * 24 : 100;
  
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <textarea 
        className={`${styles.input} ${styles.textarea}`} 
        style={{ minHeight }}
        {...props} 
      />
    </div>
  );
};

Input.Search = Search;
Input.TextArea = TextArea;
