import classNames from 'classnames/bind';

import styles from './NoFooterLayout.module.scss';
import Header from 'app/layouts/components/Header';

interface Props {
  children: JSX.Element;
}
const cx = classNames.bind(styles);

function NoFooterLayout({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      {children}
    </div>
  );
}

export default NoFooterLayout;
