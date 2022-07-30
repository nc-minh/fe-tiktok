//Layout
import NoFooterLayout from 'app/layouts/NoFooterLayout';
import FullWidthLayout from 'app/layouts/FullWidthLayout';

import { PublicRoutes } from './types';
import { routeConfig } from './routeConfig';
import { Home } from 'app/pages/Home/Loadable';
import { Following } from 'app/pages/Following/Loadable';
import { Profile } from 'app/pages/Profile/Loadable';
import { Live } from 'app/pages/Live/Loadable';

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
    path: '/no-footer',
    component: Profile,
    layout: NoFooterLayout,
  },
];

export { publicRoutes };
