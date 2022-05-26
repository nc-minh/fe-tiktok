import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button(props) {
  const { to, href, children, onClick, passProps, primary } = props;
  let Component = 'button';

  const _props = {
    onClick,
    ...passProps,
  };

  if (to) {
    _props.to = to;
    Component = Link;
  } else {
    _props.href = href;
    Component = 'a';
  }

  const classes = cx('wrapper', {
    primary,
  });

  return (
    <Component className={classes} {..._props}>
      <span>{children}</span>
    </Component>
  );
}

export default Button;
