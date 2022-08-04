import { AxiosResponse } from 'axios';
import { GetPostPayload, ResponseGetPostType } from 'types/Post';

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
