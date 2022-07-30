import { Helmet } from 'react-helmet-async';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import ProfileHeader from 'app/containers/ProfileHeader';

const cx = classNames.bind(styles);

export function Profile() {
  return (
    <>
      <Helmet defaultTitle="Profile | TikTok">
        <meta name="description" content="Profile | TikTok" />
      </Helmet>
      <div className={cx('wrapper')}>
        <ProfileHeader />
      </div>
    </>
  );
}
