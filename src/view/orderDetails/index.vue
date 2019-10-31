<template>
  <div class="div_all orderDetails">
    <!-- 给header上与data上加on为退款订单  注意-->
    <!-- 立即支付头部s -->
    <div class="o_payment b_box  dis flex_y_center color_fff" :style="isGoodsReturn?'background: #000000':''">
      <div class="o_payment_one">
        <img :src="list.status_pic" alt="" class="o_payment_one_img" v-if="isGoodsReturn==false">
      </div>
      <div class="o_payment_two dis flex-dir-column  ml_10">

        <div class="fz_14 fw_600">{{listStatus._msg}}</div>
        <div class="fz_12 pt_5">{{list.add_time_y}} {{list.add_time_h}}</div>
      </div>
    </div>
    <!--  立即支付头部e -->
    <div v-if="isGoodsReturn==false">
      <!-- 步骤条s -->
      <div class="o_steps pt_10 bg_fff">
        <van-steps :active="activeStatus" active-color='#E93323'>
          <van-step>待付款</van-step>
          <van-step>待发货</van-step>
          <van-step>待收货</van-step>
          <van-step>待评价</van-step>
          <van-step>已完成</van-step>
        </van-steps>
      </div>
      <!-- 步骤条 -->

      <!-- 地址s -->
      <div class="o_address  b_box mt_10 p-r">
        <van-contact-card />
        <div class="o_address_one dis flex-dir-column">
          <div class="color_000 fz_14">{{list.real_name}} {{list.user_phone}}</div>
          <div class="fz_14 mt_5">{{list.user_address}}</div>
        </div>
      </div>
      <!-- 地址e -->
    </div>
    <!-- 产品展示s -->
    <div class="o_productShow mt_10">
      <div class="o_productShow_one fz_14 color_000">共{{cartInfo.length}}件商品</div>
      <van-card :num="item.cart_num" :price="item.productInfo.attrInfo?item.productInfo.attrInfo.price:item.productInfo.price"
        :desc="item.productInfo.attrInfo?item.productInfo.attrInfo.suk:''" :title="item.productInfo.store_name" :thumb="item.productInfo.attrInfo?item.productInfo.attrInfo.image:item.productInfo.image"
        v-for="(item,index) in list.cartInfo" :key="index" />
    </div>
    <!-- 产品展示e -->

    <!-- 订单s -->
    <div class="o_productShow mt_10">
      <div class=" o_productShow_order">
        <div class="o_productShow_one o_productShow_two fz_14 color_000 dis flex_y_center flex_x_between">
          <div>订单编号:</div>
          <div class="dis flex_y_center">
            <div class="o_color9AA4B6" id="msg">{{list.order_id}}</div>
            <div class="o_copy color_000 ml_10" data-clipboard-target="#msg" @click="handleCopy">复制</div>
          </div>
        </div>
        <div class="o_productShow_one o_productShow_two fz_14 color_000 dis flex_y_center flex_x_between">
          <div>下单时间:</div>
          <div class="dis flex_y_center">
            <div class="o_color9AA4B6">{{list.add_time_y +' '+list.add_time_h}}</div>
          </div>
        </div>
        <div class="o_productShow_one o_productShow_two fz_14 color_000 dis flex_y_center flex_x_between">
          <div>支付状态:</div>
          <div class="dis flex_y_center">
            <div class="o_color9AA4B6">{{list.paid?'已支付':'未支付'}}</div>
          </div>
        </div>
        <div class="o_productShow_one o_productShow_two fz_14 color_000 dis flex_y_center flex_x_between">
          <div>支付方式:</div>
          <div class="dis flex_y_center">
            <div class="o_color9AA4B6">{{listStatus._payType}}</div>
          </div>
        </div>
        <div v-if="list.mark" class="o_productShow_one o_productShow_two fz_14 color_000 dis flex_y_center flex_x_between">
          <div>买家留言:</div>
          <div class="dis flex_y_center">
            <div class="o_color9AA4B6">{{list.mark}}</div>
          </div>
        </div>

        <!-- 退款订单详情 -->
      </div>

    </div>
    <!-- 订单e -->
    <!-- 退款订单详情s -->
    <div class="o_actually mt_10 fz_14 color_000  bg_fff" v-if="isGoodsReturn">
      <div class="dis flex_y_center flex_x_between pb_10">
        <div>收货人:</div>
        <div style="color:#9C9C9C">￥{{list.real_name}}</div>
      </div>
      <div class="dis flex_y_center flex_x_between pb_10 o_actually_line">
        <div>联系电话:</div>
        <div style="color:#9C9C9C">￥{{list.user_phone}}</div>
      </div>
      <div class="dis flex_y_center flex_x_between pb_10 o_actually_line">
        <div>收货地址:</div>
        <div style="color:#9C9C9C">{{list.user_address}}</div>
      </div>
    </div>
    <!-- 退款订单详情e -->
    <!-- 配送方式s -->
    <div class="o_actually mt_10 fz_14 color_000  bg_fff" style="padding-bottom: 0.4rem;" v-if="list.status!=0">
      <div v-if="list.delivery_type=='express'">
        <div class="dis flex_y_center flex_x_between pb_10">
          <div>配送方式:</div>
          <div style="color:#9C9C9C">发货</div>
        </div>
        <div class="dis flex_y_center flex_x_between pb_10">
          <div>快递公司:</div>
          <div style="color:#9C9C9C">{{list.delivery_name || ''}}</div>
        </div>
        <div class="dis flex_y_center flex_x_between pb_10">
          <div>快递号:</div>
          <div style="color:#9C9C9C">{{list.delivery_id || ''}}</div>
        </div>
      </div>
      <div v-else>
        <div class="dis flex_y_center flex_x_between pb_10">
          <div>收货人:</div>
          <div style="color:#9C9C9C">送货</div>
        </div>
        <div class="dis flex_y_center flex_x_between pb_10">
          <div>联系电话:</div>
          <div style="color:#9C9C9C">{{list.delivery_name || ''}}</div>
        </div>
        <div class="dis flex_y_center flex_x_between pb_10">
          <div>配送电话:</div>
          <div style="color:#9C9C9C">{{list.delivery_id || ''}}</div>
        </div>
      </div>
    </div>
    <!-- 配送方式e -->
    <!-- 实付价格s -->
    <div class="o_actually mt_10 fz_14 color_000  bg_fff">
      <div class="dis flex_y_center flex_x_between pb_10">
        <div>商品总额:</div>
        <div style="color:#9C9C9C">￥{{list.total_price}}</div>
      </div>
      <div class="dis flex_y_center flex_x_between pb_10 o_actually_line">
        <div>税费:</div>
        <div style="color:#9C9C9C">￥{{list.tax}}</div>
      </div>
      <div class="dis flex_y_center flex_x_between pb_10 o_actually_line" v-if='list.coupon_id'>
        <div>优惠券抵扣:</div>
        <div style="color:#9C9C9C">￥{{list.coupon_price}}</div>
      </div>
      <div class="dis flex_y_center flex_x_between pb_10 o_actually_line" v-if='list.use_integral > 0'>
        <div>积分抵扣:</div>
        <div style="color:#9C9C9C">￥{{list.deduction_price}}</div>
      </div>
      <div class="dis flex_y_center flex_x_between pb_10 o_actually_line" v-if='list.pay_postage > 0'>
        <div>运费:</div>
        <div style="color:#9C9C9C">￥{{list.pay_postage}}</div>
      </div>

      <div class="dis flex_y_center flex_x_end pt_10">
        <div>实付款:</div>
        <div class="fw_600 color_E93323 ml_10">￥{{list.pay_price}}</div>
      </div>
    </div>
    <!-- 实付价格e -->
    <!-- 退款订单详情s -->
    <!-- 退款订单详情e -->
    <!-- 底部支付按钮s -->
    <div class="o_payBtn bg_fff b_box dis flex-x-end" v-if="isGoodsReturn==false">
      <div v-if="statusObj.type==0" class="c_btn ml_10" @click="handlePayment ">立即付款</div>
      <div v-else-if="statusObj.type==1" class="c_btn ml_10 c_bg_font" @click="handleTui">申请退款</div>
      <div v-if="statusObj.class_status==1" class="c_btn ml_10">查看拼团</div>
      <div v-if="statusObj.class_status==3 && statusObj.type==2" class="c_btn ml_10 c_bg_font">查看物流</div>
      <div v-if="statusObj.class_status==3" class="c_btn ml_10" @click="handleAffirm">确认收货</div>
      <div v-if="statusObj.type==4" class="c_btn ml_10 c_bg_font">删除订单</div>
      <div v-if="statusObj.class_status==5" class="c_btn ml_10">再次购买</div>
    </div>
    <!-- 底部支付按钮e -->

    <!-- 底部支付弹出框s -->
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
    <!-- 底部支付弹出框e -->
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import {
    Swipe,
    SwipeItem,
    Toast,
    Step,
    Steps,
    ContactCard,
    ContactList,
    ContactEdit,
    Card,
    ActionSheet,
    Dialog
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Step.name]: Step,
      [Steps.name]: Steps,
      [ContactCard.name]: ContactCard,
      [ContactList.name]: ContactList,
      [ContactEdit.name]: ContactEdit,
      [Card.name]: Card,
      [ActionSheet.name]: ActionSheet,

    },

    props: {},

    data() {
      return {
        show: false,
        list: {},
        activeStatus: 0,
        statusObj: {},
        listStatus: {},
        isGoodsReturn: false, //是否为退款订单
        cartInfo: [],
        actions: [{
            name: '微信支付'
          },


        ]
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
      localStorage.setItem('typeTow', this.$route.query.type)
      let id = this.$route.query.id;
      let isReturen = this.$route.query.isReturen;
      if (isReturen) {
        this.isGoodsReturn = true
      }
      this.getOrderInfo(id)
      this.getGongConfig()
    },

    mounted() {},

    updated() {
      console.log('页面刷新了')
    },
    beforeDestory() {
      console.log('你确认删除XX吗？')
    },
    destroyed() {
      console.log('页面跳转了,当前组件已被删除，清空相关内容');

    },
    methods: {
      handleClick: function(e) {
        console.log(e)
      },
      getOrderInfo(id) {
        // 获取详情s
        this.$http
          .get("mzyl/user_api/get_order.html", {
            params: {
              uni: id
            }
          }).then(res => {
            console.log(res.data.data)

            if (res.data.code == 200) {
              this.list = res.data.data;
              this.activeStatus = res.data.data._status._type;
              this.cartInfo = res.data.data.cartInfo;
              this.listStatus = res.data.data._status;
              this.getOrderStatus(res.data.data)

              Toast.clear()
            }

          })
        //获取详情e
      },
      //设置订单s
      getOrderStatus(list) {
        console.log(list)
        let orderInfo = list || {};
        let _status = orderInfo._status || {
          _type: 0
        };
        let status = {};
        var type = parseInt(_status._type),
          combination_id = orderInfo.combination_id || 0,
          delivery_type = orderInfo.delivery_type,
          seckill_id = orderInfo.seckill_id ? parseInt(orderInfo.seckill_id) : 0,
          bargain_id = orderInfo.bargain_id ? parseInt(orderInfo.bargain_id) : 0,
          combination_id = orderInfo.combination_id ? parseInt(orderInfo.combination_id) : 0;
        status = {
          type: type,
          class_status: 0
        };
        if (type == 1 && combination_id > 0) status.class_status = 1; //查看拼团
        if (type == 2 && delivery_type == 'express') status.class_status = 2; //查看物流
        if (type == 2) status.class_status = 3; //确认收货
        if (type == 4 || type == 0) status.class_status = 4; //删除订单
        if (!seckill_id && !bargain_id && !combination_id && (type == 3 || type == 4)) status.class_status = 5; //再次购买
        this.statusObj = status;
      },
      //设置订单微信支付e
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        console.log("支付触发")
        this.show = false;
        if (!item.name) {
          return false
        }
        Toast.loading({
          mask: false,
          message: '支付中...'
        });
        this.$http
          .get("mzyl/auth_api/pay_order", {
            params: {
              uni: this.list.order_id,
              paytype: 'weixin'
            }
          }).then(res => {
            console.log(res)
            let data = res.data.data.result.jsConfig;
            console.log(data)
            wx.ready(function() {
              wx.chooseWXPay({
                timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: function(res) {
                  // 这里写成功后的动作 我试过跳转路由好像不灵 或者是执行太快后端处理订单未变化呢 我改成了这个   window.location.href="你所要跳转的页面";
                  Toast('支付成功')
                  Toast.clear();
                },
                cancel: function(res) {
                  // alert('已取消支付');
                  Toast('取消支付')
                  Toast.clear();
                },
                fail: function(res) {
                  // alert('购买失败，请重新创建订单')
                  Toast('取消支付')
                  Toast.clear();
                }
              });
            })
          })

        // Toast(item.name);
      },
      //设置订单微信支付e
      handlePayment() {

        this.show = true;
      },
      handleCopy() {
        let clipboard = new Clipboard('.o_copy')
        clipboard.on('success', e => {
          console.log('copy success')
          clipboard.destroy() //使用destroy可以清楚缓存
        })
        clipboard.on('error', e => {
          console.log('failed')
          clipboard.destroy()
        })
      },
      //退款s
      handleTui() {
        let id = this.list.order_id;
        this.$router.push({
          path: '/cargoTui',
          query: {
            id: id
          }
        })
      },
      //退款e
      //确认收货s
      handleAffirm() {
        let id = this.list.order_id;
        let _this = this;
        Dialog.confirm({
          title: '确认收货',
          message: '为保障权益，请收到货确认无误后，再确认收货'
        }).then(() => {
          // on confirm
          console.log("成功")
          this.$http
            .get("mzyl/user_api/user_take_order", {
              params: {
                uni: id
              }
            }).then(res => {
              // console.log(res)
              this.getOrderInfo(id)
            })
        }).catch(() => {
          // on cancel
        })
      },
      //确认收货e
      //测试s
      //微信支付封装s
      getWxAuthority() {

      },
      //微信支付封装e
      //授权s
      getGongConfig() {
        const url = document.location.href; // 当前url
        this.$http
          .get("mzyl/wechat_api/getSignPackage", {
            params: {
              url: url
            }
          }).then(res => {
            console.log(res)
            let data = res.data;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名，见附录1
              jsApiList: [
                'chooseWXPay'
              ]
            })
          })
      },
      //授权e
    }
  };
