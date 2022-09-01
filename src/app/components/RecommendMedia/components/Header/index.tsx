import Button from 'app/components/Button';
import Image from 'app/components/Image';
import { globalStateActions } from 'app/layouts/slice';
import classNames from 'classnames/bind';
import { useFollow } from 'mutations/follow';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

interface Props {
  username?: string;
  fullname?: string;
  contents?: string;
  avatar?: string;
  isFollow?: boolean;
  userId?: string;
  tick?: boolean;
}
function Header(props: Props) {
  const {
    username = '',
    fullname = '',
    contents = '',
    avatar = '',
    isFollow = false,
    userId = '',
    tick = false,
  } = props;

  const { t } = useTranslation();
  const [isFollowed, setIsFollowed] = useState(isFollow);
  const follow = useFollow();
  const dispath = useDispatch();

  const handleFollow = useCallback(() => {
    follow.mutate(
      { follow_id: userId },
      {
        onSuccess: data => {
          if (data?.unfollow) {
            setIsFollowed(false);
          } else {
            setIsFollowed(true);
          }
        },
        onError: (error: any) => {
          if (error?.name === 'SpamError') {
            dispath(
              globalStateActions.snackbarAction({
                message: 'Can not follow yourself',
                status: true,
                type: 'error',
              }),
            );
          }
        },
      },
    );
  }, []);
  return (
    <header className={cx('wrapper')}>
      <div className={cx('container')}>
        <Link to={`/@${username}`} className={cx('avatarWrapper')}>
          <Image className={cx('avatar')} src={avatar} />
        </Link>
        <div className={cx('middle')}>
          <Link to={`/@${username}`} className={cx('nameWrapper')}>
            <h2 className={cx('username')}>{username}</h2>
            {tick && <CheckIcon className={cx('icon')} />}
            <p className={cx('fullname')}>{fullname}</p>
          </Link>
          <p className={cx('postContent')}>{contents}</p>
        </div>
        <div className={cx('btnWrapper')}>
          {!isFollowed ? (
            <Button
              className={cx('btn')}
              outline
              onClick={handleFollow}
              loading={follow.isLoading}
            >
              {t('btn.follow')}
            </Button>
          ) : (
            <Button
              className={cx('btn', 'unfollow')}
              outline
              onClick={handleFollow}
              loading={follow.isLoading}
            >
              {t('btn.unfollow')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
