import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { memo } from 'react';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

interface Props {
  title: string;
  to: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
}

function MenuItem({ title, to, icon, activeIcon }: Props) {
  return (
    <NavLink
      className={nav => cx('menu-item', { active: nav.isActive })}
      to={to}
    >
      <span className={cx('icon')}>{icon}</span>
      <span className={cx('active-icon')}>{activeIcon}</span>
      <span className={cx('title')}>{title}</span>
    </NavLink>
  );
}

export default memo(MenuItem);
