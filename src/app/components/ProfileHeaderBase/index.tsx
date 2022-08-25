/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from 'app/components/Button';
import { useCallback, useState, memo } from 'react';
import Image from 'app/components/Image';
import classNames from 'classnames/bind';
import { Tooltip } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import styles from './ProfileHeaderBase.module.scss';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as ShareIcon } from 'assets/icons/share.svg';
import { ReactComponent as UnfollowIcon } from 'assets/icons/unfollow.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { UserInfo } from 'types/User';
import SkeletonCustomize from 'app/components/SkeletonCustomize';
import { useFollow } from 'mutations/follow';
import DialogCustomize from '../DialogCustomize';
import EditProfile from 'app/containers/EditProfile';
import { getUserData } from 'utils/storage';
import { detectLoginActions } from './slice';
import PostFeedTab from 'app/containers/PostFeedTab';
import { numberFormat } from 'utils/constants';

const cx = classNames.bind(styles);

interface ButtonRenderProps {
  isEdit?: boolean;
  isFollow?: boolean;
  user: UserInfo | undefined;
  refetch?: () => void;
  handleOnpenEditPopup?: () => void;
}
const ButtonRender = ({
  isEdit,
  isFollow,
  user,
  refetch = () => {},
  handleOnpenEditPopup = () => {},
}: ButtonRenderProps) => {
  const dispath = useDispatch();
  const follow_id = user?._id;
  const { _id } = getUserData();

  const follow = useFollow();

  const onFollow = useCallback(() => {
    if (follow_id && _id) {
      follow.mutate(
        { follow_id },
        {
          onSuccess: async () => {
            refetch();
          },
          onError: async () => {},
        },
      );
    } else {
      dispath(detectLoginActions.detectLogin(true));
    }
  }, [user]);

  const onUnFollow = useCallback(() => {
    if (follow_id) {
      follow.mutate(
        { follow_id },
        {
          onSuccess: async () => {
            refetch();
          },
          onError: async () => {},
        },
      );
    }
  }, [user]);
  if (isEdit) {
    return (
      <Button
        onClick={handleOnpenEditPopup}
        leftIcon={<EditIcon />}
        className={cx('btnEdit')}
        box
      >
        Edit profile
      </Button>
    );
  } else if (isFollow) {
    return (
      <div className={cx('messageWrapper')}>
        <Button className={cx('message')} outline>
          Messages
        </Button>
        <Tooltip title="Unfollow" arrow>
          <div onClick={onUnFollow} className={cx('unfollowIcon')}>
            <UnfollowIcon />
          </div>
        </Tooltip>
      </div>
    );
  } else {
    return (
      <Button
        className={cx('follow')}
        primary
        onClick={onFollow}
        loading={follow.isLoading}
      >
        Follow
      </Button>
    );
  }
};

interface Props {
  user: UserInfo | undefined;
  isEdit: boolean;
  refetch?: () => void;
  refetchInfoLogin?: () => void;
}
function ProfileHeaderBase({
  user,
  isEdit,
  refetch = () => {},
  refetchInfoLogin = () => {},
}: Props) {
  const isFollow = user?.isFollow;
  const [isEditPopup, setIsEditPopup] = useState(false);

  const handleOnCloseEditPopup = useCallback(() => {
    setIsEditPopup(false);
  }, []);

  const handleOnpenEditPopup = useCallback(() => {
    setIsEditPopup(true);
  }, []);

  return (
    <>
      <Helmet defaultTitle={`${user?.fullname} (@${user?.username})`}>
        <meta name="description" content={user?.fullname} />
      </Helmet>
      {user ? (
        <div className={cx('wrapper')}>
          <div className={cx('infoMain')}>
            <Image className={cx('avatar')} src={user?.avatar || ''} />
            <div className={cx('nameWrapper')}>
              {user?.tick ? (
                <div className={cx('fullnameWrapper')}>
                  <h1 className={cx('fullname')}>{user?.username}</h1>
                  <Tooltip title="Verified" arrow placement="right">
                    <CheckIcon className={cx('checkIcon')} />
                  </Tooltip>
                </div>
              ) : (
                <h1 className={cx('fullname')}>{user?.username}</h1>
              )}
              <strong className={cx('username')}>{user?.fullname}</strong>

              <ButtonRender
                user={user}
                isEdit={isEdit}
                isFollow={isFollow}
                refetch={refetch}
                handleOnpenEditPopup={handleOnpenEditPopup}
              />
            </div>
            <ShareIcon className={cx('shareIcon')} />
          </div>
          <div className={cx('countInfos')}>
            <div className={cx('countInfos__item')}>
              <strong title="Following" className={cx('count')}>
                {numberFormat(user.followings_count)}
              </strong>
              <span className={cx('actionName')}>Following</span>
            </div>
            <div className={cx('countInfos__item')}>
              <strong title="Followers" className={cx('count')}>
                {numberFormat(user.followers_count)}
              </strong>
              <span className={cx('actionName')}>Followers</span>
            </div>
            <div className={cx('countInfos__item')}>
              <strong title="Likes" className={cx('count')}>
                {numberFormat(user.likes_count)}
              </strong>
              <span className={cx('actionName')}>Likes</span>
            </div>
          </div>
          <h2 className={cx('bio')}>{user.bio ? user.bio : 'No bio yet.'}</h2>
        </div>
      ) : (
        <SkeletonCustomize profileHeader />
      )}

      {user && <PostFeedTab userId={user?._id} />}

      <DialogCustomize open={isEditPopup} onClose={handleOnCloseEditPopup}>
        <EditProfile
          handleOnCloseEditPopup={handleOnCloseEditPopup}
          refetchInfoLogin={refetchInfoLogin}
        />
      </DialogCustomize>
    </>
  );
}

export default memo(ProfileHeaderBase);
