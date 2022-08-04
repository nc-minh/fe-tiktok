import classNames from 'classnames/bind';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './PostItem.module.scss';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import Image from 'app/components/Image';

const cx = classNames.bind(styles);

interface Props {
  item?: any;
}
function PostItem({ item }: Props) {
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
      <Link
        to="/"
        className={cx('wrapper', 'col', 'pc-l-2', 'l-3', 'm-4', 'c-6')}
      >
        <div className={cx('content')}>
          <video
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className={cx('video')}
            ref={ref}
            muted={true}
          >
            <source src={item.media_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={cx('view')}>
            <PlayIcon className={cx('playIcon')} />
            <strong className={cx('viewCount')}>{item.view_count}</strong>
          </div>
        </div>
      </Link>
    );
  }
  if (checkType === 'Image') {
    return (
      <Link
        to="/"
        className={cx('wrapper', 'col', 'pc-l-2', 'l-3', 'm-4', 'c-6')}
      >
        <div className={cx('content')}>
          <Image className={cx('image')} src={item.media_url} />
          <div className={cx('view')}>
            <PlayIcon className={cx('playIcon')} />
            <strong className={cx('viewCount')}>{item.view_count}</strong>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className={cx('wrapper', 'col', 'pc-l-2', 'l-3', 'm-4', 'c-6')}
    >
      <div className={cx('content')}>
        <p className={cx('text')}>{item.contents}</p>
        <div className={cx('view')}>
          <PlayIcon className={cx('playIcon')} />
          <strong className={cx('viewCount')}>{item.view_count}</strong>
        </div>
      </div>
    </Link>
  );
}

export default PostItem;
