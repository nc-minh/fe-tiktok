import classNames from 'classnames/bind';

import styles from './FullWidthLayout.module.scss';
import Header from 'app/layouts/components/Header';
import Sidebar from '../components/Sidebar';

interface Props {
  children: JSX.Element;
}
const cx = classNames.bind(styles);

function FullWidthLayout({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar className={cx('width')} />
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default FullWidthLayout;
