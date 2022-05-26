import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);
function AccountItem() {
    return (
      <div className={cx('wrapper')}>
        <img
          className={cx('avatar')}
          src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6cffe99a6cacda63e162939903ac2a83~c5_300x300.webp?x-expires=1653706800&x-signature=tkluKKWJSZ5HOGHwn%2F4SLuJELOk%3D"
          alt="Chi"
        />
        <div className={cx('info')}>
          <strong className={cx('name')}>
            <strong>Chi.xinhgai</strong>
            <FontAwesomeIcon className={cx('checkIcon')} icon={faCheckCircle} />
          </strong>
          <span className={cx('username')}>chi.xinhgai</span>
        </div>
      </div>
    );
}

export default AccountItem;
