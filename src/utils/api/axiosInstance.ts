import axios from 'axios';

import configs from 'configs';
import { getTokens, removeItemFromStorage } from 'utils/storage';
import handleRefreshToken from './refreshToken';

const axiosInstance = axios.create({
  baseURL: configs.apiEndpoint,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  function (config: any) {
    const { accessToken } = getTokens();

    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  async function (error: any) {
    const { config, response } = error;
    const errorMessage = response?.data?.message;

    if (errorMessage === 'Unauthorized') {
      removeItemFromStorage('tokens');
      window.location.replace('/login');
    }

    if (errorMessage === 'jwt expired') {
      const apiResponseData = await handleRefreshToken({
        baseURL: config.baseURL,
        url: config.url,
        method: config.method,
        data: config.data,
      });
      return apiResponseData;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
