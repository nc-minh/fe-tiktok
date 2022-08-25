import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { memo } from 'react';

import Image from 'app/components/Image';
import styles from './AccountItem.module.scss';
import { ReactComponent as TickIcon } from 'assets/icons/check.svg';
import { UserInfo } from 'types/User';

const cx = classNames.bind(styles);

interface Props {
  userInfo: UserInfo;
}

function AccountItem({ userInfo }: Props) {
  return (
    <Link to={`/@${userInfo.username}`} className={cx('wrapper')}>
      <Image
        className={cx('avatar')}
        src={userInfo.avatar}
        alt={userInfo.fullname}
      />
      <div className={cx('info')}>
        <strong className={cx('name')}>
          <strong>{userInfo.fullname}</strong>
          {userInfo.tick && <TickIcon />}
        </strong>
        <span className={cx('username')}>{userInfo.username}</span>
      </div>
    </Link>
  );
}

export default memo(AccountItem);
