import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: string;
  onClick?: () => void;
  active?: boolean;
}

export function Button({ children, onClick, active }: Props) {
  const classes = cx('btn', {
    active: active,
  });

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
