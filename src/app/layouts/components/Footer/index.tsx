import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export function Footer() {
  const number: any = useSelector(
    (state: RootState) => state.counter.increment,
  );

  return (
    <div className={cx('wrapper')}>
      <h3>This is footer</h3>
      <strong>{number}</strong>
    </div>
  );
}
