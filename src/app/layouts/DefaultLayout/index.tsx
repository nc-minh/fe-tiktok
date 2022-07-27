import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import { Footer } from 'app/layouts/components/Footer';
import { Header } from 'app/layouts/components/Header';

const cx = classNames.bind(styles);

interface Props {
  children: JSX.Element;
}

function DefaultLayout({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
