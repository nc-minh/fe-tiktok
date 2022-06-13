import PropTypes from 'prop-types';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ hideOnClick = false, children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItem = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      const handleAddMore = (prev) => [...prev, item.children];

      return (
        <MenuItem
          key={index}
          item={item}
          onClick={() => {
            if (isParent) {
              setHistory(handleAddMore);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleBack = (prev) => prev.slice(0, prev.length - 1);

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx('menu-popper')}>
        {history.length > 1 && (
          <Header
            title={current.title}
            onBack={() => {
              setHistory(handleBack);
            }}
          />
        )}
        <div className={cx('menu-scrollable')}>{renderItem()}</div>
      </PopperWrapper>
    </div>
  );

  const handleResetToFirstPage = (prev) => prev.slice(0, 1);
  return (
    <Tippy
      hideOnClick={hideOnClick}
      offset={[12, 8]}
      delay={[0, 700]}
      interactive
      placement="bottom-end"
      render={renderResult}
      onHide={() => {
        setHistory(handleResetToFirstPage);
      }}
    >
      {children}
    </Tippy>
  );
}

Menu.prototype = {
  hideOnClick: PropTypes.bool,
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

export default Menu;
