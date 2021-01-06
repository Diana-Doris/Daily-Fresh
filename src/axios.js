import axios from "axios";
import store from "./store";

const instance = axios.create({
  baseURL: "https://mallapi.duyiedu.com/"
});
/* 拦截请求 */
instance.interceptors.request.use(
  config => {
    // console.log(config);

    if (config.url.includes("/passport")) {
      /* 登录 */
      return config;
    } else {
      return {
        ...config,
        params: {
          ...config.params,
          appkey: store.state.user.appkey
        }
      };
    }
  },
  error => {
    return Promise.reject(error);
  }
);
/* 拦截响应 */
instance.interceptors.response.use(
  response => {
    if (response.data.status === "fail") {
      return Promise.reject(response.data.msg);
    } else {
      // console.log(response);
      return response.data.data;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
