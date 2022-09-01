import classNames from 'classnames/bind';
import { PostTrends } from 'types/Post';

import Header from './components/Header';
import Media from './components/Media';
import styles from './RecommendMediaItem.module.scss';

const cx = classNames.bind(styles);

interface Props {
  post: PostTrends;
}
function RecommendMediaItem(props: Props) {
  const { post } = props;

  const {
    contents,
    user_id,
    comment_count,
    media_url,
    reaction_count,
    isFollow,
    isReaction,
    _id,
  } = post;

  return (
    <div className={cx('wrapper')}>
      <Header
        contents={contents}
        fullname={user_id?.fullname}
        username={user_id?.username}
        avatar={user_id?.avatar}
        isFollow={isFollow}
        userId={user_id._id}
        tick={user_id?.tick}
      />
      <Media
        comment_count={comment_count}
        contents={contents}
        media_url={media_url}
        reaction_count={reaction_count}
        share_count={0}
        isReaction={isReaction}
        post_id={_id}
      />
    </div>
  );
}

export default RecommendMediaItem;
