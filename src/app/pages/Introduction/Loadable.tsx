/**
 * Asynchronously loads the component for Page
 */

import { lazyLoad } from 'utils/loadable';

export const Introduction = lazyLoad(
  () => import('./index'),
  module => module.Introduction,
);
