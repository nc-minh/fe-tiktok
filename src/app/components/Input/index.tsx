import classNames from 'classnames/bind';
import { memo, useCallback } from 'react';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

interface Props {
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onFocus?: () => void;
  onClick?: () => void;
  value?: string;
  className?: string;
  autoFocus?: boolean;
  isDisabled?: boolean;
}

function Input(props: Props) {
  const {
    placeholder,
    type = 'text',
    name,
    onChange = () => {},
    onBlur = () => {},
    onKeyDown = () => {},
    onFocus = () => {},
    onClick = () => {},
    value = '',
    className = '',
    autoFocus = false,
    isDisabled = false,
  } = props;
  const classes = cx('input', {
    [className]: className,
  });

  const handleInputFocus = useCallback(() => {
    if (onFocus) onFocus();
  }, [onFocus]);

  const handleInputBlur = useCallback(() => {
    if (onBlur) onBlur();
  }, [onBlur]);

  return (
    <input
      autoComplete="off"
      className={classes}
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      autoFocus={autoFocus}
      disabled={isDisabled}
      onKeyDown={onKeyDown}
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
      onClick={onClick}
    />
  );
}

export default memo(Input);
