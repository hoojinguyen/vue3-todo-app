import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 1000,
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    console.log(config);
    /**
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.data) {
      return Promise.reject(error);
    }
    const { message } = error;
    console.error(message);
    return Promise.reject(error);
  }
);

export const post = (url: string, data = {}, params = {}) => {
  return instance({ method: "post", url, data, params });
};

export const get = (url: string, params = {}) => {
  return instance({ method: "get", url, params });
};

export const put = (url: string, data = {}, params = {}) => {
  return instance({ method: "put", url, params, data });
};

export const _delete = (url: string, params = {}) => {
  return instance({ method: "delete", url, params });
};

export default instance;
