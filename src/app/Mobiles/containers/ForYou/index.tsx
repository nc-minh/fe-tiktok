import MediaItem from 'app/Mobiles/components/MediaItem';
import classNames from 'classnames/bind';
import { useGetPostTrends } from 'queries/post';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostTrends } from 'types/Post';

import styles from './ForYou.module.scss';

// const media = {
//   media_url:
//     'http://res.cloudinary.com/domvksfsk/video/upload/v1660145430/tiktok/videos/download%20%281%29.mp4-u0mQcJxSpemmbvWl0CiueciZeT3YZMJJ.mp4',
//   contents: 'meo meo meo :))',
//   comment_count: 1,
//   isFollow: true,
//   isReaction: true,
//   reaction_count: 2,
//   view_count: 3,
//   user_id: {
//     avatar:
//       'http://res.cloudinary.com/domvksfsk/image/upload/v1661579103/tiktok/images/%5B000280%5D.jpg-455ZqHWdMH4mkVfO3MlMcdIvoNoXg8Aj.jpg',
//     fullname: 'Me Me nè mn',
//     tick: true,
//     username: 'mememe',
//   },
// };

const cx = classNames.bind(styles);

function ForYou() {
  const { data, fetchNextPage } = useGetPostTrends({
    currentPage: 0,
    pageSize: 10,
  });

  const GetPostTrends = useMemo(() => {
    return data?.pages?.reduce((prev, curr) => {
      return prev.concat(curr.data as any);
    }, []);
  }, [data]) as PostTrends[];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {GetPostTrends && (
          <InfiniteScroll
            hasMore={true}
            next={fetchNextPage}
            dataLength={GetPostTrends?.length || 0}
            loader={null}
          >
            {GetPostTrends.map((post, index) => (
              <MediaItem key={index} media={post} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default ForYou;
