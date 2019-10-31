<template>
  <div class="div_all paymentFailure">
    <!-- 订单支付失败图标s -->
    <div class="bg_fff b_box p_box">
      <div class="p_r dis flex-dir-column flex-x-center flex_y_center p_box_pr">
        <div class="iconfont icon-iconfontguanbi p_bg"></div>
        <div class="fz_16 color_000 mt_10 fw_600">订单支付失败</div>
      </div>
    </div>
    <!-- 订单支付失败图标e -->
    <div class="b_box  bg_fff p_list">
      <!-- 列表部分s -->
      <van-cell-group>
        <van-cell title="订单编号" value="内容" />
        <van-cell title="下单时间" value="内容" />
        <van-cell title="支付方式" value="内容" />
        <van-cell title="支付金额" value="内容" />
        <van-cell title="失败原因" value="内容" />
      </van-cell-group>
      <!-- 列表部分e -->
      <!-- 按钮部分s -->
      <div class="p_btn">
        <van-button type="default" round size="large" class="p_btn_one" color="#E93323">重新支付</van-button>
        <van-button type="default" round size="large" class="p_btn_two" @click="hanldeIndex">返回首页</van-button>
      </div>
      <!-- 按钮部分e -->
    </div>
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    Cell,
    CellGroup,
    Button
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
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
      console.log('页面初始化数据加载一般写这里')
      //请求成功后关闭
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
      hanldeIndex(){
         this.$router.push('index');
      }
    }
  };
</script>

<style lang="less">
  .paymentFailure {
    .van-button--large{
       height: 2.15rem;
       line-height: 2.15rem;
    }
    .p_list {
      margin: 0 1rem;
    }
    .p_btn{

      &_one{
        margin-top: 1.5rem;
      }
      &_two{
        color: #E93323;
        border: 1px solid #E93323;
        margin-top: 0.5rem;
      }
    }

    .p_box {
      margin: 5rem 1rem 0 1rem;

      &_pr {
        top: -1.65rem;
      }
    }

    .p_bg {
      color: #fff;
      background: #E93323;
      border-radius: 50%;
      height: 3rem;
      width: 3rem;
      line-height: 3rem;
      text-align: center;
      font-size: 1.6rem;
    }
  }
</style>
