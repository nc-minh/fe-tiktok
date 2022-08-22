import { useQuery } from '@tanstack/react-query';
import { getFollowings } from 'services/follow';

import { STALE_TIME } from 'utils/constants';

export const useGetFollowings = (
  user_id: string,
  enabled: boolean,
  pageSize: number,
  currentPage: number,
) =>
  useQuery(
    ['get-followings', user_id, enabled, pageSize, currentPage],
    () => getFollowings(user_id, pageSize, currentPage),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      enabled: enabled,
    },
  );
