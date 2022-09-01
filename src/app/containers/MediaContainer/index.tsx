import classNames from 'classnames/bind';
import { memo } from 'react';

import styles from './MediaContainer.module.scss';
import { isImage, isVideo } from 'utils/constants';
import Image from 'app/components/Image';

const cx = classNames.bind(styles);

interface Props {
  media: any;
}

function MediaContainer({ media }: Props) {
  if (!media) {
    return <div>wrong format</div>;
  }
  if (isVideo(media?.media_url)) {
    return (
      <div className={cx('wrapper')}>
        <video
          className={cx('media')}
          src={media?.media_url}
          controls
          autoPlay
        ></video>
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
      <div className={cx('contents')}>{media.contents}</div>
    </div>
  );
}

export default memo(MediaContainer);
