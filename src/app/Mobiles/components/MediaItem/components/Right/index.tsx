import classNames from 'classnames/bind';

import styles from './Right.module.scss';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import { ReactComponent as ShareIcon } from 'app/Mobiles/assets/icons/share.svg';
import Image from 'app/components/Image';

const cx = classNames.bind(styles);

interface Props {
  media?: any;
  className?: string;
}
function Right(props: Props) {
  const { media, className } = props;

  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('avatarWrapper')}>
        <Image className={cx('avatar')} src={media?.user_id?.avatar} />
      </div>
      <div className={cx('action')}>
        <div className={cx('iconWrapper')}>
          <HeartIcon className={cx('icon')} />
          <span className={cx('number')}>{media?.reaction_count}</span>
        </div>
        <div className={cx('iconWrapper')}>
          <CommentIcon className={cx('icon')} />
          <span className={cx('number')}>{media?.comment_count}</span>
        </div>
        <div className={cx('iconWrapper')}>
          <ShareIcon className={cx('icon')} />
          <span className={cx('number')}>0</span>
        </div>
      </div>
    </div>
  );
}

export default Right;
