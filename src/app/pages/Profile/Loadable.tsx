/**
 * Asynchronously loads the component for Page
 */

import { lazyLoad } from 'utils/loadable';

export const Profile = lazyLoad(
  () => import('./index'),
  module => module.Profile,
);
