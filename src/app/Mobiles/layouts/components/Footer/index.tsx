import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { ReactComponent as UploadHomeIcon } from 'app/Mobiles/assets/icons/uploadHome.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/homeActive.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as InboxIcon } from 'assets/icons/inbox.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
}
function Footer(props: Props) {
  const { className } = props;
  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('container')}>
        <HomeIcon className={cx('icon')} />
        <SearchIcon className={cx('icon')} />
        <UploadHomeIcon className={cx('icon', 'upload')} />
        <InboxIcon className={cx('icon')} />
        <UserIcon className={cx('icon', 'resize')} />
      </div>
    </div>
  );
}

export default Footer;
