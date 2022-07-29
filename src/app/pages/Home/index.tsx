import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import reactIcon from 'assets/images/react-icon.svg';

const cx = classNames.bind(styles);

export function Home() {
  return (
    <div className={cx('wrapper')}>
      <img className={cx('img')} src={reactIcon} alt="react icon" />
    </div>
  );
}
