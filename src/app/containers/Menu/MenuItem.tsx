import classNames from 'classnames/bind';
import { memo } from 'react';

import Button from 'app/components/Button';
import styles from './Menu.module.scss';
import { MenuItemType } from 'types/Menu';

const cx = classNames.bind(styles);

interface Props {
  item: MenuItemType;
  onClick?: () => void;
}

function MenuItem({ item, onClick = () => {} }: Props) {
  const classes = cx('menu-item', {
    separate: item.separate,
  });
  return (
    <Button
      className={classes}
      leftIcon={item.icon}
      to={item.to}
      onClick={onClick}
    >
      {item.title}
    </Button>
  );
}

export default memo(MenuItem);
