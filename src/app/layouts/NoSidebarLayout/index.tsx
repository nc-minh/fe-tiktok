import classNames from 'classnames/bind';

import styles from './NoSidebarLayout.module.scss';
import Header from 'app/layouts/components/Header';

interface Props {
  children: JSX.Element;
}
const cx = classNames.bind(styles);

function NoSidebarLayout({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      <Header className={cx('header')} />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default NoSidebarLayout;
