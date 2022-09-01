import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import styles from './NoContent.module.scss';
import { ReactComponent as UserIcon } from 'assets/icons/user-thin.svg';

const cx = classNames.bind(styles);

function NotContent() {
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <UserIcon className={cx('icon')} />
        <h5 className={cx('text')}>{t('text.noContent')}</h5>
        <p className={cx('desc')}>
          {`This user has not published any videos.`}
        </p>
      </div>
    </div>
  );
}

export default memo(NotContent);
