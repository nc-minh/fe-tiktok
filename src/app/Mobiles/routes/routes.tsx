//Layout

import { PublicRoutes } from 'app/routes/types';
import { routeConfig } from 'app/routes/routeConfig';
import { MobileHome } from '../pages/MobileHome/Loadable';

//Public routes
const publicMobileRoutes: PublicRoutes[] = [
  {
    path: routeConfig.home,
    component: MobileHome,
  },
];

export { publicMobileRoutes };
