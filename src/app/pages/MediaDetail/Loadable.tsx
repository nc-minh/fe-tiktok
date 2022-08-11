/**
 * Asynchronously loads the component for Page
 */

import { lazyLoad } from 'utils/loadable';

export const MediaDetail = lazyLoad(
  () => import('./index'),
  module => module.MediaDetail,
);
