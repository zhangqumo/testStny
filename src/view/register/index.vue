<template>
  <div class="div_all register">
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
      }
    },
    //组件中的路由生命周期
    beforeRouteLeave(to, from, next) {
      console.log(from);
      next();
    },

    beforeRouteEnter(to, from, next) {
      console.log(from)
      next();
    },

    //组件的生命周期
    beforeCreate() {
      console.log('给个loading界面 created撤销loading');
      Toast.loading({
        mask: false,
        message: '加载中...'
      });
    },
    created() {
      let _this = this;
      let code = wxApi.getUrlParams().code;
      if(localStorage.getItem('token')){
        _this.$router.push({
          path: '/index',
        })
       return false
      }
      if (code) {
        //请求成功后关闭
        _this.$http.get('mzyl/wechat_api/register', {
          params: {
            code: code
          }
        }).then(res => {
          let d = res.data.data;
          localStorage.setItem('avatar', d.avatar || '');
          localStorage.setItem('token', d.token || '');
          localStorage.setItem('phone', d.phone || '');
          localStorage.setItem('nickname', d.nickname || '');
          localStorage.setItem('uid', d.uid || '');
          _this.$router.push({
            path: '/index',
          })
          Toast.clear();
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
    }
  };
</script>

<style lang="less">
</style>
