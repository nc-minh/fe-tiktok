import { useMutation } from '@tanstack/react-query';
import { createPost } from 'services/post';

export const useCreatePost = () =>
  useMutation((payload: FormData) => createPost(payload));
