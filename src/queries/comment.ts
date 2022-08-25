import { useQuery } from '@tanstack/react-query';

import { getCommentOfPost } from 'services/comment';
import { STALE_TIME } from 'utils/constants';

export const useGetCommentOfPost = (post_id: string, enabled: boolean) =>
  useQuery(['get-comment-of-post', post_id], () => getCommentOfPost(post_id), {
    staleTime: STALE_TIME.ONE_HOUR,
    enabled: enabled,
  });
