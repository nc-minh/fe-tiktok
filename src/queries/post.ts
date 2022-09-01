import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getPostOfUser, getPostTrends } from 'services/post';
import { GetPostPayload, PostTrendsPayload } from 'types/Post';

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

export const useGetPostTrends = (payload: PostTrendsPayload) =>
  useInfiniteQuery(
    ['get-post-trends', payload],
    ({ pageParam = payload.currentPage || 0 }) =>
      getPostTrends(payload, pageParam),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      getNextPageParam: (lastPage: any) => lastPage.nextPage ?? undefined,
      retry: false,
    },
  );
