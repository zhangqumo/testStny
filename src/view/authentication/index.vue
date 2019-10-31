<template>
  <div class="div_all  authentication">
    <!-- 认证成功部分s -->
    <van-cell-group>
      <van-cell title="姓名" :value="userInfo.nickname" />
      <van-cell title="身份证" :value="cert_id" />
      <van-cell title="认证状态" :value="verify_state?'已认证':'未认证'" />
      <van-cell title="手机号码" :value="userInfo.phone?userInfo.phone:''" />
      <van-cell title="ID号" :value="userInfo.uid" />
      <!-- <van-cell title="重置手机号" value="内容" /> -->
    </van-cell-group>

    <div class="plr_10 b_box">
      <van-button class="mt46" color="#E93323" type="danger" size="large" round @click="handleResult(0)" v-if="verify_state">查看认证详情</van-button>
      <van-button class="mt46" color="#E93323" type="danger" size="large" v-else round @click="handleResult(1)">去认证</van-button>
    </div>
    <!-- 认证成功部分e -->
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    AddressEdit,
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
      [AddressEdit.name]: AddressEdit,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
    },

    props: {},

    data() {
      return {
       userInfo:{},
       cert_id:'',
       verify_state:''
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
      this.cert_id = localStorage.getItem('cert_id');
      if(localStorage.getItem('verify_state')==1){
        this.verify_state = true
      }else{
         this.verify_state = false
      }
      this.getVerified()
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
      handleResult(i) {
        if (i == 0) {
          this.$router.push({
            path: '/result',
            // query: {
            //   id: pid
            // }
          })
          return false
        }
        if (i == 1) {
          this.$router.push({
            path: '/iDidentity',
            // query: {
            //   id: pid
            // }
          })
        }

      },
      //获取已认证的数据suser_api/get_my_user_info.html
      getVerified() {
        this.$http
          .get("mzyl/user_api/get_my_user_info.html", {

          }).then(res => {
            console.log(res)
            this.userInfo = res.data.data
          })
      }
      //获取已认证的数据e
    }
  };
</script>

<style lang="less">
  .authentication {
    .van-button--large {
      width: 100%;
      height: 2rem;
      line-height: 2rem;
    }
  }
</style>
