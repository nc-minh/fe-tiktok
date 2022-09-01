/**
 * Asynchronously loads the component for Page
 */

import { lazyLoad } from 'utils/loadable';

export const MobileHome = lazyLoad(
  () => import('./index'),
  module => module.MobileHome,
);
