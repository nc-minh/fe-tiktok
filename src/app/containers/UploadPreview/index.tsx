/* eslint-disable @typescript-eslint/no-unused-expressions */
import classNames from 'classnames/bind';
import {
  useCallback,
  useMemo,
  useState,
  memo,
  useEffect,
  useLayoutEffect,
} from 'react';

import styles from './UploadPreview.module.scss';
import { isImage, isVideo } from 'utils/constants';
import Image from 'app/components/Image';
import { ReactComponent as IconbarRight } from 'assets/icons/iconbarRight.svg';
import musicSymbols1Icon from 'assets/icons/musicSymbols-1.png';
import musicSymbols2Icon from 'assets/icons/musicSymbols-2.png';
import musicSymbols3Icon from 'assets/icons/musicSymbols-3.png';
import { ReactComponent as MusicIcon } from 'assets/icons/musicIcon.svg';
import { ReactComponent as CircleCheckIcon } from 'assets/icons/circleCheckIcon.svg';
import DialogCustomize from 'app/components/DialogCustomize';
import PopupBackorContinue from '../../components/PopupBackorContinue';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

interface Props {
  file?: File;
  caption?: string;
  onChangeVideo?: () => void;
}
function UploadPreview({ file, caption, onChangeVideo = () => {} }: Props) {
  const userLogin: any = useSelector(
    (state: RootState) => state.globalState.user,
  );
  const { t } = useTranslation();
  const { avatar, username } = userLogin;
  const [isChangeMedia, setIsChangeMedia] = useState(false);
  const [mediapre, setMediapre] = useState('');
  const fileName = useMemo(() => {
    return file?.name || '';
  }, [file]);

  useLayoutEffect(() => {
    if (file) {
      const value = URL.createObjectURL(file);
      setMediapre(value);
    }
  }, [file]);

  useEffect(() => {
    return () => {
      mediapre && URL.revokeObjectURL(mediapre);
    };
  }, [mediapre, setMediapre]);

  const handleOnCloseDialog = useCallback(() => {
    setIsChangeMedia(false);
  }, [setIsChangeMedia, isChangeMedia]);

  const handleOnOpenDialog = useCallback(() => {
    setIsChangeMedia(true);
  }, [setIsChangeMedia, isChangeMedia]);

  if (isVideo(fileName)) {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <div className={cx('content')}>
            <video autoPlay className={cx('video')} src={mediapre} controls />

            <div className={cx('header')}>
              <p>{t('text.following')}</p>
              <p>{t('text.forYou')}</p>
            </div>

            <div className={cx('actions')}>
              <IconbarRight />
            </div>

            <Image className={cx('avatar')} src={avatar} />

            <div className={cx('music')}>
              <Image className={cx('avatarMusic', 'loading-2')} src={avatar} />
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

            <div className={cx('metaData')}>
              <div className={cx('metaData-username')}>@{username}</div>
              <div className={cx('metaData-caption')}>{caption}</div>
              <div className={cx('metaData-sound')}>
                <MusicIcon className={cx('metaData-icon')} />
                <div className={cx('metaData-soundTextWrapper')}>
                  <div
                    className={cx('metaData-soundText', 'sliderSoundText')}
                  >{`Original sound - Original sound - @${username}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx('changeVideoBtn')}>
          <div className={cx('changeVideoRight')}>
            <CircleCheckIcon className={cx('changeVideoIcon')} />
            <p className={cx('changeVideoFilename')}>{fileName}</p>
          </div>
          <div onClick={handleOnOpenDialog} className={cx('changeVideoText')}>
            {t('text.changeVideo')}
          </div>
        </div>

        {/* dialog back to choose media */}
        <DialogCustomize open={isChangeMedia} onClose={handleOnCloseDialog}>
          <PopupBackorContinue
            onDiscard={onChangeVideo}
            onClosePopup={handleOnCloseDialog}
            title="Replace this video?"
            desc="Caption and video settings will still be saved."
            okBtn="Replace"
            cancelBtn="Continue editing"
          />
        </DialogCustomize>
      </div>
    );
  }

  if (isImage(fileName)) {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <div className={cx('content')}>
            <Image className={cx('video')} src={mediapre} />

            <div className={cx('header')}>
              <p>{t('text.following')}</p>
              <p>{t('text.forYou')}</p>
            </div>

            <div className={cx('actions')}>
              <IconbarRight />
            </div>

            <Image className={cx('avatar')} src={avatar} />

            <div className={cx('music')}>
              <Image className={cx('avatarMusic', 'loading-2')} src={avatar} />
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

            <div className={cx('metaData')}>
              <div className={cx('metaData-username')}>@{username}</div>
              <div className={cx('metaData-caption')}>{caption}</div>
              <div className={cx('metaData-sound')}>
                <MusicIcon className={cx('metaData-icon')} />
                <div className={cx('metaData-soundTextWrapper')}>
                  <div
                    className={cx('metaData-soundText', 'sliderSoundText')}
                  >{`Original sound - Original sound - @${username}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx('changeVideoBtn')}>
          <div className={cx('changeVideoRight')}>
            <CircleCheckIcon className={cx('changeVideoIcon')} />
            <p className={cx('changeVideoFilename')}>{fileName}</p>
          </div>
          <div onClick={handleOnOpenDialog} className={cx('changeVideoText')}>
            {t('text.changeVideo')}
          </div>
        </div>

        {/* dialog back to choose media */}
        <DialogCustomize open={isChangeMedia} onClose={handleOnCloseDialog}>
          <PopupBackorContinue
            onDiscard={onChangeVideo}
            onClosePopup={handleOnCloseDialog}
            title="Replace this video?"
            desc="Caption and video settings will still be saved."
            okBtn="Replace"
            cancelBtn="Continue editing"
          />
        </DialogCustomize>
      </div>
    );
  }

  return <div className={cx('wrapper')}>Format Error</div>;
}

export default memo(UploadPreview);
