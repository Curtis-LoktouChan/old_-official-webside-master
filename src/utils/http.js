/**
 * 网络请求配置
 */
import axios from "axios";
import { BASE_URL } from "../constant/config";
import { persistor } from "../store/index";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

/**
 * http request 拦截器
 */
// axios.interceptors.request.use(
//   (config) => {
//     config.headers = {
//       "Content-Type": "application/json",
//     };
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    // token无效，过期,删除本地token和持久化存储
    if (error.response.status === 402) {
      persistor.pause();
      persistor.purge();
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}, token = "") {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        headers: { Authorization: token },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装postBlob请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postBlob(url, data, token = "") {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: { Authorization: token },
        responseType: "blob",
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data, token = "") {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}, token = "") {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, {
        headers: { Authorization: token },
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          // msag(err);
          reject(err);
        }
      );
  });
}

/**
 * 封装delete请求
 * @param url
 * @param params
 * @returns {Promise}
 */

export function Delete(url, params = {}, token = "") {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
        headers: { Authorization: token },
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
}

//统一接口处理，返回数据
export default function myhttp(fecth, url, param, token) {
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        get(url, param, token)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "post":
        post(url, param, token)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "put":
        put(url, param, token)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "delete":
        Delete(url, param, token)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "postBlob":
        postBlob(url, param, token)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
// function msag(err) {
//   if (err && err.response) {
//     switch (err.response.status) {
//       case 400:
//         alert(err.response.data.error.details);
//         break;
//       case 401:
//         alert("未授权，请登录");
//         break;

//       case 403:
//         alert("拒绝访问");
//         break;

//       case 404:
//         alert("请求地址出错");
//         break;

//       case 408:
//         alert("请求超时");
//         break;

//       case 500:
//         alert("服务器内部错误");
//         break;

//       case 501:
//         alert("服务未实现");
//         break;

//       case 502:
//         alert("网关错误");
//         break;

//       case 503:
//         alert("服务不可用");
//         break;

//       case 504:
//         alert("网关超时");
//         break;

//       case 505:
//         alert("HTTP版本不受支持");
//         break;
//       default:
//     }
//   }
// }
