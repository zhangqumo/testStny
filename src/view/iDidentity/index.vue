<template>
  <div class="div_all iDidentity">
    <div class="i_boxOne fz_14">
      <div>为保障厂家及经济人的自身的合法权益</div>
      <div>经济人须上传身份证照片进行实名认证</div>
    </div>

    <div class="i_boxTwo fz_14">
      <div>身份证照片(正面)</div>
      <div class="dis flex_y_center mt_10">
        <img :src="shenfen" alt="" class="i_boxTwo_img1">
        <img src="../../assets/img/shenfen1.jpg" alt="" class="i_boxTwo_img2">
      </div>
    </div>

    <div class="i_boxTwo fz_14">
      <div>身份证照片(背面)</div>
      <div class="dis flex_y_center mt_10">
        <img :src="shenfenf" alt="" class="i_boxTwo_img1">
        <img src="../../assets/img/shenfen2.jpg" alt="" class="i_boxTwo_img2">
      </div>
    </div>

    <div class="i_boxThree fz_14">
      <div>拍摄时注意光线和焦距,务必保持照片清晰</div>
      <van-button type="default" size="large" color="#C24E4E" @click='handleVerify(shenfen,shenfenf)'>提交验证</van-button>
    </div>
  </div>
</template>

<script>
  import imgTow from '@/assets/img/shenfen.png';
  import base64 from '@/assets/js/base64.js';
  import {
    Swipe,
    SwipeItem,
    Toast,
    Button
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Button.name]: Button,
      [Toast.name]: Toast,
    },

    props: {},

    data() {
      return {
        shenfen: imgTow,
        shenfenf: imgTow,
        userInfo:{}
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
      Toast.clear();
      this.getUserInfo()
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
      //获取用户信息s
      getUserInfo() {
        this.$http
          .get("mzyl/user_api/get_my_user_info", {
          }).then(res => {
            console.log(res)
            this.userInfo = res.data
          })
      },
      //获取用户信息e
      handleClick: function(e) {
        console.log(e)
      },
      handleVerify(img1, img2) {
        if (this.shenfen == img1) {
          Toast.fail('请上传证件正面照');
          return false
        }
        if (this.shenfenf == img2) {
          Toast.fail('请上传证件背面照');
          return false
        }
        Toast.loading({
          mask: false,
          message: '身份认证中...'
        });
        //请求成功后关闭
        Toast.clear();
      }
    }
  };
</script>

<style lang="less">
  .iDidentity {
    padding-bottom: 6rem;

    .i_boxOne {
      border-radius: 0.25rem;
      background: #DCDCDC;
      width: 17.5rem;
      padding: 1rem 0 1rem 0.5rem;
      box-sizing: border-box;
      margin: auto;
      margin-top: 0.5rem;
    }

    .i_boxTwo {
      margin-top: 1.75rem;
      padding: 0 1rem;
      box-sizing: border-box;

      &_img1 {
        width: 7rem;
        height: 4.5rem;
        margin-right: 1.5rem;
        margin-left: 2rem;

      }

      &_img2 {
        width: 5.5rem;
        height: 3.5rem;
      }
    }

    .i_boxThree {
      background: #DCDCDC;
      width: 17.5rem;
      box-sizing: border-box;
      padding: 1rem;
      padding-bottom: 2.5rem;
      margin: auto;
      margin-top: 2.5rem;

      .van-button--large {
        width: 90%;
        height: 2.15rem;
        line-height: 2.15rem;
        margin: 1.5rem 0 0 1.5rem;

      }
    }
  }
</style>
