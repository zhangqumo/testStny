<template>
  <div id="app" :class="`${$route.meta.isNav ? 'mt46' : ''}${$route.meta.isTab ? ' mb50' : ''}`" :style="appheight">
    <Header v-if='$route.meta.isNav'></Header>
    <router-view v-if='!$route.meta.keepAlive' />
    <!-- 缓存这个组件中所有的数据 -->
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive' />
    </keep-alive>
    <Tabbar v-if='$route.meta.isTab'></Tabbar>
    <!-- <Jump v-if='$route.meta.isJump'></Jump> -->
  </div>
</template>
<style lang="less">
</style>
<script>
  import Tabbar from '@/components/footer.vue'
  import Header from '@/components/header.vue'
  import Jump from '@/components/template.vue'
  export default {
    name: 'App',

    mixins: [],

    components: {
      Tabbar,
      Header,
      Jump
    },

    props: {},

    data() {
      return {
        appheight: {

        },
        code:'',

      }
    },
    computed: {},

    watch: {
      //监听路由变化
      $route(to, from) {
        console.log('监听路由变化')
        let _this = this;
        let isNav = to.meta.isNav;
        let isTab = to.meta.isTab;
        let h = document.documentElement.clientHeight;
        _this.getHeight(_this, h, isNav, isTab);
        // vue 切换页面/路由时保持滚动条在最顶部;因为切换路由实际上并不是切换页面而且改变了页面中的组件，所以滚动条的位置不变
        document.getElementById("app").scrollTop = 0;
      }
    },

    created() {

    },

    mounted() {},

    destroyed() {
      console.log('全局卸载')
    },

    methods: {
  
      getHeight: function(t, h, isNav, isTab) {
        if (isNav && isTab) {
          h = h - 96;
          t.appheight = {
            height: h + "px",
            overflow: 'scroll'
          };
          return false
        }
        // console.log(h)
        // console.log(isNav)
        if (isNav) {
          h = h - 46;
          t.appheight = {
            height: h + "px",
            overflow: 'scroll'
          };
          return false
        }
        // console.log(isTab)
        if (isTab) {
          h = h - 50;
          t.appheight = {
            height: h + "px",
            overflow: 'scroll'
          };
          return false
        }
        if(!isTab&&!isNav){
          t.appheight = {
            height: h + "px",
            overflow: 'scroll'
          };
           return false
        }
        // console.log(t.appheight)
      },

    }
  };
</script>
