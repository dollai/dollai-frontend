
import Axios, { AxiosInstance } from 'axios';

let client: AxiosInstance = Axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
});

export const buildAuthedClient = (): AxiosInstance => {
  client = Axios.create({
    baseURL: `${process.env.VUE_APP_API_HOST}${process.env.VUE_APP_API_PATH_PREFIX}`,
  });
  return client;
};

export default client;
