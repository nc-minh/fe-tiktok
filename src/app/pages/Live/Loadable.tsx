/**
 * Asynchronously loads the component for Page
 */

import { lazyLoad } from 'utils/loadable';

export const Live = lazyLoad(
  () => import('./index'),
  module => module.Live,
);
