/**
 * Asynchronously loads the component for Page
 */

import { lazyLoad } from 'utils/loadable';

export const Following = lazyLoad(
  () => import('./index'),
  module => module.Following,
);
