//Layout
import NoFooterLayout from 'app/layouts/NoFooterLayout';

import { Home } from 'app/pages/Home';
import { Introduction } from 'app/pages/Introduction';
import { PublicRoutes } from './types';
import routeConfig from './routeConfig';

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
    path: '/no-footer',
    component: Introduction,
    layout: NoFooterLayout,
  },
];

export { publicRoutes };
