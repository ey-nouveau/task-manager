import { Input as AntInput, InputProps } from 'antd';
import { SearchProps } from 'antd/es/input';
import styles from './styles.module.css';

export const Input = (props: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <AntInput variant="borderless" {...props} />
    </div>
  );
};

Input.Search = (props: SearchProps) => {
  return (
    <div className={styles.wrapper}>
      <AntInput.Search variant="borderless" {...props} />
    </div>
  );
};

Input.TextArea = (props: any) => {
  return (
    <div className={styles.wrapper}>
      <AntInput.TextArea variant="borderless" {...props} />
    </div>
  );
};
