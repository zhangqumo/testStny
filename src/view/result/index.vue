<template>
  <div class="div_all result">
    <!-- 成功结果s -->
    <div class="dis flex-dir-column flex_y_center flex-x-center">
      <img src="../../assets/img/balance.png" alt="" class="r_img">
      <div class="fz_16 fw_600 color_000">恭喜，实名认证成功</div>
    </div>
    <div class="fz_14 mt_20">
      <div class="dis flex_y_center r_box">
        <div class="r_name color_000">姓名</div>
        <div>{{urserInfo.real_name}}</div>
      </div>
      <div class="dis flex_y_center r_box">
        <div class="r_name color_000">身份证号</div>
        <div>{{urserInfo.cert_id}}</div>
      </div>
    </div>

    <div class="dis flex_y_center fz_14 color_000 flex_x_between ov w_all b_box pt_5">
      <div class="dis flex-dir-column r_shengBox">
        <img :src="urserInfo.front_img" alt="" class="r_sheng">
        <div class="mt_10">添加身份证正面（头像）</div>
      </div>
      <div class="dis flex-dir-column r_shengBox">
        <img :src="urserInfo.after_img" alt="" class="r_sheng">
        <div class="mt_10">添加身份证反面（国徽）</div>
      </div>
    </div>
    <!-- 成功结果e -->
  </div>
</template>

<script>
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
      return {
        urserInfo: {}
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
      Toast.loading({
        mask: false,
        message: '加载中...'
      });
    },
    created() {
      console.log('页面初始化数据加载一般写这里')
      //请求成功后关闭
      //获取数据s
      let urserInfo = {
        'cert_id': localStorage.getItem('cert_id'),
        'real_name': localStorage.getItem('real_name'),
        'after_img': localStorage.getItem('after_img'),
        'front_img': localStorage.getItem('front_img')
      }

      this.urserInfo = urserInfo;
      //获取数据e
      Toast.clear()
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
  .result {
    .r_img {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
    }

    .r_box {
      border-bottom: 1px solid darkgrey;
      padding: 0.5rem;

      .r_name {
        width: 4.5rem
      }
    }

    .r_shengBox {
      align-items: center;
      justify-content: center;
      width: 9.35rem;
    }

    .r_sheng {
      height: 5.6rem;
      width: 9.35rem;
    }

  }
</style>
