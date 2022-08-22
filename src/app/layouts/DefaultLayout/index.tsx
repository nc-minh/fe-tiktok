import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from 'app/layouts/components/Header';
import Sidebar from 'app/layouts/components/Sidebar';

const cx = classNames.bind(styles);

interface Props {
  children: JSX.Element;
}

function DefaultLayout({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar />
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
