import axios from 'axios'

/**
 *
 * @Author zqzess
 * @Date 2021/10/29
 * @File http.js
 * @Version 1.0
 * @Github https://github.com/zqzess
 * @Msg 亦余心之所善兮,虽九死其尤未毁
 *
 **/
axios.defaults.baseURL = 'http://localhost:8082/api'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true // 请求发送cookie

// 创建axios实例
let instance = axios.create({ timeout: 1000 * 12 })
instance.interceptors.request.use(
  config => {
    // console.log('发送请求')
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') && localStorage.getItem('userid')) {
      // console.log('请求头加入token')
      config.headers.token = localStorage.getItem('token')
      config.headers.userid = localStorage.getItem('userid')
    }

    return config
  },

  error => {
    console.log('请求失败！！')
    console.log(error)
    return Promise.reject(error)
  })

// 异步请求后，判断token是否过期
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
      }
    }
  }
)
export default instance
