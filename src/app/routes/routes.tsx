//Layout
import NoFooterLayout from 'app/layouts/NoFooterLayout';

import { Home } from 'app/pages/Home';
import { Introduction } from 'app/pages/Introduction';
import { PublicRoutes } from './types';
import { routeConfig } from './routeConfig';
import Following from 'app/pages/Following';
import Live from 'app/pages/Live';

//Public routes
const publicRoutes: PublicRoutes[] = [
  {
    path: routeConfig.home,
    component: Home,
  },
  {
    path: '/introduction',
    component: Introduction,
  },
  {
    path: '/following',
    component: Following,
  },
  {
    path: '/live',
    component: Live,
  },
  {
    path: '/no-footer',
    component: Introduction,
    layout: NoFooterLayout,
  },
];

export { publicRoutes };
