import { formatJsonToUrlParams, type instanceObject } from "@/utils";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios from "axios";

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;

const axiosInstance: AxiosInstance = axios.create({
  // prefix
  baseURL: BASE_PREFIX,
  // time out
  timeout: 1000 * 30,
  // request header
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // TODO here you can add the logic you want to process before the request is sent
    // TODO such as loading, etc.
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
    // ElMessage.info(JSON.stringify(response.status));
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      //   ElMessage.error(showCodeMessage(response.status));
      return Promise.reject(response.data);
    }
    // ElMessage.warning(
    //   "The network connection is abnormal, please try again later!"
    // );
    return Promise.reject(error);
  }
);
const service = {
  get<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, { params: data });
  },

  post<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.post(url, data);
  },

  put<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.put(url, data);
  },

  delete<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.delete(url, data);
  },

  upload: (url: string, file: FormData | File) =>
    axiosInstance.post(url, file, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  download: (url: string, data: instanceObject) => {
    window.location.href = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(
      data
    )}`;
  },
};

export default service;
