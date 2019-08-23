declare namespace typeAxios {
  interface AxiosRequestConfig {
    url?: string;
    method?: "get" | "GET"; // 当前只需要get请求
    headers?: any;
    params?: any;
    data?: any;
    timeout?: number;
    [key: string]: any;
  }
  interface AxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
    [key: string]: any;
  }
}
