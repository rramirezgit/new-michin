import axios from 'axios';

import { getStorage } from 'src/hooks/use-local-storage';

export const createAxiosInstance = () => {
  const accessToken = getStorage('ASDFGHJKL');
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export const endpoints_minchin = {
  Products: '/products?store=:storeId',
  Schedules: '/ticket-schedules?sku=:sku&store=:city&date=:date',
  Reserve: '/ticket-schedules/reserve?store=CDMX',
  Order: '/orders',
  media: {
    upload: '/file-uploader/upload',
  },
  auth: {
    login: '/auth/login',
    signup: '/auth/create-user',
    meAuth0: '/auth/userinfo',
    me: '/auth/profile',
    changePassword: '/auth/request-password-change',
    validatePassword: '/auth/validate-password-reset',
  },
  user: {
    orders: '/orders/user',
    orderByID: '/orders/:id',
    updateUser: '/auth/update',
  },
};
