import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';
import { ReactComponent as SpinnerIcon } from 'assets/icons/spinner.svg';

const cx = classNames.bind(styles);

interface Props {
  to?: string;
  href?: string;
  children?: string | JSX.Element;
  onClick?: () => void;
  className?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  primary?: boolean;
  outline?: boolean;
  small?: boolean;
  large?: boolean;
  text?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  box?: boolean;
  type?: any;
  loading?: boolean;
}

function Button({
  to,
  href,
  children,
  onClick = () => {},
  className = '',
  leftIcon,
  rightIcon,
  primary = false,
  outline = false,
  small = false,
  large = false,
  text = false,
  disabled = false,
  rounded = false,
  box = false,
  type = 'button',
  loading = false,
}: Props) {
  const _props: any = {
    onClick,
  };

  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(_props).forEach(key => {
      if (key.startsWith('on') && typeof _props[key] === 'function') {
        delete _props[key];
      }
    });
  }

  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    box,
    [className]: className,
  });

  if (to && !href) {
    return (
      <Link to={to} className={classes}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
        <span className={cx('title')}>{children}</span>
        {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </Link>
    );
  }

  if (href && !to) {
    return (
      <a href={href} className={classes}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
        <span className={cx('title')}>{children}</span>
        {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>
        {loading ? <SpinnerIcon className={cx('loading', 'size')} /> : children}
      </span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </button>
  );
}

export default Button;
