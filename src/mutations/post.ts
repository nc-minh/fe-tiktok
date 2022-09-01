import { useMutation } from '@tanstack/react-query';
import { createPost, viewPost } from 'services/post';

export const useCreatePost = () =>
  useMutation((payload: FormData) => createPost(payload));

export const useViewPost = () =>
  useMutation((post_id: string) => viewPost(post_id));
