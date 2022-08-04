import classNames from 'classnames/bind';

import styles from './NoContent.module.scss';
import { ReactComponent as UserIcon } from 'assets/icons/user-thin.svg';

const cx = classNames.bind(styles);

function NotContent() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <UserIcon className={cx('icon')} />
        <h5 className={cx('text')}>No content</h5>
        <p className={cx('desc')}>
          {`This user has not published any videos.`}
        </p>
      </div>
    </div>
  );
}

export default NotContent;