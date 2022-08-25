import axios from 'axios';

import configs from 'configs';
import { getTokens, removeItemFromStorage } from 'utils/storage';
import handleRefreshToken from './refreshToken';

const axiosInstance = axios.create({
  baseURL: configs.apiEndpoint,
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
  async function (response: any) {
    return response;
  },
  async function (error: any) {
    const { config, response } = error;
    const errorMessage = response?.data?.message;

    if (errorMessage === 'jwt expired') {
      const apiResponseData = await handleRefreshToken({
        baseURL: config.baseURL,
        url: config.url,
        method: config.method,
        data: config.data,
      });
      return apiResponseData;
    }

    if (
      errorMessage === 'invalid signature' ||
      errorMessage === 'jwt malformed'
    ) {
      removeItemFromStorage('tokens');
      removeItemFromStorage('userData');
      window.location.replace('/');
    }

    return Promise.reject(error?.response?.data);
  },
);

export default axiosInstance;
