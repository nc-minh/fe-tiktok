import { AxiosResponse } from 'axios';
import { SearchUsersPayload } from 'types/Search';

import axiosInstance from 'utils/api/axiosInstance';

export const searchUsers = async (
  { q, type }: SearchUsersPayload,
  currentPage: number,
) => {
  const response: AxiosResponse = await axiosInstance.get('/users/search', {
    params: {
      q,
      type,
    },
  });

  if (type === 'less') return response?.data?.data;

  if (type !== 'less')
    return {
      data: response.data?.data,
      nextPage: currentPage + 1,
    };
};
