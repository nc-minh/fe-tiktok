/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames/bind';
import Media from './components/Media';
import MediaCaption from './components/MediaCaption';
import Right from './components/Right';

import styles from './MediaItem.module.scss';

const cx = classNames.bind(styles);

interface Props {
  media?: any;
}
function MediaItem(props: Props) {
  const { media } = props;

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <Media media={media} />
        <Right className={cx('right')} media={media} />
        <MediaCaption className={cx('mediaCaption')} media={media} />
      </div>
    </div>
  );
}

export default MediaItem;
