/*
 * @Date: 2019-08-10 13:56:05
 * @Desc 封装ajax请求
 * @Last Modified time: 2019-08-28 15:10:34
 */
import axios from 'axios'
// import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'
import router from '../router'
const codeMessage = {
  0: 'Custom error',
  400: 'The request was made with an error and the server did not perform any operations to create or modify data.',
  401: '登录超时或已在其他地方登录，请重新登录',
  403: '没有权限访问',
  404: '请求失败',
  406: 'The format of the request is not available.',
  410: 'The requested resource is permanently deleted and will not be retrieved.',
  422: 'A validation error occurred when creating an object.',
  500: '请求服务器出错',
  502: '请求网关出错',
  503: 'The service is unavailable and the server is temporarily overloaded or maintained.',
  504: '请求网关超时'
}

let baseUrl = process.env.VUE_APP_BASE_URL
axios.defaults.timeout = 6000 // 根据具体情况而定

/** 配置请求默认参数 */
const defaultParams = {}
/** request 拦截器 */
axios.interceptors.request.use(
  config => {
    // 请求头添加token SystemId

    let token = Cookies.get('token')
    if (config.url.indexOf('/login') === -1) {
      config.headers.token = token
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

/** response 拦截器 */
axios.interceptors.response.use(
  res => {
    const statusKeys = Object.keys(codeMessage)
    try {
      const {
        data: { code }
      } = res.data
      if (statusKeys.includes(code.toString())) {
        // 隐式报错
        custErrorHandler(res)
        return res
      } else {
        return res
      }
    } catch (e) {
      return res
    }
  },
  err => {
    // 显式报错
    errorHandler(err)
  }
)
/** 404 和 500 异常报错的处理方式  */
const specialHandler = (code, url) => {
  // 判断404和500状态码进入相应的页面 前提是不是在登录页面(可以根据请求地址判断 ----> 最粗暴的办法😂)
  switch (code) {
    case 401:
      router.push('/login')
      break
    case 404:
      router.push('/404')
      break
    case 500:
      router.push('/500')
      break
    case 505:
      // console.log(url)
      break
    default:
      // 🤭这里不可能走到的baseURL
      throw new Error('未处理类型，请放过前端')
  }
}

/** 异常处理 */
const errorHandler = error => {
  const { response = {} } = error
  // const errortext = codeMessage[response.status] || response.statusText
  // message.error(errortext === '' ? '请求失败' : errortext)
  const { status } = response
  if (response.config !== undefined) {
    const { config: { url } } = response
    if ([401, 404, 500, 505].includes(status)) {
      specialHandler(status, url)
    }
  }
}

/** 自定义报错异常处理 */
const custErrorHandler = error => {
  const {
    data: { message },
    config: { url }
  } = error
  message.error(message)
  /* notification.error({
    message: `Request error ${code}: ${url}`,
    description: message
  }) */

  if ([401, 404, 500, 505].includes(status)) {
    specialHandler(status, url)
  }
}

/** 封装请求暴露出去 */
/** GET 请求 */
export function get (url, params) {
  params = {
    params: params
  }
  return new Promise(resolve => {
    axios.get(baseUrl + url, params).then(res => {
      const { data } = res
      resolve(data)
    })
  })
}
/** POST 请求 */
export function post (url, params, options) {
  return new Promise(resolve => {
    axios.post(baseUrl + url, params, options).then(res => {
      const { data } = res
      resolve(data)
    })
  })
}

/** PUT 请求 **/
export function put (url, params, headerConfig) {
  return new Promise(resolve => {
    axios.put(baseUrl + url, params, headerConfig).then(res => {
      const { data } = res
      resolve(data)
    })
  })
}
/** DELETE 请求 */
export function del (url, params, headerConfig) {
  params = {
    params: params
  }
  return new Promise(resolve => {
    axios.delete(baseUrl + url, params, headerConfig).then(res => {
      const { data } = res
      resolve(data)
    })
  })
}
/** 文件流 上传 */
export function blobStream (url, params, defaultHeader) {
  const headerConfig = {
    ...defaultParams,
    ...defaultHeader,
    headers: { Authorization: 'Bearer ' + this.$Cookies.get('token') },
    responseType: 'arraybuffer'
  }
  return new Promise(() => {
    axios.post(baseUrl + url, params, headerConfig).then(res => {
      const { data } = res
      const aLink = document.createElement('a')
      const blob = new Blob([data], 'application/vnd.ms-excel')
      aLink.href = URL.createObjectURL(blob)
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    })
  })
}

/** 文件流 下载（拼接） */
export function blobDownload (url, params) {
  url += '?access_token=' + this.$Cookies.get('token')
  if (
    typeof params === 'object' &&
    Object.getOwnPropertyNames(params).length > 0
  ) {
    for (let key in params) {
      // if (params.hasOwnProperty(key)) {
      //   url += '&' + key + '=' + params[key]
      // }
    }
  }
  window.open(baseUrl + url)
}

/** 文件流 下载（POST） */
export function pBlobDownload (url, params, fileName = '导出数据.xlsx') {
  return new Promise(resolve => {
    axios({
      method: 'post',
      url: baseUrl + url,
      headers: { Authorization: 'Bearer ' + this.$Cookies.get('token') },
      data: params,
      responseType: 'blob'
    }).then(res => {
      if (!res) {
        resolve(false)
      }
      let url = window.URL.createObjectURL(new Blob([res.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      resolve()
    })
  })
}

/**
 * 获取实际请求地址,用户区分开发和正式环境的请求地址不一致问题
 * @param url
 * @returns {string}
 */
export function realUrl (url) {
  baseUrl = baseUrl.replace('/api', '/')
  return baseUrl + url
}
