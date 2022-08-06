import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import ProfileHeader from 'app/containers/ProfileHeader';

const cx = classNames.bind(styles);

export function Profile() {
  return (
    <>
      <div className={cx('wrapper')}>
        <ProfileHeader />
      </div>
    </>
  );
}
