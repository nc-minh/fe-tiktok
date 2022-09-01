import { useMutation } from '@tanstack/react-query';

import { postReaction } from 'services/post_reaction';
import { PostReactionPayload } from 'types/PostReaction';

export const usePostReaction = () =>
  useMutation((payload: PostReactionPayload) => postReaction(payload));
