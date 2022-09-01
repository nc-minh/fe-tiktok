import ForYou from 'app/Mobiles/containers/ForYou';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';

import styles from './MobileHome.module.scss';

const cx = classNames.bind(styles);

export function MobileHome() {
  return (
    <>
      <Helmet defaultTitle="Watch trending videos for you | Tiktok">
        <meta
          name="description"
          content="Watch trending videos for you | Tiktok"
        />
      </Helmet>
      <div className={cx('wrapper')}>
        <ForYou />
      </div>
    </>
  );
}
