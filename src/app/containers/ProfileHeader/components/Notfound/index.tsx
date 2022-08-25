import classNames from 'classnames/bind';

import styles from './NotFound.module.scss';
import { ReactComponent as UserThinIcon } from 'assets/icons/user-thin.svg';

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <UserThinIcon className={cx('icon')} />
        <h3 className={cx('title')}>Couldn't find this account</h3>
        <p className={cx('subtitle')}>
          Looking for videos? Try browsing our trending creators, hashtags, and
          sounds.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
