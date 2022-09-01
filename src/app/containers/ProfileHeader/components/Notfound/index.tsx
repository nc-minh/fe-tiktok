import classNames from 'classnames/bind';

import styles from './NotFound.module.scss';
import { ReactComponent as UserThinIcon } from 'assets/icons/user-thin.svg';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <UserThinIcon className={cx('icon')} />
        <h3 className={cx('title')}>{t('text.couldnotFindUser')}</h3>
        <p className={cx('subtitle')}>{t('text.lookingForVideos')}</p>
      </div>
    </div>
  );
}

export default NotFound;
