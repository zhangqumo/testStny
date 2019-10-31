<template>
  <div class="div_all returnsList">
    <div class="mt_10 p-r" v-for="(item,index) in list" :key="index" @click="handleDetails(item.order_id)">
        <div class='iconfont icon-tuikuanzhong p-a r_pa' v-if="item._status._type==-1"></div>
        <div class='iconfont icon-yituikuan p-a r_pa' v-if="item._status._type==-2"></div>
      <div class="r_order">订单号:{{item.order_id}}</div>
     <van-card v-for="(itemc,indexc) in item.cartInfo" :key="indexc" :num="itemc.cart_num" price="11" :desc="itemc.productInfo.attrInfo?itemc.productInfo.attrInfo.suk:itemc.productInfo.store_name" :title="itemc.productInfo.store_name" :thumb="itemc.productInfo.image">
        <div slot="footer">
          <div class="dis flex_y_center flex-x-end">
            <div>共{{item.cartInfo.length || 0}}件商品,总金额</div>
            <div class="fw_600 color_E93323 ml_5">{{item.pay_price}}</div>
          </div>
        </div>
      </van-card>
    </div>

  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    Card
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Card.name]: Card
    },

    props: {},

    data() {
      return {
        page: 1,
        limit: 100,
        orderStatus: -3, //订单状态
        list: []
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
      //获取退货详情s
      let data = {
        type:this.orderStatus,
        page:this.page,
        limit:this.limit
      }
      this.getPageDel(data)
      //获取退货详情e
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
      getPageDel(data) {
        this.$http
          .get("mzyl/user_api/get_user_order_list", {
            params: data
          }).then(res => {
            console.log(res)
            this.list = res.data.data
          })
      },
      handleDetails(id){
        this.$router.push({
          path: '/orderDetails',
          query: {
            id: id,
            isReturen:1
          }
        })
      }
    }
  };
</script>

<style lang="less">
  .returnsList {
    .r_order {
      padding: 0.5rem 0.8rem;
      font-size: 0.7rem;
      background: #fff;
    }

    .van-card:not(:first-child) {
      margin-top: 1px;
    }
    .r_pa{
          right: 1.1rem;
          top: 0px;
          color: #F8C2BE;
          font-size: 2.1rem;
          z-index: 100;
    }
  }
</style>
