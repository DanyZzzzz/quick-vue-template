import axios, {
  AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { useAppStore } from "@/stores/model/app";

const appStore = useAppStore();

export const instance = axios.create({
  timeout: 1000 * 60,
  baseURL: import.meta.env.VITE_API_PREFIX as string,
});

function request(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  return new Promise((resolve) => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = getToken;
    }
    resolve(config);
  });
}

const requestError = (error: any) => Promise.reject(error);

interface ApiResponse {
  code?: string;
  status?: string;
  message?: string;
  data?: any;
}

function response(
  response: AxiosResponse<ApiResponse>
): AxiosResponse | Promise<never> {
  if (typeof response.data === "string") {
    return response;
  }

  const doTran = response.config?.url?.includes("/tran/doTran_") || false;

  if (doTran) {
    if (response.data.status !== "1") {
      window.$message?.error(response.data.message || "请求失败");
      return Promise.reject(response.data);
    }
    return response;
  } else {
    if (response.data.code !== "1") {
      if (response.data.code === "401") {
        localStorage.clear();
        appStore.refreshStatus(false);
        window.$message?.error("登录已过期，请重新登录");
        return Promise.reject(response);
      }
      window.$message?.error(response.data.message || "请求失败");
      return Promise.reject(response);
    } else if (response.status !== 200) {
      window.$message?.error(response.data.message || "请求失败");
      return Promise.reject(response);
    }
  }
  return response;
}

function responseError(error: any): Promise<never> {
  const { response } = error;
  if (response && response.status && response.status !== 200) {
    window.$message?.error(response.data?.message || "请求失败");
    switch (response.status) {
      case 401:
        localStorage.clear();
        break;
    }
  }
  return Promise.reject(error);
}

instance.interceptors.request.use(request, requestError);
instance.interceptors.response.use(response, responseError);

interface HttpClient {
  CancelToken: typeof axios.CancelToken;
  request: (options: AxiosRequestConfig) => Promise<AxiosResponse>;
  get: (
    url: string,
    data?: any,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  post: (
    url: string,
    data?: any,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  put: (
    url: string,
    data?: any,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  delete: (
    url: string,
    data?: any,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  postParams: (
    url: string,
    data?: any,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
}

const http: HttpClient = {
  CancelToken: axios.CancelToken,
  request: (options: AxiosRequestConfig) => instance(options),
  get: (url: string, data = {}, options = {}) => {
    const params = qs.stringify(data);
    const query = params ? `${url.includes("?") ? "&" : "?"}${params}` : "";
    return instance(url + query, { ...options });
  },
  post: (url: string, data = {}, options = {}) =>
    instance({
      method: "POST",
      url,
      data,
      ...options,
    }),
  put: (url: string, data = {}, options = {}) =>
    instance({
      method: "PUT",
      url,
      data,
      ...options,
    }),
  delete: (url: string, data = {}, options = {}) =>
    instance({
      method: "DELETE",
      url,
      data,
      ...options,
    }),
  postParams: (url: string, data = {}, options = {}) => {
    const params = qs.stringify(data);
    const query = params ? `${url.includes("?") ? "&" : "?"}${params}` : "";
    return instance(url + query, { method: "POST", ...options });
  },
};

// Mock: 创建 axios 实例
const mockInstance = axios.create({
  timeout: 1000 * 60,
  baseURL: "/api/",
});

mockInstance.interceptors.request.use(request, requestError);
mockInstance.interceptors.response.use(response, responseError);

const mock: HttpClient = {
  CancelToken: axios.CancelToken,
  request: (options: AxiosRequestConfig) => mockInstance(options),
  get: (url: string, data = {}, options = {}) => {
    const params = qs.stringify(data);
    const query = params ? `${url.includes("?") ? "&" : "?"}${params}` : "";
    return mockInstance(url + query, { ...options });
  },
  post: (url: string, data = {}, options = {}) =>
    mockInstance({
      method: "POST",
      url,
      data,
      ...options,
    }),
  put: (url: string, data = {}, options = {}) =>
    mockInstance({
      method: "PUT",
      url,
      data,
      ...options,
    }),
  delete: (url: string, data = {}, options = {}) =>
    mockInstance({
      method: "DELETE",
      url,
      data,
      ...options,
    }),
  postParams: (url: string, data = {}, options = {}) => {
    const params = qs.stringify(data);
    const query = params ? `${url.includes("?") ? "&" : "?"}${params}` : "";
    return mockInstance(url + query, { method: "POST", ...options });
  },
};

export { http, mock };
