import classNames from 'classnames/bind';

import styles from './PopupLogin.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function PopupLogin() {
  return (
    <div className={cx('wrapper')}>
      <h2>Sign up for TikTok</h2>
      <Button outline>Use phone or email</Button>
    </div>
  );
}

export default PopupLogin;
