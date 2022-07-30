import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

interface Props {
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: () => void;
  onBlur?: () => void;
  value?: string;
}

function Input({
  placeholder,
  type = 'text',
  name,
  onChange = () => {},
  onBlur = () => {},
  value = '',
}: Props) {
  return (
    <input
      autoComplete="off"
      className={cx('input')}
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
}

export default Input;
