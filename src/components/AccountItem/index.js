import propTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Image from '../Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);
function AccountItem({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
      <div className={cx('info')}>
        <strong className={cx('name')}>
          <strong>{data.full_name}</strong>
          {data.tick && <FontAwesomeIcon className={cx('checkIcon')} icon={faCheckCircle} />}
        </strong>
        <span className={cx('username')}>{data.nickname}</span>
      </div>
    </Link>
  );
}

AccountItem.propTypes = {
  data: propTypes.object.isRequired,
};

export default AccountItem;
