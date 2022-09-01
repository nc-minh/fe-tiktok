import { AxiosResponse } from 'axios';
import {
  CreatePostPayload,
  GetPostPayload,
  PostTrends,
  ResponseGetPostType,
  ViewPostRes,
} from 'types/Post';

import axiosInstance from 'utils/api/axiosInstance';
import { PAGE_SIZE } from 'utils/constants';

export const getPostOfUser = async (
  { userId, pageSize = PAGE_SIZE }: GetPostPayload,
  currentPage: number,
): Promise<ResponseGetPostType> => {
  const response: AxiosResponse = await axiosInstance.get(
    `/posts/user/${userId}`,
    {
      params: {
        pageSize,
        currentPage,
      },
    },
  );
  return response.data?.data;
};

export const createPost = async (
  payload: FormData,
): Promise<CreatePostPayload> => {
  const response: AxiosResponse = await axiosInstance.post(`/posts`, payload);
  return response.data?.data;
};

export const viewPost = async (post_id: string): Promise<ViewPostRes> => {
  const response: AxiosResponse = await axiosInstance.post(
    `/posts/view/${post_id}`,
  );
  return response.data?.data;
};

export const getPostTrends = async (
  { pageSize = 10 },
  currentPage: number,
): Promise<{ data: PostTrends[]; nextPage: number }> => {
  const response: AxiosResponse = await axiosInstance.get(`/posts/for-you`, {
    params: {
      pageSize,
      currentPage,
    },
  });
  return {
    data: response.data?.data,
    nextPage: currentPage + 1,
  };
};
