/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from '@mui/material';
import classNames from 'classnames/bind';
import { useCallback, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { removeItemFromStorage } from 'utils/storage';
import { MenuItemType } from 'types/Menu';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

interface Props {
  items: MenuItemType[];
  children: JSX.Element;
}

interface RenderMenuProps {
  items: MenuItemType[];
}

interface ARR {
  data: MenuItemType[];
  title?: string;
}

const RenderMenu = ({ items }: RenderMenuProps) => {
  const { t, i18n } = useTranslation();
  const [history, setHistory] = useState<ARR[]>([{ data: items }]);
  const currentMenu = history[history.length - 1];

  const handleSelectMenu = useCallback(
    (menuItem: any) => () => {
      if (menuItem.title === 'Log out') {
        removeItemFromStorage('userData');
        removeItemFromStorage('tokens');
        window.location.replace('/');
        return;
      }

      const isParent = !!menuItem.children;
      if (isParent) {
        setHistory(prev => [...prev, menuItem.children]);
      }

      if (menuItem?.code) {
        i18n.changeLanguage(menuItem?.code);
      }
    },
    [history, setHistory],
  );

  const handleBack = useCallback(() => {
    setHistory(prev => prev.slice(0, prev.length - 1));
  }, [history, setHistory]);

  return (
    <ul className={cx('menu-list')}>
      {history.length > 1 && (
        <Header title={currentMenu?.title} onBack={handleBack} />
      )}
      {currentMenu.data.map((menuItem, index) => (
        <MenuItem
          key={index}
          item={menuItem}
          onClick={handleSelectMenu(menuItem)}
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
export default memo(Menu);
