import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';
import { Alert, Snackbar } from '@mui/material';
import { useCallback, useState } from 'react';

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

const cx = classNames.bind(styles);

function PopupLogin() {
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
          <h2 className={cx('title')}>Log in to TikTok</h2>
          <Button onClick={handleOpenSnackbar} leftIcon={<QRcodeIcon />} box>
            Use QR code
          </Button>
          <Button onClick={() => setIsLogin(false)} leftIcon={<UserIcon />} box>
            Use phone / email / username
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<FacebookIcon />} box>
            Continue with Facebook
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<GoogleIcon />} box>
            Continue with Google
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<TwitterIcon />} box>
            Continue with Twitter
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<LineIcon />} box>
            Continue with LINE
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<KakaoTalkIcon />} box>
            Continue with KakaoTalk
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<AppleIcon />} box>
            Continue with Apple
          </Button>
          <Button onClick={handleOpenSnackbar} leftIcon={<InstagramIcon />} box>
            Continue with Instagram
          </Button>
        </div>
      ) : (
        <LoginForm />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: '100%', fontSize: '1.4rem' }}
        >
          Login using this method is not supported!
        </Alert>
      </Snackbar>
    </>
  );
}

export default PopupLogin;
