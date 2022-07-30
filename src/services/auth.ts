import { AxiosResponse } from 'axios';
import { SignupDataType, LoginType } from 'types/Auth';

import axiosInstance from 'utils/api/axiosInstance';

export const signup = async (payload: SignupDataType) => {
  const response: AxiosResponse = await axiosInstance.post(
    '/auth/register',
    payload,
  );

  if (
    String(response?.data?.status).startsWith('4') ||
    String(response?.data?.status).startsWith('5')
  ) {
    throw response?.data;
  }
  return response?.data?.data;
};

export const login = async (payload: LoginType) => {
  const response: AxiosResponse = await axiosInstance.post(
    '/auth/login',
    payload,
  );

  if (
    String(response?.data?.status).startsWith('4') ||
    String(response?.data?.status).startsWith('5')
  ) {
    throw response?.data;
  }
  return response?.data?.data;
};
