import { Tooltip } from '@mui/material';
import classNames from 'classnames/bind';
import { useCallback } from 'react';

import { removeItemFromStorage } from 'utils/storage';
import { MenuItemType } from 'types/Menu';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

interface Props {
  items: MenuItemType[];
  children: JSX.Element;
}

interface RenderMenuProps {
  items: MenuItemType[];
}

const RenderMenu = ({ items }: RenderMenuProps) => {
  const handleLogout = useCallback(
    (logout: any) => () => {
      if (logout) {
        removeItemFromStorage('userData');
        removeItemFromStorage('tokens');
        window.location.replace('/');
      }
    },
    [],
  );

  return (
    <ul className={cx('menu-list')}>
      {items.map((menuItem, index) => (
        <MenuItem
          key={index}
          item={menuItem}
          onClick={handleLogout(menuItem.title === 'Log out')}
        />
      ))}
    </ul>
  );
};

function Menu({ children, items = [] }: Props) {
  return (
    <Tooltip
      classes={{ tooltip: cx('tooltip'), arrow: cx('tooltipArrow') }}
      enterDelay={50}
      leaveDelay={150}
      arrow
      title={<RenderMenu items={items} />}
      placement="bottom-end"
    >
      {children}
    </Tooltip>
  );
}
export default Menu;
