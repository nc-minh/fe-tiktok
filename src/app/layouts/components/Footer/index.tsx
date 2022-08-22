import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export function Footer() {
  return (
    <footer className={cx('wrapper')}>
      <div className={cx('container')}>
        <main className={cx('content')}>
          <div className={cx('list')}>
            <Link className={cx('item')} to="/">
              About
            </Link>
            <Link className={cx('item')} to="/">
              TikTok Browse
            </Link>
            <Link className={cx('item')} to="/">
              Newsroom
            </Link>
            <Link className={cx('item')} to="/">
              Contact
            </Link>
            <Link className={cx('item')} to="/">
              Careers
            </Link>
            <Link className={cx('item')} to="/">
              ByteDance
            </Link>
          </div>
          <div className={cx('list')}>
            <Link className={cx('item')} to="/">
              TikTok for Good
            </Link>
            <Link className={cx('item')} to="/">
              Advertise
            </Link>
            <Link className={cx('item')} to="/">
              Developers
            </Link>
            <Link className={cx('item')} to="/">
              Transparency
            </Link>
            <Link className={cx('item')} to="/">
              TikTok Rewards
            </Link>
          </div>
          <div className={cx('list')}>
            <Link className={cx('item')} to="/">
              Help
            </Link>
            <Link className={cx('item')} to="/">
              Safety
            </Link>
            <Link className={cx('item')} to="/">
              Terms
            </Link>
            <Link className={cx('item')} to="/">
              Privacy
            </Link>
            <Link className={cx('item')} to="/">
              Creator Portal
            </Link>
            <Link className={cx('item')} to="/">
              Community Guidelines
            </Link>
          </div>
          <strong className={cx('copyright')}>© 2022 TikTok</strong>
        </main>
      </div>
    </footer>
  );
}
