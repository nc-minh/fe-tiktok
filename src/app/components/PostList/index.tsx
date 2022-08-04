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
      <div className={cx('grid')}>
        <div className={cx('row')}>
          {GetPostOfUser?.post &&
            GetPostOfUser.post.map((item: ResponsePostType, index: number) => (
              <PostItem item={item} key={index} />
            ))}

          {isFetching && <SkeletonCustomize postList />}

          {GetPostOfUser?.post?.length === 0 && <NotContent />}
        </div>
      </div>
    );
  }

  return (
    <div className={cx('grid')}>
      <div className={cx('row')}>
        {postListLike &&
          postListLike.map((item: any, index: number) => (
            <PostItem item={item} key={index} />
          ))}

        {!postListLike && <Private />}
      </div>
    </div>
  );
}

export default PostList;