/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import MediaItem from 'app/Mobiles/components/MediaItem';
import classNames from 'classnames/bind';
import { useGetPostTrends } from 'queries/post';
import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostTrends } from 'types/Post';

import styles from './ForYou.module.scss';

const cx = classNames.bind(styles);

function ForYou() {
  const ref = useRef<any>(null);
  const [scroll, setScroll] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const { data, fetchNextPage } = useGetPostTrends({
    currentPage: 0,
    pageSize: 10,
  });

  const GetPostTrends = useMemo(() => {
    return data?.pages?.reduce((prev, curr) => {
      return prev.concat(curr.data as any);
    }, []);
  }, [data]) as PostTrends[];

  useEffect(() => {
    const listener = (event: any) => {
      console.log(
        'event.changedTouches[0].clientY',
        event.changedTouches[0].clientY,
      );
    };
    document.addEventListener('touchmove', listener);
    return () => {
      document.removeEventListener('touchmove', listener);
    };
  }, [scroll, setScroll]);

  const style = {
    transform: `translateY(${translateY}px)`,
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {GetPostTrends && (
          <InfiniteScroll
            ref={ref}
            hasMore={true}
            next={fetchNextPage}
            dataLength={GetPostTrends?.length || 0}
            loader={null}
            style={style}
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
