import axios from "axios";
import { getLocalStorage } from "@/utils/localStoreage";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
class Request {
  baseURL?: string;
  timeout?: number;
  instance: AxiosInstance;
  constructor(baseURL?: string, timeout?: number) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout
    });

    // 请求拦截器
    this.instance.interceptors.request.use(config => {
      const token = getLocalStorage("questionToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        if (response.data && response.data.errno === 0) {
          if (response.data.success || response.data.data.success) {
            if (!response.data.data) {
              return response.data;
            }
            return response.data.data;
          } else {
            ElMessage.error(response.data.data.msg || "请求失败");
          }
        } else if (response.data && response.data.errno !== 0) {
          return Promise.reject(response.data);
        }
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  // 发送请求
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => {
          resolve(res as T);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "GET"
    });
  }
  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "POST"
    });
  }
}

const request = new Request();
export default request;
