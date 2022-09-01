import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Private.module.scss';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';

const cx = classNames.bind(styles);

function Private() {
  const { t } = useTranslation();
  const { username = '' } = useParams();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <LockIcon />
        <h5 className={cx('text')}>{t('text.privateLikeAcc')}</h5>
        <p className={cx('desc')}>{t('text.privateLikeVideo', { username })}</p>
      </div>
    </div>
  );
}

export default memo(Private);
