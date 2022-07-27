/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosRequestConfig } from 'axios';

import configs from 'configs';
import { getTokens, setTokens } from 'utils/storage';
import axiosInstance from './axiosInstance';

async function handleRefreshToken({
  method,
  data,
  url,
  baseURL,
}: AxiosRequestConfig) {
  const { refreshToken } = getTokens();
  //Axios to refresh token
  const response = await axios.post(
    `${configs.apiEndpoint}/auth/refresh-token`,
    {
      refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (response?.data?.errors) {
    localStorage.clear();
    window.location.replace('/login');
  } else if (response.data) {
    const tokens = response.data?.data;
    setTokens(tokens);
    const { accessToken } = getTokens();

    return axiosInstance.request({
      url: url,
      baseURL: baseURL,
      method: method,
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return null;
}

export default handleRefreshToken;
