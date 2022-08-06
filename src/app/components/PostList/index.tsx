import classNames from 'classnames/bind';

import { useGetPostOfUser } from 'queries/post';
import { ResponsePostType } from 'types/Post';
import SkeletonCustomize from '../SkeletonCustomize';
import NotContent from './components/NoContent';
import PostItem from './components/PostItem';
import Private from './components/Private';

import styles from './PostList.module.scss';

const postListLike: any = undefined;

const cx = classNames.bind(styles);

interface Props {
  type: string;
  userId: string;
}
function PostList({ type, userId }: Props) {
  const { data: GetPostOfUser, isFetching } = useGetPostOfUser(
    { userId: userId },
    type === 'Videos',
  );

  if (type === 'Videos') {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          {GetPostOfUser?.post &&
            GetPostOfUser.post.map((item: ResponsePostType, index: number) => (
              <PostItem item={item} key={index} />
            ))}
        </div>

        {isFetching && <SkeletonCustomize postList />}

        {GetPostOfUser?.post?.length === 0 && <NotContent />}
      </div>
    );
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        {postListLike &&
          postListLike.map((item: any, index: number) => (
            <PostItem item={item} key={index} />
          ))}
      </div>

      {!postListLike && <Private />}
    </div>
  );
}

export default PostList;
