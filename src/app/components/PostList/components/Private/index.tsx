import classNames from 'classnames/bind';
import { memo } from 'react';

import styles from './Private.module.scss';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { getUserData } from 'utils/storage';

const cx = classNames.bind(styles);

function Private() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <LockIcon />
        <h5 className={cx('text')}>This user's liked videos are private</h5>
        <p className={cx('desc')}>
          {`Videos liked by ${getUserData().username} are currently hidden`}
        </p>
      </div>
    </div>
  );
}

export default memo(Private);
