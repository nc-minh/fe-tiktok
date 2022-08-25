import { ReactComponent as ArrowLeft } from 'assets/icons/arrowLeft.svg';
import classNames from 'classnames/bind';
import { memo } from 'react';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

interface Props {
  title: string;
  onBack: () => void;
}

function Header({ title, onBack }: Props) {
  return (
    <header className={cx('header')}>
      <button className={cx('back-btn')} onClick={onBack}>
        <ArrowLeft />
      </button>
      <h4 className={cx('header-title')}>{title}</h4>
    </header>
  );
}

export default memo(Header);
