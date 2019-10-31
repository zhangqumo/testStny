<template>
  <div class="header">
    <van-nav-bar v-if="$route.meta.isBlack" :class="$route.meta.bg?'bg':'bg2'" left-arrow @click-left="onClickLeft"
      :fixed='true' :title="$route.meta.title">
    </van-nav-bar>
    <van-nav-bar v-else :class="$route.meta.bg?'bg':''" :title="$route.meta.title" :fixed='true'>
    </van-nav-bar>
  </div>
</template>
<script>
  import {
    NavBar,
    Icon
  } from 'vant';
  export default {
    name: 'Header',

    mixins: [],

    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
    },

    props: {},

    data() {
      return {}
    },

    computed: {

    },

    watch: {},

    created() {

    },

    mounted() {},

    destroyed() {},

    methods: {
      handleClick: function(e) {
        console.log(e)

      },
      onClickLeft() {
        // Toast('返回');
        console.log('返回')
        this.$router.go(-1);
      },
      // onClickRight() {
      // 	// Toast('按钮');
      // }
    }
  };
</script>

<style scoped lang="less">
.van-hairline--bottom::after{
   border-bottom-width:0px!important;
}
  .header {
    .bg .van-hairline--bottom::after, .bg2 .van-hairline--bottom::after,.van-hairline--bottom::after {
      border-bottom-width:0px!important;
    }

    .bg .van-nav-bar__title {
      color: #fff;
    }

    .bg2 .van-icon-arrow-left:before {
      color: #000 !important;
    }

    .van-nav-bar__title {
      font-weight: 600
    }

    .van-nav-bar .van-icon {
      color: #fff;
    }

    .van-nav-bar__left {
      left: 0.4rem;
    }

    .van-nav-bar {
      height: 2.3rem;
      line-height: 2.3rem;
    }

    .bg {
      background: #E93323;
    }
  }
</style>
