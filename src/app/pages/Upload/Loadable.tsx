/**
 * Asynchronously loads the component for Page
 */

import { lazyLoad } from 'utils/loadable';

export const Upload = lazyLoad(
  () => import('./index'),
  module => module.Upload,
);
