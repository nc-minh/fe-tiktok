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
  function (response: any) {
    console.log('res from instance:::', response);

    return response;
  },
  async function (error: any) {
    const { config, response } = error;
    const errorMessage = response?.data?.message;
    const status = response?.data?.status;

    console.log('response from error(instance)', response);

    if (errorMessage === 'jwt expired') {
      const apiResponseData = await handleRefreshToken({
        baseURL: config.baseURL,
        url: config.url,
        method: config.method,
        data: config.data,
      });
      return apiResponseData;
    }

    if (String(status).startsWith('4') || String(status).startsWith('5')) {
      removeItemFromStorage('tokens');
      removeItemFromStorage('userData');
      window.location.replace('/login');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
