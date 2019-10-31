<template>
  <div class="div_all templateTwo bg_fff mt_10">
    <div class="t_noneList">
      <!-- 没有购物列表s -->
      <div class="dis flex_y_center flex-x-center">
        <img src="../assets/img/noCart.png" alt="" class="c_noCartImg">
      </div>
      <!-- 没有购物列表e -->
      <div class="dis flex_y_center flex-x-center">
        <div class='iconfont icon-zhuangshixian t_lefticon'></div>
        <div class='t_name fz_14'>为你推荐</div>
        <div class='iconfont icon-zhuangshixian t_lefticon rotate_180'></div>
      </div>

      <van-grid :column-num="2" class="pb_20 fz_14 p-r t_box">
        <van-grid-item v-for="(item,index) in list" :key="index" :to="{path: '/goods', query:{id:item.id}}">
          <img :src="item.image" alt="" class="t_img">
          <div class="mt_10 onelist-hidden t_width">{{item.store_name}}</div>
          <div class="color_E93323">{{item.price}}</div>
        </van-grid-item>

      </van-grid>
    </div>
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    Grid,
    GridItem
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem
    },

    props: {},

    data() {
      return {
        list:[]
      }
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
      // Toast.loading({
      //   mask: false,
      //   message: '加载中...'
      // });
    },
    created() {
      console.log('页面初始化数据加载一般写这里')
      //获取没有时的数据s
      this.$http
        .get("mzyl/public_api/get_hot_product.html", {
          params: {
            offset: 1,
            limit: 4
          }
        }).then(res => {
          console.log(res)
          if(res.data.code==200){
            this.list = res.data.data
          }
        })
      //获取没有时的数据e
      //请求成功后关闭
      // Toast.clear()
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
  .templateTwo {
    .c_noCartImg {
      width: 11.45rem;
      height: 9.7rem;
    }

    .t_box {
      top: -1.2rem;
    }

    .t_lefticon {
      font-size: 4.2rem;
      color: #C7C7C7;
    }

    .t_width {
      width: 7.65rem;
    }

    .t_img {
      width: 7.65rem;
      height: 8.2rem;
    }

    .van-grid-item__content {
      padding-bottom: 0px;

    }
  }
</style>
