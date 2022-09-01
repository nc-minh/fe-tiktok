import classNames from 'classnames/bind';
import { memo } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: JSX.Element;
}

function DefaultMobileLayout({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      <Header className={cx('header')} />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer className={cx('footer')} />
    </div>
  );
}

export default memo(DefaultMobileLayout);
