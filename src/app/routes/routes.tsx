//Layout
import FullWidthLayout from 'app/layouts/FullWidthLayout';
import NoSidebarLayout from 'app/layouts/NoSidebarLayout';
import MediaDetailLayout from 'app/layouts/MediaDetailLayout';

import { PublicRoutes } from './types';
import { routeConfig } from './routeConfig';
import { Home } from 'app/pages/Home/Loadable';
import { Following } from 'app/pages/Following/Loadable';
import { Profile } from 'app/pages/Profile/Loadable';
import { Live } from 'app/pages/Live/Loadable';
import { Upload } from 'app/pages/Upload/Loadable';
import { MediaDetail } from 'app/pages/MediaDetail/Loadable';

//Public routes
const publicRoutes: PublicRoutes[] = [
  {
    path: routeConfig.home,
    component: Home,
  },
  {
    path: routeConfig.profile,
    component: Profile,
    layout: FullWidthLayout,
  },
  {
    path: routeConfig.following,
    component: Following,
  },
  {
    path: routeConfig.live,
    component: Live,
  },
  {
    path: routeConfig.upload,
    component: Upload,
    layout: NoSidebarLayout,
  },
  {
    path: routeConfig.media_detail,
    component: MediaDetail,
    layout: MediaDetailLayout,
  },
];

export { publicRoutes };
