import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
}
function Header(props: Props) {
  const { className } = props;
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('container')}>
        <span className={cx('text')}>{t('text.following')}</span>
        <span className={cx('text', 'active')}>{t('text.forYou')}</span>
      </div>
    </div>
  );
}

export default Header;
