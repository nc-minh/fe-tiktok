/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';

import RecommendMediaItem from 'app/components/RecommendMedia';
import useGetPostTrends from 'app/hooks/useGetPostTrends';

import styles from './ForYou.module.scss';
import { useLayoutEffect, useMemo } from 'react';
import { PostTrends } from 'types/Post';

const cx = classNames.bind(styles);

function ForYou() {
  const { data, fetchNextPage } = useGetPostTrends({
    currentPage: 0,
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
              <RecommendMediaItem key={index} post={post} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default ForYou;
