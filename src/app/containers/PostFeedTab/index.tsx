/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PostList from 'app/components/PostList';
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './PostFeedTab.module.scss';

const cx = classNames.bind(styles);

interface Props {
  userId: string;
}

export default function PostFeedTab({ userId }: Props) {
  const [value, setValue] = useState('Videos');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={cx('wrapper')}>
      <Tabs
        classes={{ indicator: cx('indicator') }}
        value={value}
        onChange={handleChange}
        aria-label="user tabs"
      >
        <Tab
          classes={{ selected: cx('selected') }}
          className={cx('tab')}
          label="Videos"
          value="Videos"
        />
        <Tab
          classes={{ selected: cx('selected') }}
          className={cx('tab')}
          label="Liked"
          value="Liked"
        />
      </Tabs>
      <PostList userId={userId} type={value} />
    </div>
  );
}
