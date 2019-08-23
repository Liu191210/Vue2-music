import Vue from "vue";
const request = window.axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // 环境定义
  timeout: 10000, // 10s
  headers: {
    // 定义请求头
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
});

// 请求拦截器
request.interceptors.request.use(
  (config: typeAxios.AxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    window.vant.Toast.fail(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: typeAxios.AxiosResponse) => {
    return Promise.resolve(response.data);
  },
  (error: any) => {
    window.vant.Toast.fail(error);
    return Promise.reject(error);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url: string, params?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .get(url, {
        params
      })
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url: string, params?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .post(url, params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

let plugin = Object.defineProperties(Vue.prototype, {
  axios: {
    get(): object {
      return { get, post };
    }
  }
});

Vue.use(plugin);
