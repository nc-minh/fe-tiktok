import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { memo, useMemo } from 'react';

import styles from './CommentItem.module.scss';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import Image from 'app/components/Image';
import { CommentInfoType } from 'types/Comment';
import time_ago from 'utils/timeFormat';
import { ReactComponent as TickIcon } from 'assets/icons/check.svg';

const cx = classNames.bind(styles);

interface Props {
  commentInfo: CommentInfoType;
}
function CommentItem({ commentInfo }: Props) {
  const createdAt = useMemo(
    () => time_ago(commentInfo?.created_at),
    [commentInfo?.created_at],
  );

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <Link
          to={`/@${commentInfo?.user_id?.username}`}
          className={cx('imgWrapper')}
        >
          <Image className={cx('img')} src={commentInfo?.user_id?.avatar} />
        </Link>
        <div className={cx('userInfo')}>
          <Link
            to={`/@${commentInfo?.user_id?.username}`}
            className={cx('fullname')}
          >
            {commentInfo?.user_id?.fullname}
            {commentInfo?.user_id?.tick && <TickIcon className={cx('icon')} />}
          </Link>
          <p className={cx('cmtContent')}>{commentInfo.contents}</p>
          <span className={cx('time')}>{createdAt}</span>
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

export default memo(CommentItem);
