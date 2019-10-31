<template>
  <div class="div_all order" :style="screenHeight">
    <!-- 头部文字部分s -->
    <div class="o_title b_box  dis flex_y_center flex_x_between">
      <div class="o_title_xinxi dis flex-dir-column">
        <div class="fw_600 fz_18 pb_5">订单信息</div>
        <div class="fz_12 pt_5">消费订单：{{orderNum.order_count || 0}} 总消费：￥{{orderNum.sum_price || 0}}</div>
      </div>
      <div class="o_title_img">
        <img src="../../assets/img/orderTime.png" alt="">
      </div>
    </div>
    <!-- 头部文字部分e -->

    <!-- 订单头部部分s -->
    <div class="o_orderTitle dis flex_y_center flex_x_between">
      <div @click="handlePay('0')" :class="type=='0'?'o_orderTitle_activity':''" class="p_r o_orderTitle_pay dis flex-dir-column flex-x-center flex_y_center">
        <div class="pb_5">待付款</div>
        <div>{{orderNum.unpaid_count || 0}}</div>
        <div class="p_a o_orderTitle_pa" v-if="type=='0'"></div>
      </div>
      <div @click="handlePay('1')" :class="type=='1'?'o_orderTitle_activity':''" class="p_r o_orderTitle_deliver dis flex-dir-column flex-x-center flex_y_center">
        <div class="pb_5">待发货</div>
        <div>{{orderNum.unshipped_count || 0}}</div>
        <div class="p_a o_orderTitle_pa" v-if="type=='1'"></div>
      </div>
      <div @click="handlePay('2')" :class="type=='2'?'o_orderTitle_activity':''" class="p_r o_orderTitle_receiving dis flex-dir-column flex-x-center flex_y_center">
        <div class="pb_5">待收货</div>
        <div>{{orderNum.received_count || 0}}</div>
        <div class="p_a o_orderTitle_pa" v-if="type=='2'"></div>
      </div>
      <div @click="handlePay('3')" :class="type=='3'?'o_orderTitle_activity':''" class="p_r o_orderTitle_evaluate dis flex-dir-column flex-x-center flex_y_center">
        <div class="pb_5">待评价</div>
        <div>{{orderNum.evaluated_count || 0}}</div>
        <div class="p_a o_orderTitle_pa" v-if="type=='3'"></div>
      </div>
      <div @click="handlePay('4')" :class="type=='4'?'o_orderTitle_activity':''" class="p_r o_orderTitle_refund dis flex-dir-column flex-x-center flex_y_center">
        <div class="pb_5">已完成</div>
        <div>{{orderNum.complete_count || 0}}</div>
        <div class="p_a o_orderTitle_pa" v-if="type=='4'"></div>
      </div>
    </div>
    <!-- 订单头部部分e -->

    <!-- 列表部分s -->
    <!-- 没用订单的时候s -->
    <div v-if="list.length==0" class="o_orderList">
      <div class="dis flex-dir-column  flex-x-center flex_y_center">
        <img class='o_orderList_oneimg' src="../../assets/img/noOrder.png" alt="">
      </div>
    </div>
    <!-- 没用订单的时候e -->

    <!-- 有订单的时候s -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check='false'>
      <!-- <van-cell  v-for="(item,index) in list" :key="index"> -->
      <div class="o_orderListHave" v-if="list.length!=0">
        <div class="o_orderListHave_order mb_10" @click="handleOrderDetails(item.order_id)" v-for="(item,index) in list" :key="index">
          <div class="dis flex_y_center flex_x_between fz_14 bg_fff b_box o_orderListHave_order_pay">
            <div class="color_424242">{{item._add_time}}</div>
            <div class="color_E93323">{{item.newStatus}}</div>
          </div>
          <div class="o_orderListHave_orderCenter p-r">
            <div class="dis" v-for="(child,cindex) in item.cartInfo" :key="child.index">
              <div class=" o_orderListHave_orderCenter_one">
                <img :src="child.productInfo.image" alt="">
              </div>
              <div class="twolist-hidden o_orderListHave_orderCenter_two fz_14 color_000">
                {{child.productInfo.store_name}}
              </div>
              <div class="fz_14  dis flex-dir-column o_orderListHave_orderCenter_three">
                <div>￥{{child.productInfo.price}}</div>
                <div>x{{child.cart_num}}</div>
              </div>
            </div>
            <div class=" dis flex-x-end flex_y_center pb_10">
              <div class="color_000 fz_14">共{{item.cartInfo.length || 0}}件商品，总金额</div>
              <div class="color_E93323 fw_600 fz_14">￥{{item.pay_price}}</div>
            </div>
            <div class="p-a o_orderListHave_orderCenter_four"></div>
          </div>
          <div class="o_orderListHave_orderBtn dis flex_y_center flex-x-end" @click.stop>
            <div class="o_orderListHave_orderBtn_one fz_14 color_424242" v-if="item._status._type==0" @click='handleCancelOrder(item.order_id,index)'>取消订单</div>
            <div class="ml_10 o_orderListHave_orderBtn_two fz_14 color_fff" v-if="item._status._type==0" @click="handleOrderDetails(item.order_id)">立即付款</div>
            <div class="o_orderListHave_orderBtn_one fz_14 color_424242 bg_color" v-else-if="item._status._type == 1" @click="handleLookDel(item.order_id)">查看详情</div>
            <div class="o_orderListHave_orderBtn_one fz_14 bg_E93323" style="color:#FFFFFF" v-else-if="item._status._type == 2&& item.delivery_type == 'express'" @click="handleLookDel(item.order_id)">查看详情</div>
            <div class="o_orderListHave_orderBtn_one fz_14 color_424242 bg_color" v-else-if="item._status._type == 3">去评价</div>
            <div class="o_orderListHave_orderBtn_one fz_14 color_424242 bg_color" v-else-if="item.seckill_id < 1 && item.bargain_id < 1 && item.combination_id < 1 && item._status._type == 4">再次购买</div>
            <div class="o_orderListHave_orderBtn_one fz_14 color_424242" v-else>删除订单</div>
          </div>
        </div>
      </div>
      <!-- </van-cell> -->
    </van-list>
    <!-- 有订单的时候e -->
    <!-- 列表部分e -->
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    Icon,
    List,
    Cell
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Icon.name]: Icon,
      [List.name]: List,
      [Cell.name]: Cell,
    },

    props: {},

    data() {
      return {
        type: 'pay',
        list: [],
        type: 0,
        page: 1,
        limit: 10,
        loading: false,
        finished: false,
        screenHeight: '',
        listFlagLength: 0,
        orderNum: {}
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
      let type = this.$route.params.type;
      this.getOrderNum(type, this.page, this.limit);
      if(type!=undefined){
         this.type =type
      }else{
        this.type =localStorage.getItem('typeTow');
      }

      // this.type =type?type:localStorage.getItem('typeTow');
      this.screenHeight = `height:${document.documentElement.clientHeight}px`
      this.getOrderPriceNum();
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
      //获取订单信息
      getOrderNum(type, page, limit, flag) {
        this.$http
          .get("mzyl/user_api/get_user_order_list.html", {
            params: {
              type,
              page,
              limit,
            }
          }).then(res => {
            console.log(res)
            let list = res.data.data || [];
            list.forEach((a, index) => {
              console.log(a._status._type)
              list[index].newStatus = a._status._type == 0 ? '待付款' : a._status._type == 1 ? '待发货' : a._status._type ==
                2 ? '待收货' : a._status._type == 3 ? '待评价' : '已完成'
            })

            if (flag == 1) {
              let newList = this.list.concat(list)
              this.list = newList;
              if (list.length < limit) {
                console.log('触发')
                this.loading = false;
                this.finished = true;
              }

            } else {
              this.list = list;

            }

            Toast.clear();
          })
      },
      handlePay(e) {
        console.log(e)
        this.type = e
        this.loading = false;
        this.finished = false;
        this.page = 1;
        this.getOrderNum(e, 1, this.limit)
      },
      handleOrderDetails(id) {
        this.$router.push({
          path: '/orderDetails',
          query: {
            id: id,
            type:this.type
          }
        })
      },
      onLoad() {
        let page = this.page + 1
        this.page = page
        this.getOrderNum(this.type, page, this.limit, 1);
      },
      // getauth_api/get_order_data.html
      getOrderPriceNum() {
        this.$http
          .get("mzyl/auth_api/get_order_data.html", {}).then(res => {
            console.log(res)
            let orderNum = res.data.data;
            console.log(res)
            this.orderNum = orderNum
          })

      },
      handleCancelOrder(order_id,index) {
        if(!order_id){
          Toast.fail('缺少订单号无法取消订单')
          return false
        }
        this.$http
          .get("mzyl/auth_api/cancel_order.html", {
            params: {
              order_id
            }
          }).then(res => {
            if(res.data.code==200){
              let list = this.list;
              list.splice(index, 1);
              this.list = list;
              let orderNum = this.orderNum;
              orderNum.unpaid_count = this.orderNum.unpaid_count-1
              this.orderNum =orderNum
               Toast.success('取消订单')
            }
          })
      },
      handleLookDel(id){
        this.$router.push({
          path: '/orderDetails',
          query: {
            id: id,
            type:this.type
          }
        })
      }
    }
  };
