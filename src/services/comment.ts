import { AxiosResponse } from 'axios';
import { CommentInfoType, CommentPayload, CommentRes } from 'types/Comment';

import axiosInstance from 'utils/api/axiosInstance';

export const getCommentOfPost = async (
  post_id: string,
): Promise<CommentInfoType[]> => {
  const response: AxiosResponse = await axiosInstance.get(
    `/comments/${post_id}`,
  );

  return response?.data?.data;
};

export const createComment = async (
  payload: CommentPayload,
): Promise<CommentRes> => {
  const response: AxiosResponse = await axiosInstance.post(
    `/comments`,
    payload,
  );

  return response?.data?.data;
};
