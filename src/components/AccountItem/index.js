import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from '../Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);
function AccountItem() {
    return (
      <div className={cx('wrapper')}>
        <Image
          className={cx('avatar')}
          src="https://res.cloudinary.com/domvksfsk/image/upload/v1653965177/images/b929b8c81c3b7ebe8562ce70d3e85023193dc806.png"
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
