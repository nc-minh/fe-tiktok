import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';
import { useCallback, useState, memo } from 'react';

import styles from './PopupLogin.module.scss';
import Button from '../../components/Button';
import { ReactComponent as QRcodeIcon } from 'assets/icons/qrcode.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/socialNetwork/facebook.svg';
import { ReactComponent as GoogleIcon } from 'assets/icons/socialNetwork/google.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/socialNetwork/twitter.svg';
import { ReactComponent as LineIcon } from 'assets/icons/socialNetwork/line.svg';
import { ReactComponent as KakaoTalkIcon } from 'assets/icons/socialNetwork/kakaoTalk.svg';
import { ReactComponent as AppleIcon } from 'assets/icons/socialNetwork/apple.svg';
import { ReactComponent as InstagramIcon } from 'assets/icons/socialNetwork/instagram.svg';
import { ReactComponent as BackIcon } from 'assets/icons/arrowLeft.svg';
import LoginForm from '../LoginForm';
import SnackbarCustomize from 'app/components/SnackbarCustomize';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function PopupLogin() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleBackToPopup = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin, setIsLogin]);

  const handleOpenSnackbar = useCallback(() => {
    setOpenSnackbar(true);
  }, [openSnackbar, setOpenSnackbar]);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, [openSnackbar, setOpenSnackbar]);
  return (
    <>
      <Helmet defaultTitle="Login | Tiktok">
        <meta name="description" content="Login | Tiktok" />
      </Helmet>
      {!isLogin && (
        <span onClick={handleBackToPopup} className={cx('backIconWrapper')}>
          <BackIcon className={cx('backIcon')} />
        </span>
      )}

      {isLogin ? (
        <div className={cx('wrapper')}>
          <h2 className={cx('title')}>{t('btn.loginToTiktok')}</h2>
          <Button onClick={handleOpenSnackbar} leftIcon={<QRcodeIcon />} box>
            {t('btn.use', { method: 'QR code' })}
          </Button>
          <Button onClick={() => setIsLogin(false)} leftIcon={<UserIcon />} box>
            {t('btn.use', { method: 'phone / email / username' })}
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<FacebookIcon />} box>
            {t('btn.continueWith', { text: 'Facebook' })}
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<GoogleIcon />} box>
            {t('btn.continueWith', { text: 'Google' })}
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<TwitterIcon />} box>
            {t('btn.continueWith', { text: 'Twitter' })}
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<LineIcon />} box>
            {t('btn.continueWith', { text: 'LINE' })}
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<KakaoTalkIcon />} box>
            {t('btn.continueWith', { text: 'KakaoTalk' })}
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<AppleIcon />} box>
            {t('btn.continueWith', { text: 'Apple' })}
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<InstagramIcon />} box>
            {t('btn.continueWith', { text: 'Instagram' })}
          </Button>
        </div>
      ) : (
        <LoginForm />
      )}
      <SnackbarCustomize
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        content={t('text.notSuportThisMethod')}
        type="info"
      />
    </>
  );
}

export default memo(PopupLogin);
