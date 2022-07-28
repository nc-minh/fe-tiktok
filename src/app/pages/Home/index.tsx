import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import styles from './Home.module.scss';
import reactIcon from 'assets/images/react-icon.svg';
import Button from 'app/components/Button';
import { incrementActions } from './slice';

const cx = classNames.bind(styles);

export function Home() {
  const dispath = useDispatch();

  const Increment = () => {
    dispath(incrementActions.counter(1));
  };

  return (
    <div className={cx('wrapper')}>
      <img className={cx('img')} src={reactIcon} alt="react icon" />
      <Button onClick={Increment}>Increment</Button>
    </div>
  );
}
