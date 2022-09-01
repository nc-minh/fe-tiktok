import { useTranslation } from 'react-i18next';
import { isImage, isVideo } from 'utils/constants';
import classNames from 'classnames/bind';
import { useCallback, useRef, useState } from 'react';

import styles from './Media.module.scss';
import Image from 'app/components/Image';
import PlayIcon from 'app/Mobiles/assets/icons/play.png';

const cx = classNames.bind(styles);

interface Props {
  media?: any;
}
function Media(props: Props) {
  const ref = useRef<any>(null);
  const { t } = useTranslation();
  const { media } = props;

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    console.log('handlePlay on');
    if (ref.current) {
      ref.current.play();
    }
    setIsPlaying(true);
  }, [isPlaying, setIsPlaying]);

  const handleStop = useCallback(() => {
    console.log('handlePlay off');
    if (ref.current && isPlaying) {
      ref.current.pause();
    }

    if (ref.current && !isPlaying) {
      ref.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  if (isVideo(media?.media_url)) {
    return (
      <div className={cx('wrapper')}>
        <video
          className={cx('media')}
          src={media?.media_url}
          ref={ref}
          onClick={handleStop}
          loop
        >
          {t('text.notsupport')}
        </video>
        {!isPlaying && (
          <div className={cx('playWrapper')} onClick={handlePlay}>
            <Image className={cx('play')} src={PlayIcon} />
          </div>
        )}
      </div>
    );
  }

  if (isImage(media?.media_url)) {
    return (
      <div className={cx('wrapper')}>
        <Image className={cx('media')} src={media?.media_url} />
      </div>
    );
  }

  return (
    <div className={cx('wrapper')}>
      <div>{media?.contents}</div>
    </div>
  );
}

export default Media;
