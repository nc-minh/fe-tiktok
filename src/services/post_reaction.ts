import { AxiosResponse } from 'axios';

import { PostReactionPayload } from 'types/PostReaction';
import axiosInstance from 'utils/api/axiosInstance';

export const postReaction = async (payload: PostReactionPayload) => {
  const response: AxiosResponse = await axiosInstance.post(
    '/posts-reaction',
    payload,
  );

  return response?.data?.data;
};
