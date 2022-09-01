import classNames from 'classnames/bind';
import { useCallback, useMemo, useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './PostItem.module.scss';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import Image from 'app/components/Image';
import { ResponsePostType } from 'types/Post';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

interface Props {
  item: ResponsePostType;
}
function PostItem({ item }: Props) {
  const { t } = useTranslation();
  const { username = '' } = useParams();
  const [autoplay, setAutoplay] = useState(false);
  const ref = useRef<any>(null);
  const checkType: string = useMemo(() => {
    if (item.media_url.endsWith('.mp4')) {
      return 'Video';
    } else if (item.media_url !== '') {
      return 'Image';
    }
    return 'Text';
  }, [item]);

  const onMouseOver = useCallback(() => {
    setAutoplay(true);
    if (ref.current) {
      ref.current.play();
    }
  }, [setAutoplay, autoplay]);

  const onMouseOut = useCallback(() => {
    setAutoplay(false);
    if (ref.current) {
      ref.current.pause();
    }
  }, [setAutoplay, autoplay]);

  if (checkType === 'Video') {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <Link
            to={`/@${username}/video/${item._id}`}
            className={cx('mediaWrapper')}
          >
            <video
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              className={cx('video')}
              ref={ref}
              muted={true}
              src={item.media_url}
            >
              {t('text.notsupport')}
            </video>
            <div className={cx('view')}>
              <PlayIcon className={cx('playIcon')} />
              <strong className={cx('viewCount')}>{item.view_count}</strong>
            </div>
          </Link>

          <div className={cx('desc')}>{item.contents}</div>
        </div>
      </div>
    );
  }
  if (checkType === 'Image') {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <Link
            to={`/@${username}/video/${item._id}`}
            className={cx('mediaWrapper')}
          >
            <Image className={cx('image')} src={item.media_url} />
            <div className={cx('view')}>
              <PlayIcon className={cx('playIcon')} />
              <strong className={cx('viewCount')}>{item.view_count}</strong>
            </div>
          </Link>

          <div className={cx('desc')}>{item.contents}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <Link
          to={`/@${username}/video/${item._id}`}
          className={cx('mediaWrapper')}
        >
          <p className={cx('text')}>{item.contents}</p>
          <div className={cx('view')}>
            <PlayIcon className={cx('playIcon')} />
            <strong className={cx('viewCount')}>{item.view_count}</strong>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default memo(PostItem);
