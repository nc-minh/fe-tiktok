import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import classNames from 'classnames/bind';

import styles from './SkeletonCustomize.module.scss';

const cx = classNames.bind(styles);

interface Props {
  profileHeader?: boolean;
}

export default function SkeletonCustomize({ profileHeader }: Props) {
  if (profileHeader)
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

  return (
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
