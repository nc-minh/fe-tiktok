/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from 'app/components/Button';
import Image from 'app/components/Image';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProfileHeader.module.scss';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as ShareIcon } from 'assets/icons/share.svg';
import { useGetUserInfo, useGetUserByUsername } from 'queries/users';
import { UserInfo } from 'types/User';
import { setUserData, getUserData } from 'utils/storage';

const cx = classNames.bind(styles);

function ProfileHeader() {
  const [user, setUser] = useState<UserInfo>();
  const { username = '' } = useParams();
  const [enabledMyself, setEnabledMyself] = useState(false);
  const [enabledUser, setEnabledUser] = useState(false);

  const { data: GetUserByUsername, isFetching: isFetchingUsername } =
    useGetUserByUsername(username, true);

  console.log('co su thay doi prrams', username);

  console.log(GetUserByUsername);

  useEffect(() => {
    if (GetUserByUsername) {
      setUser(GetUserByUsername);
    }
  }, [
    user,
    setUser,
    setEnabledMyself,
    setEnabledUser,
    enabledMyself,
    enabledUser,
    username,
  ]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('infoMain')}>
        <Image className={cx('avatar')} src={GetUserByUsername?.avatar} />
        <div className={cx('nameWrapper')}>
          <h1 className={cx('fullname')}>{GetUserByUsername?.fullname}</h1>
          <strong className={cx('username')}>
            {GetUserByUsername?.username}
          </strong>
          <Button className={cx('btnEdit')} box leftIcon={<EditIcon />}>
            Edit profile
          </Button>
        </div>
        <ShareIcon className={cx('shareIcon')} />
      </div>
      <div>
        follower number follower:{GetUserByUsername?.followers_count}{' '}
        followings_count:
        {GetUserByUsername?.followings_count} like:
        {GetUserByUsername?.likes_count}
      </div>
      <div>bio</div>
    </div>
  );
}

export default ProfileHeader;
