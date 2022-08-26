import classNames from 'classnames/bind';

import styles from './ForYou.module.scss';

const cx = classNames.bind(styles);

function ForYou() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <h1>for you</h1>
      </div>
    </div>
  );
}

export default ForYou;