</script>

<style lang="less">
  .order {
    .o_title {
      background: #E93323;
      padding: 2rem 0.7rem;
      padding-bottom: 3rem;
      color: #fff;

      &_img {
        height: 3rem;
        width: 3rem;

        img {
          height: 3rem;
          width: 3rem;
        }
      }
    }

    .o_orderTitle {
      margin: 0 0.7rem;
      box-sizing: border-box;
      border-radius: 0.15rem;
      color: #424242;
      font-size: 0.7rem;
      padding: 0.7rem 0.7rem;
      background: #fff;
      position: relative;
      top: -1.8rem;

      &_activity {
        color: #000;
        font-weight: 600
      }

      &_pa {
        top: 2.85rem;
        left: 0px;
        border-bottom: 0.1rem solid #E93323;
        width: 2.15rem;
      }
    }

    .o_orderList {
      margin-top: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      &_oneimg {
        height: 9rem;
        width: 13rem;

      }
    }

    .o_orderListHave {
      position: relative;
      top: -1.35rem;
      margin: 0 0.7rem;
      // overflow: hidden;
      // height: 19.5rem;

      // border-radius: 0.15rem;
      &_order {
        border-top-right-radius: 0.15rem;
        border-top-left-radius: 0.15rem;

        &_pay {
          padding: 0.7rem;
        }

      }
      .bg_color{
        background: #E93323;
        color: #FFFFFF;
      }
      &_orderBtn {
        padding: 0 0.7rem 0.5rem 0;
        background: #fff;
        border-bottom-right-radius: 0.15rem;
        border-bottom-left-radius: 0.15rem;

        &_one {
          padding: 0.3rem 0;
          width: 5rem;
          text-align: center;
          border-radius: 2.5rem;
          border: 1px solid #EBEBEB;
          color: #A1A6B4;
          box-sizing: border-box;
        }

        &_two {
          padding: 0.3rem 0;
          width: 5rem;
          text-align: center;
          border-radius: 2.5rem;
          background: #E93323
        }
      }

      &_orderCenter {
        box-sizing: border-box;
        padding: 0.7rem;
        background: #fff;
        margin-top: 0.05rem;

        &_one {
          height: 3.4rem;
          width: 3.4rem;

          img {
            height: 3.4rem;
            width: 3.4rem;
          }
        }

        &_two {
          width: 7.05rem;
          height: 1.95rem;
          position: relative;
          left: 0.7rem;
        }

        &_three {
          align-items: flex-end;
          color: #A1A6B4;
          position: relative;
          right: -2.15rem
        }

        &_four {
          width: 15.9rem;
          height: 0.1rem;
          background: #F4F4F4;
          left: 1.45rem;
          right: 0px;
        }
      }
    }
  }
</style>
