<template>
  <div class="div_all login">
  </div>
</template>

<script>
  import {
    wxApi
  } from "../../assets/js/wxApi.js"
  import {
    Swipe,
    SwipeItem,
    Toast
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    },

    props: {},

    data() {
      return {}
    },

    computed: {},

    watch: {
      //监听路由变化
      $route(to, from) {
        console.log(to);
        console.log(from)
      }
    },
    //组件中的路由生命周期
    beforeRouteLeave(to, from, next) {
      next();
    },

    beforeRouteEnter(to, from, next) {
      next();
    },

    //组件的生命周期
    beforeCreate() {
      Toast.loading({
        mask: false,
        message: '加载中...'
      });
    },
    created() {
      let _this = this;
      let code = wxApi.getUrlParams().code;
      console.log(code)
      if(localStorage.getItem('token')){
        _this.$router.push({
          path: '/index',
        })
       return false
      }
      if(code){
         _this.$http
           .get("mzyl/wechat_api/login", {
             params: {
               code: code
             }
           }).then(res => {
             let d = res.data.data;
             if (res.data.code == 100) {
               console.log('未注册');
               let appId = 'wx9a666664a1857d38';
               // 线上调试
               // let redirectUrl = encodeURIComponent('http://cstgzh.stnyhb.com/register');
               let redirectUrl = encodeURIComponent('http://www.mubole.top/register');
               let scope = 'snsapi_userinfo';
               window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId +
                 "&redirect_uri=" +
                 redirectUrl + "&response_type=code&scope=" + scope + "&state=STATE#wechat_redirect";
               Toast.clear();
               return false
             }
             if (res.data.code == 200) {
               localStorage.setItem('avatar', d.avatar || '');
               localStorage.setItem('token', d.token || '');
               localStorage.setItem('phone', d.phone || '');
               localStorage.setItem('nickname', d.nickname || '');
               localStorage.setItem('uid', d.uid || '');
               localStorage.setItem('isFlagCar', 1);
               _this.getUserVerifyState(d.uid)
               _this.$router.push({
                 path: '/index',
               })
               Toast.clear();
             }
           })
      }
    },

    mounted() {},

    updated() {
      console.log('页面刷新了')
    },
    beforeDestory() {
      console.log('你确认删除XX吗？')
    },
    destroyed() {
      console.log('页面跳转了,当前组件已被删除，清空相关内容')
    },
    methods: {
      handleClick: function(e) {
        console.log(e)
      },
      //获取实名认证的状态s
      getUserVerifyState: function(u) {
        let uid = u || localStorage.getItem('uid');
        this.$http
          .get("api/upload/getUserCertData", {
            params: {
              uid: uid
            }
          }).then(res => {
            console.log(res)
            localStorage.setItem('verify_state', res.data.verify_state);
            localStorage.setItem("cert_id", res.data.cert_id);
            localStorage.setItem("real_name", res.data.real_name);
            localStorage.setItem("after_img", res.data.after_img);
            localStorage.setItem("front_img", res.data.front_img)
          })
      },
      //获取实名认证的状态e
    }
  };
</script>

<style lang="less">
</style>
