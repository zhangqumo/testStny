<template>
  <div class="footer">
    <van-tabbar v-model="active" active-color="#f44" inactive-color="#000" route>
      <van-tabbar-item icon="home-o" replace to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" replace to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" replace to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" replace to="/user">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import {
    Tabbar,
    TabbarItem
  } from 'vant';
  export default {
    name: "Tabbar",
    mixins: [],
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
    },

    props: {},

    data() {
      return {
        active: 0,

      }
    },

    computed: {},

    watch: {},

    created() {
      let _this = this,
        active = '';
      switch (_this.$route.path) {
        case '/index':
          active = 0;
          break;
        case '/classify':
          active = 1;
          break;
        case '/cart':
          active = 2;
          break;
        case '/user':
          active = 3;
          break;
      }
      _this.active = active
    },

    mounted() {},

    destroyed() {},

    methods: {}
  };
</script>

<style lang="less">
  .footer {
    .van-tabbar {
      height: 2.5rem;
      box-sizing: border-box;
      border-top: 1px solid #ddd;
    }
  }
</style>
