import Vue from 'vue'
import App from './App'
import {
  router
} from './router'
import axios from 'axios'
import store from './store' //引入store
import '@/assets/css/global.css' /*引入公共样式*/
import '@/assets/iconfont/iconfont2.css' /*引入公共样式*/
import '@/assets/js/rem.js' /*引入rem单位样式*/
import vueJsonp from "vue-jsonp"//使用jsop做请求
Vue.use(vueJsonp )
import filter from '@/assets/js/filter' //全局过滤器
// 导入组件库
import vueCanvasPoster from '@/assets/lib/index'
// 注册组件库
Vue.use(vueCanvasPoster)
import {
  Toast
} from 'vant';
Vue.use(Toast);
import animate from 'animate.css'
Vue.use(animate)
// 引入vue-amap
import AMap from 'vue-amap'
Vue.use(AMap)
Vue.config.productionTip = false
// 请求配置
Vue.prototype.$http = axios
// axios.defaults.baseURL = "/ebapi"
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// get请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    let token = localStorage.getItem('token');
    token && (config.headers.token = token);
    return config;
  },
  error => {
    return Promise.error(error);
  })
//响应拦截器

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 304:
          Toast({
            message: '没有对应商品',
            duration: 1000,
            forbidClick: true
          });
          break;
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 100:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:
          Toast({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true
          });
          // 清除token
          localStorage.removeItem('token');
          // store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
          // 404请求不存在
        case 404:
          Toast({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          });
          break;
          // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
      return Promise.reject(error.response);
    }
  }
);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '9cc1cb3ed4c140f6945d80dec47528f4',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',
    'AMap.PolyEditor', 'AMap.CircleEditor'
  ]
});
//定义一个全局方法其他页面都使用
Vue.prototype.getLoing = function(isLoing, callBack) {
  console.log('登录')
  isLoing && callback && callback();
}
new Vue({
  el: '#app',
  router,
  store, //使用store
  components: {
    App
  },
  template: '<App/>'
})
