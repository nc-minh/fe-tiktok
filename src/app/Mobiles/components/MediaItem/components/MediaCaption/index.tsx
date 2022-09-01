import Image from 'app/components/Image';
import classNames from 'classnames/bind';

import styles from './MediaCaption.module.scss';
import { ReactComponent as MusicIcon } from 'assets/icons/musicIcon.svg';
import { ReactComponent as TickIcon } from 'assets/icons/check.svg';
import musicSymbols1Icon from 'assets/icons/musicSymbols-1.png';
import musicSymbols2Icon from 'assets/icons/musicSymbols-2.png';
import musicSymbols3Icon from 'assets/icons/musicSymbols-3.png';

const cx = classNames.bind(styles);

interface Props {
  media?: any;
  className?: string;
}
function MediaCaption(props: Props) {
  const { media, className } = props;

  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('container')}>
        <div className={cx('infoWrapper')}>
          <div className={cx('nameWrapper')}>
            <strong className={cx('username')}>
              {`@${media?.user_id?.username}`}
            </strong>
            {media?.user_id?.tick && <TickIcon />}
          </div>
          <h1 className={cx('contents')}>{media?.contents}</h1>
          <div className={cx('musicWrapper')}>
            <MusicIcon className={cx('icon')} />
            <div className={cx('overflow')}>
              <div
                className={cx('musicName', 'sliderSoundText-2')}
              >{`Original sound - Original sound @${media?.user_id?.username}`}</div>
            </div>
          </div>
        </div>
        <div className={cx('mediaWrapper')}>
          <div className={cx('avatarWrapper')}>
            <Image
              className={cx('avatar', 'loading-2')}
              src={media?.user_id?.avatar}
            />
          </div>
          <div className={cx('musicSymbols')}>
            <Image
              className={cx('icon1', 'musicSymbolsIcon1')}
              src={musicSymbols1Icon}
            />
            <Image
              className={cx('icon2', 'musicSymbolsIcon1')}
              src={musicSymbols2Icon}
            />
            <Image
              className={cx('icon3', 'musicSymbolsIcon1')}
              src={musicSymbols3Icon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaCaption;
