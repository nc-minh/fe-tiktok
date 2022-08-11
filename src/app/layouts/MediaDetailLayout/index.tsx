import classNames from 'classnames/bind';

import styles from './MediaDetailLayout.module.scss';

interface Props {
  children: JSX.Element;
}
const cx = classNames.bind(styles);

function MediaDetailLayout({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default MediaDetailLayout;
