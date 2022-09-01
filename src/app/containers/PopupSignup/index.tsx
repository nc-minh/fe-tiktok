import classNames from 'classnames/bind';
import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useCallback, useState, memo } from 'react';

import styles from './PopupLogin.module.scss';
import Button from '../../components/Button';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/socialNetwork/facebook.svg';
import { ReactComponent as GoogleIcon } from 'assets/icons/socialNetwork/google.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/socialNetwork/twitter.svg';
import { ReactComponent as LineIcon } from 'assets/icons/socialNetwork/line.svg';
import { ReactComponent as KakaoTalkIcon } from 'assets/icons/socialNetwork/kakaoTalk.svg';
import { ReactComponent as AppleIcon } from 'assets/icons/socialNetwork/apple.svg';
import { ReactComponent as InstagramIcon } from 'assets/icons/socialNetwork/instagram.svg';
import { ReactComponent as BackIcon } from 'assets/icons/arrowLeft.svg';
import SignupForm from 'app/containers/SignupForm';
import SnackbarCustomize from 'app/components/SnackbarCustomize';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function PopupSignup() {
  const { t } = useTranslation();
  const [isSignup, setIsSignup] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleBackToPopup = useCallback(() => {
    setIsSignup(!isSignup);
  }, [isSignup, setIsSignup]);

  const handleOpenSnackbar = useCallback(() => {
    setOpenSnackbar(true);
  }, [openSnackbar, setOpenSnackbar]);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, [openSnackbar, setOpenSnackbar]);
  return (
    <>
      <Helmet defaultTitle="Sign up | Tiktok">
        <meta name="description" content="Sign up | Tiktok" />
      </Helmet>

      {!isSignup && (
        <span onClick={handleBackToPopup} className={cx('backIconWrapper')}>
          <BackIcon className={cx('backIcon')} />
        </span>
      )}
      {isSignup ? (
        <div className={cx('wrapper')}>
          <h2 className={cx('title')}>{t('btn.signupForTiktok')}</h2>
          <Button
            leftIcon={<UserIcon />}
            onClick={() => setIsSignup(false)}
            box
          >
            {t('btn.use', { method: 'phone or email' })}
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
        <SignupForm />
      )}
      <Typography className={cx('policy')}>
        By continuing, you agree to TikTok's{' '}
        <a className={cx('link')} href="/">
          Terms of Service
        </a>{' '}
        and confirm that you have read TikTok's{' '}
        <a className={cx('link')} href="/">
          Privacy Policy
        </a>
        .
      </Typography>
      <SnackbarCustomize
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        content={t('text.notSuportThisSignupMethod')}
        type="info"
      />
    </>
  );
}

export default memo(PopupSignup);
