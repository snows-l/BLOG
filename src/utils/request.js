/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 15:43:46
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-31 23:29:24
 * @FilePath: /BLOG/src/utils/request.js
 */
import { getToken } from '@/utils/auth';
import { session } from '@/utils/cache';
import errorCode from '@/utils/errorCode';
import axios from 'axios';
// 创建取消令牌
const CancelToken = axios.CancelToken;
let cancel;

// 是否显示重新登录
export let isRelogin = { show: false };
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
let isDev = import.meta.env.MODE === 'development'; // 是否开发环境

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: isDev ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_PROD_BASE_URL,
  // 超时
  timeout: 100000
});

// request拦截器
service.interceptors.request.use(
  config => {
    config.cancelToken = new CancelToken(c => {
      cancel = c;
    });

    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime()
      };
      const sessionObj = session.get('QUERY_PARAMS');
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        session.set('QUERY_PARAMS', requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 1000 * 2; // 间隔时间(ms)，小于此时间视为重复提交
        // 判断是否是重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = '数据正在处理，请勿重复提交';
          console.warn(`[${s_url}]: ` + message);
          return Promise.reject(new Error(message));
        } else {
          // 不是重复提交，更新缓存
          session.set('QUERY_PARAMS', requestObj);
        }
      }
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default'];
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }
    if (code == 401) {
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
    } else if (code === 500) {
      return Promise.reject('系统异常，请联系管理员。');
    } else {
      return res.data;
    }
  },
  error => {
    console.log('error - ' + error);
    let { message } = error;
    if (message == 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    return Promise.reject(error);
  }
);

export default service;
