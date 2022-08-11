import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CommentItem.module.scss';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import Image from 'app/components/Image';
import { CommentInfoType } from 'types/Comment';

const cx = classNames.bind(styles);

interface Props {
  commentInfo: CommentInfoType;
}
function CommentItem({ commentInfo }: Props) {
  const createdAt = commentInfo.created_at.getTime();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <Link to={'/'} className={cx('imgWrapper')}>
          <Image className={cx('img')} src={commentInfo.avatar} />
        </Link>
        <div className={cx('userInfo')}>
          <Link to={'/'} className={cx('fullname')}>
            {commentInfo.fullname}
          </Link>
          <p className={cx('cmtContent')}>{commentInfo.contents}</p>
          <span className={cx('time')}>{`${createdAt} ago`}</span>
        </div>
        <div className={cx('action')}>
          <HeartIcon className={cx('actionIcon')} />
          <strong className={cx('actionCount')}>
            {commentInfo.comment_reaction_count}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
