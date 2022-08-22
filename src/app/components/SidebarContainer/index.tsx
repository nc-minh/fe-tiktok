import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FollowingsResponseType } from 'types/Follow';
import { UserInfo } from 'types/User';

import SidebarUser from '../SidebarUser';
import SkeletonCustomize from '../SkeletonCustomize';
import styles from './SidebarContainer.module.scss';

const cx = classNames.bind(styles);

interface Props {
  title?: string;
  footerText?: string;
  followings?: FollowingsResponseType[] | undefined;
  suggested?: UserInfo[] | undefined;
  type?: string;
  onSeeAll?: () => void;
  isFollowingsLoading?: boolean;
  isSuggestedLoading?: boolean;
}
function SidebarContainer({
  title,
  footerText,
  followings,
  type,
  suggested,
  onSeeAll = () => {},
  isFollowingsLoading = false,
  isSuggestedLoading = false,
}: Props) {
  const [users, setUsers] = useState<FollowingsResponseType[]>();
  const [suggestedAcc, setSuggestedAcc] = useState<UserInfo[]>();

  useEffect(() => {
    if (followings && type !== 'suggested') {
      setUsers(followings);
    }

    if (suggested && type === 'suggested') {
      setSuggestedAcc(suggested);
    }
  }, [followings, suggested]);

  if (type === 'suggested') {
    return (
      <div className={cx('wrapper')}>
        <header className={cx('header')}>{title}</header>
        <div className={cx('container')}>
          {suggestedAcc &&
            suggestedAcc.map((user, index) => (
              <SidebarUser key={index} user={user} />
            ))}

          {isSuggestedLoading && <SkeletonCustomize followings />}
        </div>
        <footer onClick={onSeeAll} className={cx('footer')}>
          {footerText}
        </footer>
      </div>
    );
  }

  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>{title}</header>
      <div className={cx('container')}>
        {users &&
          users.map((user, index) => (
            <SidebarUser key={index} user={user.follow_id} />
          ))}

        {isFollowingsLoading && <SkeletonCustomize followings />}
      </div>
      <footer onClick={onSeeAll} className={cx('footer')}>
        {footerText}
      </footer>
    </div>
  );
}

export default SidebarContainer;
