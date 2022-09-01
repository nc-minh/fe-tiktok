import { useMutation } from '@tanstack/react-query';
import { createComment } from 'services/comment';
import { CommentPayload } from 'types/Comment';

export const useCreateComment = () =>
  useMutation((payload: CommentPayload) => createComment(payload));
