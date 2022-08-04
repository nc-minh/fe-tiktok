import { useQuery } from '@tanstack/react-query';
import { getPostOfUser } from 'services/post';
import { GetPostPayload } from 'types/Post';

import { STALE_TIME } from 'utils/constants';

export const useGetPostOfUser = (payload: GetPostPayload, enabled: boolean) =>
  useQuery(
    ['get-post-of-user', payload, enabled],
    () => getPostOfUser(payload, 0),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      enabled: enabled,
    },
  );
