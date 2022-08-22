/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrowRight.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

import styles from './MediaDetail.module.scss';
import { RootState } from 'stores';
import MediaContainer from 'app/containers/MediaContainer';
import MediaDetailContent from 'app/containers/MediaDetailContent';
import { ResponsePostType } from 'types/Post';
import { UserInfo } from 'types/User';
import { log } from 'console';

const cx = classNames.bind(styles);

interface MediaOfLayoutFullType {
  data: {
    post: ResponsePostType[];
    user: UserInfo;
  };
  mode?: string;
  next?: boolean;
}

export function MediaDetail() {
  const navigate = useNavigate();
  const { username, mediaId } = useParams();

  const mediaOfLayoutFull: MediaOfLayoutFullType = useSelector(
    (state: RootState) => state.mediaOfLayoutFull.mediaOfLayoutFull,
  );

  const [posts, setPosts] = useState<ResponsePostType[]>([]);
  const [userOfPost, setUserOfPost] = useState<UserInfo>();
  const [currentMedia, setCurrentMedia] = useState<any>();

  useEffect(() => {
    if (mediaOfLayoutFull?.data?.post.length > 0) {
      setPosts(mediaOfLayoutFull?.data?.post);
    }

    if (mediaOfLayoutFull.mode === 'profile') {
      setUserOfPost(mediaOfLayoutFull?.data?.user);
    }
  }, [mediaOfLayoutFull]);

  useEffect(() => {
    if (posts && userOfPost && mediaOfLayoutFull.mode === 'profile') {
      let i = 0;
      posts.forEach((item: any, index: number) => {
        if (item._id === mediaId) {
          i = index;
          return;
        }
      });

      setCurrentMedia({ index: i, data: posts && posts[i], user: userOfPost });
    }
  }, [mediaOfLayoutFull, posts, userOfPost]);

  const handleUp = useCallback(() => {
    setCurrentMedia((pre: any) => {
      if (pre.index === 0) {
        return {
          index: pre.index,
          data: posts[pre.index],
        };
      }

      setTimeout(() => {
        navigate(`/@${username}/video/${posts[pre.index - 1]?._id}`);
      }, 0);
      return {
        index: pre.index - 1,
        data: posts[pre.index - 1],
      };
    });
  }, [currentMedia, setCurrentMedia]);

  const handleDown = useCallback(() => {
    setCurrentMedia((pre: any) => {
      if (pre.index === posts.length - 1) {
        return {
          index: pre.index,
          data: posts[pre.index],
        };
      }

      setTimeout(() => {
        navigate(`/@${username}/video/${posts[pre.index + 1]?._id}`);
      }, 0);
      return {
        index: pre.index + 1,
        data: posts[pre.index + 1],
      };
    });
  }, [currentMedia, setCurrentMedia]);

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'ArrowUp') {
        handleUp();
      }

      if (event.code === 'ArrowDown') {
        handleDown();
      }
    };
    document.addEventListener('keyup', listener);
    return () => {
      document.removeEventListener('keyup', listener);
    };
  }, [handleUp, handleDown, setCurrentMedia]);

  const handleCloseMediaDetail = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <>
      <Helmet defaultTitle="Tiktok View | TikTok">
        <meta name="description" content="Tiktok View | TikTok" />
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('videoContainer')}>
          {currentMedia && <MediaContainer media={currentMedia?.data} />}
          <div className={cx('videoControls')}>
            <button onClick={handleUp} className={cx('controlsBtn')}>
              <ArrowIcon />
            </button>
            <button onClick={handleDown} className={cx('controlsBtn', 'down')}>
              <ArrowIcon />
            </button>
          </div>

          <div className={cx('closeMedia')} onClick={handleCloseMediaDetail}>
            <CloseIcon className={cx('closeIcon')} />
          </div>
        </div>
        <div className={cx('contentContainer')}>
          {userOfPost && currentMedia && (
            <MediaDetailContent
              postInfo={currentMedia?.data}
              userOfPost={userOfPost}
            />
          )}
        </div>
      </div>
    </>
  );
}
