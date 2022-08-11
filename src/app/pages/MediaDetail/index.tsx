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

const cx = classNames.bind(styles);

export function MediaDetail() {
  const navigate = useNavigate();
  const { username, mediaId } = useParams();

  const mediaOfLayoutFull: any = useSelector(
    (state: RootState) => state.mediaOfLayoutFull.mediaOfLayoutFull,
  );

  const [currentMedia, setCurrentMedia] = useState<any>(() => {
    let i = 0;
    mediaOfLayoutFull?.post &&
      mediaOfLayoutFull?.post.forEach((item: any, index: number) => {
        if (item._id === mediaId) {
          i = index;
          return;
        }
      });
    return {
      index: i,
      data: mediaOfLayoutFull?.post && mediaOfLayoutFull?.post[i],
      user: mediaOfLayoutFull?.user,
    };
  });

  const handleUp = useCallback(() => {
    setCurrentMedia((pre: any) => {
      if (pre.index === 0) {
        return {
          index: pre.index,
          data: mediaOfLayoutFull?.post[pre.index],
        };
      }
      navigate(
        `/@${username}/video/${mediaOfLayoutFull?.post[pre.index - 1]._id}`,
      );
      return {
        index: pre.index - 1,
        data: mediaOfLayoutFull?.post[pre.index - 1],
      };
    });
  }, [currentMedia, setCurrentMedia]);

  const handleDown = useCallback(() => {
    setCurrentMedia((pre: any) => {
      if (pre.index === mediaOfLayoutFull?.post.length - 1) {
        return {
          index: pre.index,
          data: mediaOfLayoutFull?.post[pre.index],
          user: mediaOfLayoutFull?.user,
        };
      }
      navigate(
        `/@${username}/video/${mediaOfLayoutFull?.post[pre.index + 1]._id}`,
      );

      return {
        index: pre.index + 1,
        data: mediaOfLayoutFull?.post[pre.index + 1],
        user: mediaOfLayoutFull?.user,
      };
    });
  }, [currentMedia, setCurrentMedia]);

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'ArrowUp') {
        handleUp();
        event.preventDefault();
      }

      if (event.code === 'ArrowDown') {
        handleDown();
        event.preventDefault();
      }
    };
    document.addEventListener('keyup', listener);
    return () => {
      document.removeEventListener('keyup', listener);
    };
  }, []);

  const handleCloseMediaDetail = useCallback(() => {
    navigate('/');
  }, []);

  console.log(currentMedia?.data);

  return (
    <>
      <Helmet defaultTitle="Tiktok View | TikTok">
        <meta name="description" content="Tiktok View | TikTok" />
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('videoContainer')}>
          <MediaContainer media={currentMedia?.data} />
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
          <MediaDetailContent postInfo={currentMedia?.data} />
        </div>
      </div>
    </>
  );
}
