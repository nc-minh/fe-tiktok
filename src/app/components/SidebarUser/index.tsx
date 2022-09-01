import classNames from 'classnames/bind';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import Image from 'app/components/Image';
import styles from './SidebarUser.module.scss';
import { ReactComponent as TickIcon } from 'assets/icons/check.svg';
import { UserFollowingsType } from 'types/Follow';

const cx = classNames.bind(styles);

interface Props {
  user: UserFollowingsType;
}
function SidebarUser({ user }: Props) {
  return (
    <div className={cx('wrapper')}>
      <Link to={`/@${user?.username}`} className={cx('container')}>
        <div className={cx('imageWrapper')}>
          <Image className={cx('image')} src={user?.avatar} />
        </div>
        <div className={cx('userWrapper')}>
          <div className={cx('nameWrapper')}>
            <h3 className={cx('username')}>{user?.username}</h3>
            {user?.tick && <TickIcon />}
          </div>
          <span className={cx('fullname')}>{user?.fullname}</span>
        </div>
      </Link>
    </div>
  );
}

export default memo(SidebarUser);