</script>

<style lang="less">
  .orderDetails {
    padding-bottom: 3.5rem;

    .c_btn {
      padding: 0.3rem 0;
      width: 4rem;
      text-align: center;
      border-radius: 2.5rem;
      background: #E93323;
      color: #fff;
      font-size: 0.7rem
    }

    .o_payBtn {
      padding: 0.5rem 0.8rem;
      position: fixed;
      bottom: 0;
      width: 100%;
    }

    .o_actually {
      padding: 0.8rem;
      box-sizing: border-box;

      &_line {
        border-bottom: 1px solid #F0F0F0
      }
    }

    .o_color9AA4B6 {
      color: #9C9C9C;
    }

    .o_copy {
      border: 1px solid #797979;
      padding: 0.05rem 0.15rem;
      font-size: 0.6rem !important;
    }

    .van-card:not(:first-child) {
      margin-top: 0;
    }

    .van-card {
      background: #fff;
    }

    .o_productShow {
      &_order {
        padding: 0.8rem 0;
        background: #fff;
        padding-bottom: 0.4rem
      }

      &_one {
        box-sizing: border-box;
        border-bottom: 1px solid #F4F4F4;
        padding: 0.8rem;
        background: #fff;
      }

      &_two {
        border: none;
        padding: 0 0.8rem;
        padding-bottom: 0.4rem
      }
    }

    .o_address_one {
      position: absolute;
      width: 100%;
      height: 4rem;
      top: 0px;
      left: 0px;
      box-sizing: border-box;
      padding: 1rem 0.8rem;
    }

    .van-cell__left-icon,
    .van-cell__right-icon,
    .van-contact-card--add .van-contact-card__value {
      display: none
    }

    .van-contact-card {
      padding: 2rem;
      box-sizing: border-box;
    }

    .o_payment {
      background: #E93323;
      padding: 0.5rem 1rem;

      &_one {
        height: 2.6rem;
        // width: 2.6rem;
        border-radius: 50%;

        &_img {
          height: 2.6rem;
          width: 2.6rem;
          border-radius: 50%;
        }
      }
    }

    .van-step--finish .van-step__circle,
    .van-step--finish .van-step__line {
      background-color: #E93323
    }

    .van-steps--horizontal {
      padding: 0 1rem;
    }

    .c_bg_font {
      background: #FFFFFF;
      color: #AAAAAA;
      border: 1px solid #AAAAAA;
    }
  }
</style>
