import { useTranslation } from 'react-i18next';
import { isImage, isVideo } from 'utils/constants';
import classNames from 'classnames/bind';

import styles from './Media.module.scss';
import Image from 'app/components/Image';

const cx = classNames.bind(styles);

interface Props {
  media?: any;
}
function Media(props: Props) {
  const { t } = useTranslation();
  const { media } = props;

  if (isVideo(media?.media_url)) {
    return (
      <div className={cx('wrapper')}>
        <video className={cx('media')} src={media?.media_url}>
          {t('text.notsupport')}
        </video>
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
