/* eslint-disable no-unused-vars */
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import classNames from 'classnames/bind';

import styles from './SkeletonCustomize.module.scss';

const cx = classNames.bind(styles);

interface Props {
  profileHeader?: boolean;
  postList?: boolean;
}

export default function SkeletonCustomize({ profileHeader, postList }: Props) {
  const POST_LIST_LENGTH = ['1', '2', '3', '4', '5', '6', '7', '8'];
  if (profileHeader) {
    return (
      <div className={cx('profileHeader')}>
        <Skeleton variant="circular" width={116} height={116} />
        <div className={cx('right')}>
          <Skeleton variant="rectangular" width={252} height={28} />
          <Skeleton variant="rectangular" width={180} height={20} />
          <Skeleton variant="rectangular" width={208} height={38} />
        </div>
      </div>
    );
  }

  if (postList) {
    return (
      <div className={cx('grid')}>
        <div className={cx('postList', 'row')}>
          {POST_LIST_LENGTH.map((item, index) => (
            <div
              key={index + item}
              className={cx('wrapper', 'col', 'pc-l-2', 'l-3', 'm-4', 'c-6')}
            >
              <Skeleton className={cx('item')} variant="rectangular" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
