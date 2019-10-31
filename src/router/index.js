import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/view/login/index';
Vue.use(Router);
const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    name: 'classify',
    component: () => import('@/view/classify'),
    meta: {
      title: '分类',
      isTab: true,
      isNav: false,
      keepAlive: false,
      isBlack: false
    }
  },
  {
    name: 'user',
    component: () => import('@/view/user'),
    meta: {
      title: '个人中心',
      isTab: true,
      isNav: false,
      keepAlive: false,
      isBlack: false,
      bg: true
    }
  },
  {
    path: '/Login',
    name: 'login',
    component: Login,
  },
  {
    name: 'register',
    component: () => import('@/view/register')

  },
  {
    name: 'index',
    component: () => import('@/view/index'),
    meta: {
      title: '首页',
      isTab: true,
      isNav: false,
      keepAlive: false,
      isBlack: false,
      isJump: true
    }
  },
  {
    name: 'order',
    component: () => import('@/view/order'),
    meta: {
      title: '我的订单',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: true,
      isJump: true
    }
  },
  {
    name: 'returnsList',
    component: () => import('@/view/returnsList'),
    meta: {
      title: '退货列表',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: true,
      isJump: true
    }
  },
  {
    name: 'goods',
    component: () => import('@/view/goods'),
    meta: {
      title: '商品详情',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: false,
      isJump: true
    }
  },
   {
    name: 'authentication',
    component: () => import('@/view/authentication'),
    meta: {
      title: '认证状态',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: false,
      isJump: false
    }
  },
  {
    name: 'paymentFailure',
    component: () => import('@/view/paymentFailure'),
    meta: {
      title: '支付失败',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: false,
      isJump: false
    }
  },
   {
    name: 'result',
    component: () => import('@/view/result'),
    meta: {
      title: '认证结果',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: false,
      isJump: false
    }
  },
  {
    name: 'iDidentity',
    component: () => import('@/view/iDidentity'),
    meta: {
      title: '身份认证',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: false,
      isJump: false
    }
  },
  {
    name: 'orderDetails',
    component: () => import('@/view/orderDetails'),
    meta: {
      title: '订单详情',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: true,
	   isJump: true
    }
  },
  {
    name: 'cargoTui',
    component: () => import('@/view/cargoTui'),
    meta: {
      title: '申请退货',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: true,
     isJump: false
    }
  },
  {
    name: 'address',
    component: () => import('@/view/address'),
    meta: {
      title: '地址管理',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: false
    }
  },
  {
    name: 'addAddress',
    component: () => import('@/view/addAddress'),
    meta: {
      title: '添加地址',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: false
    }
  },
  {
    name: 'submitOrder',
    component: () => import('@/view/submitOrder'),
    meta: {
      title: '提交订单',
      isTab: false,
      isNav: false,
      keepAlive: false,
      isBlack: true,
      bg: false,
      isJump: true
    }
  },
  {
    name: 'cart',
    component: () => import('@/view/cart'),
    meta: {
      title: '购物车',
      isTab: true,
      isNav: false,
      keepAlive: false,
      isBlack: false
    }
  }

];


routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  routes,
  mode:"hash",
});
router.beforeEach((to, from, next) => {
  let _this = this;
  let token = localStorage.getItem('token');
  console.log(token)
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  console.log(to.name)
  if (to.name != 'login' && !token && to.name != 'register') {
    let appId = 'wx9a666664a1857d38';
    // let redirectUrl = encodeURIComponent('http://cstgzh.stnyhb.com/login');
    let redirectUrl = encodeURIComponent('http://www.mubole.top/login');
    let scope = 'snsapi_base';
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" +
      redirectUrl + "&response_type=code&scope=" + scope + "&state=STATE#wechat_redirect";
  } else {
    next();
  }
});

export {
  router
};
