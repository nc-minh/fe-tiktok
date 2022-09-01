import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';

import styles from './Home.module.scss';
import ForYou from 'app/containers/ForYou';

const cx = classNames.bind(styles);

export function Home() {
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
