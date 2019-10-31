<template>
  <div class="div_all submitOrder" v-show="isPageShow">
    <div class="s_add">
      <van-cell-group class="goods-cell-group p_r" @click="handleAdd">
        <van-cell>
          <template slot="title">
            <!-- <div>{{moAddess}}</div> -->
            <!-- v-if="moAddess.length==0" -->
            <div class="dis flex_y_center flex_x_between" v-if='isPan'>
              <div> 设置默认收获地址</div>
              <van-icon name="arrow" />
            </div>
            <div v-else>
              <div class="dis flex_y_center fz_14 fw_600">
                <div>{{moAddess.real_name}}</div>
                <div class="ml_10">{{moAddess.phone}}</div>
              </div>
              <div class="dis flex_y_center fz_14">
                <div class="color_E93323" v-if="moAddess.is_default==1">[默认]</div>
                <div :class="moAddess.is_default==1?'ml_10':''">{{moAddess.sumAddess}}</div>
              </div>
              <div class="s_ico p_a">
                <van-icon name="arrow" />
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="goods-cell-group" v-show="!needCheck">
        <van-cell :value="verifyState?'已认证':'未认证'" is-link class='mtb_8' to="authentication" :class="verifyState?'':'s_ver'">
          <template slot="title">
            <span class="van-cell-text">实名认证状态</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell :title="`共 ${isLength}件商品`" />
      </van-cell-group>
      <van-cell-group v-for="(item,index) in list.cartInfo" :key="index">
        <van-cell value="">
          <template slot="title">
            <div class="dis flex_y_start">
              <div class="s_commodity">
                <img :src="item.productInfo.image" alt="">
              </div>
              <div class="s_price dis flex-dir-column">
                <div class="onelist-hidden pt_5">{{item.productInfo.store_name}}</div>
                <div v-if="item.productInfo.attrInfo" class="fz_12 s_price_font">{{item.productInfo.attrInfo.suk}}</div>
                <div class="pt_5 color_E93323">￥{{item.productInfo.price}}</div>
              </div>
              <div class="ml_10  pt_5">x{{item.cart_num}}</div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="goods-cell-group">
        <van-cell value="请选择" is-link class='mt_8'>
          <template slot="title">
            <span class="van-cell-text">优惠劵</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell value="免运费">
          <template slot="title">
            <span class="van-cell-text">快递费用</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell value="">
          <template slot="title">
            <span class="van-cell-text">备注信息</span>
            <div>
              <textarea maxlength='150' class="s_input" placeholder="请添加备注(150字以内)" v-model="notedata"></textarea>
            </div>
          </template>
        </van-cell>
      </van-cell-group>


      <van-cell-group class="goods-cell-group">
        <van-cell value="" class='mt_8'>
          <template slot="title">
            <span class="van-cell-text">支付方式</span>
            <div class="mt_20 s_pay dis flex_y_center flex_x_between">
              <div class="dis flex_y_center">
                <div class="iconfont icon-weixin2 s_imgWeixin"></div>
                <div class="ml_5 color_E93323">微信支付</div>
              </div>
              <div>默认微信支付</div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell value="" class='mt_8'>
          <template slot="title">
            <div class="s_fei">
              <div class="dis flex_y_center flex_x_between pb_5">
                <div>商品总价：</div>
                <div>￥{{totalPrice}}</div>
              </div>
              <div class="dis flex_y_center flex_x_between pb_5">
                <div>税费：</div>
                <div>￥{{taxPrice}}</div>
              </div>
              <div class="dis flex_y_center flex_x_between">
                <div>运费：</div>
                <div>￥0</div>
              </div>
            </div>

          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group s_flex">
        <van-cell>
          <template slot="title">
            <div class="dis flex_y_center flex_x_between s_flex2">
              <div class="dis flex_y_center">
                <div>合计：</div>
                <div class="color_E93323">￥{{sumPrice}}</div>
              </div>
              <div class="s_payBtn" @click="hanldeSettlement">
                立即结算
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

    </div>
    <!-- 地址弹出s -->
    <van-popup v-model="isShow" position="bottom">
      <div class="s_popup">
        <div class="dis flex_y_center flex-x-center p_r pb_20">
          <div class="fz_16 fw_600">选择地址</div>
          <div class="s_close p_a" @click="handleClose">
            <van-icon name="cross" />
          </div>
        </div>
        <div>
          <div class="dis flex_y_center ptb_10 s_border p-r" v-for="(item,index) in userAddess" :key="index" @click="handleAddTwo(userAddess,index)">
            <div class="s_addIcon iconfont icon-ditu" :style="item.is_flag==1?'color:#E93323':''"></div>
            <div class="dis flex-dir-column flex-x-center" :style="item.is_flag==1?'color:#E93323':''">
              <div class="fz_12 fw_600">{{item.real_name}} {{item.phone}}</div>
              <div class="fz_12 pt_5">{{item.sumAddess}}</div>
            </div>
            <div class="s_success p_a">
              <van-icon name="success" v-if="item.is_flag==1" />
            </div>
          </div>
        </div>

        <div class="s_xuan">
          <div class="s_xuan_add" @click="handleXuan">选择其他地址</div>
        </div>
      </div>
    </van-popup>
    <!-- 地址弹出e -->
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    ContactCard,
    ContactList,
    ContactEdit,
    CellGroup,
    Cell,
    Icon,
    Popup
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [ContactCard.name]: ContactCard,
      [ContactList.name]: ContactList,
      [ContactEdit.name]: ContactEdit,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell,
      [Icon.name]: Icon,
      [Popup.name]: Popup
    },

    props: {},

    data() {
      return {
        isShow: false,
        list: {},
        isPageShow: false,
        isLength: 0,
        totalPrice: '0.00',
        taxPrice: '0.00',
        sumPrice: '0.00',
        moAddess: {},
        userAddess: [],
        isPan: false,
        cartInfo: [],
        notedata: '',
        verifyState: false, //认证状态
        needCheck: false, //是否需要显示认证状态
        hasOuter: false, //订单中是否有进口商品
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
      let needId = this.$route.query.id || localStorage.getItem(nid);
      localStorage.setItem('nid', needId)
      if (Array.isArray(needId)) {
        console.log("数组")
        needId = needId.join(',')
      } else {
        needId = needId.toString()
      }
      //获取提交订单信息s
      this.$http
        .post("mzyl/auth_api/confirm_order.html", {
          cartId: needId
        }).then(res => {
          console.log(res)
          let list = res.data.data;
          this.list = list;
          let cartInfo = list.cartInfo;
          let taxPrice = 0;
          let totalPrice = 0;
          for (let i in cartInfo) {
            taxPrice += parseFloat(cartInfo[i].tax) * parseFloat(cartInfo[i].cart_num);
            totalPrice += parseFloat(cartInfo[i].productInfo.price) * parseFloat(cartInfo[i].cart_num);
            // console.log(cartInfo[i].tax)
          }
          this.sumPrice = (taxPrice + totalPrice).toFixed(2);
          this.taxPrice = taxPrice.toFixed(2);
          this.totalPrice = totalPrice.toFixed(2);
          this.isLength = list.cartInfo.length||'';
          this.cartInfo = list.cartInfo;
          this.pointId = parseInt(list.point_id);
          this.seckillId = parseInt(list.seckill_id);
          this.orderKey = list.orderKey;
          // console.log(list.cartInfo.length)
          if (res.data.data) {
            Toast.clear();
            this.isPageShow = true;
          } else {
            Toast({
              mask: false,
              message: '请刷新页面'
            });
          }
          //是否实名认证s
          this.getUserVerifyState();
          //是否实名认证e
        })
      //获取提交订单信息e
      //请求成功后关闭
      //获取地址
      this.getMoAddess();
      //所有地址
      this.getUserAddess();
      //获取公众号配置s
      this.getGongConfig()
      //获取公众号配置e
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
      // 公众号注入权限验证配置s
      getGongConfig() {
        const url = document.location.href; // 当前url
        console.log(url)
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
      // 公众号注入权限验证配置e
      handleClick: function(e) {
        console.log(e)
      },
      handleAdd() {
        this.isShow = true;
      },
      handleClose() {
        this.isShow = false;
      },
      handleXuan() {
        this.$router.push('address');
      },
      //获取默认地址user_api/user_default_address.html
      getMoAddess() {
        this.$http
          .get("mzyl/user_api/user_default_address.html", {
            params: {

            }
          }).then(res => {
            if (res.data.code == 200) {
              console.log(res.data.data)
              if (res.data.data.length != 0) {
                let sumAddess =
                  `${res.data.data.province+res.data.data.city+res.data.data.district+res.data.data.detail}`
                res.data.data.sumAddess = sumAddess;
                this.moAddess = res.data.data;
                this.isPan = false
              } else {
                this.isPan = true
                console.log("空")
              }

            }
          })
      },
      //所有地址user_api/user_address_list.html
      getUserAddess() {
        this.$http
          .get("mzyl/user_api/user_address_list.html", {
            params: {

            }
          }).then(res => {
            if (res.data.code == 200) {
              let list = res.data.data
              list.forEach((a, index, arr) => {
                let sumAddess = `${arr[index].province+arr[index].city+arr[index].district+arr[index].detail}`;
                arr[index].sumAddess = sumAddess;
                console.log(arr[index].is_default)
                if (arr[index].is_default == 1) {
                  arr[index].is_flag = 1
                } else {
                  arr[index].is_flag = 0
                }
              })
              console.log(list)
              this.userAddess = list
            }
          })
      },
      //选择地址
      handleAddTwo(arr, index) {
        arr.forEach((a) => {
          a.is_flag = 0
        })
        arr[index].is_flag = 1;
        this.userAddess = arr;
        this.moAddess = arr[index];
        this.isShow = false;
        this.isPan = false
      },
      hanldeSettlement() {
        let moAddess = this.moAddess;
        let data = {};
        console.log(this.cartInfo)
        if (moAddess.id == undefined) {
          Toast.fail("请选择收获地址")
          return false
        }
        //判断是否实名认证
        if (!this.verifyState) {
          Toast.fail("请先实名认证")
          return false
        }
        Toast.loading({
          mask: false,
          message: '支付中...'
        });
        data.addressId = moAddess.id;
        let getBargainId = this.getBargainId(this.cartInfo)
        data.bargainId = getBargainId.bargainId
        data.combinationId = getBargainId.combinationId
        data.pinkId = 0;
        data.couponId = 0;
        data.mark = this.notedata;
        data.payType = 'weixin';
        data.pointId = this.pointId;
        data.seckill_id = this.seckillId;
        data.key = this.orderKey;
        console.log(data)
        this.$http
          .post("mzyl/auth_api/create_order.html", data).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              let data = res.data.data.result;
              let orderId = data.orderId;
              let key = data.key;
              wx.ready(function() {
                wx.chooseWXPay({
                  timestamp: data.jsConfig.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  nonceStr: data.jsConfig.nonceStr, // 支付签名随机串，不长于 32 位
                  package: data.jsConfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                  signType: data.jsConfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  paySign: data.jsConfig.paySign, // 支付签名
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
              // Toast(res.data.msg)
            }
          })
        //失败
        //this.$router.push('paymentFailure');
      },

      /*
       * 提取砍价和拼团ids
       */
      getBargainId: function(cartInfo) {
        var bargainId = 0;
        var combinationId = 0;
        cartInfo.forEach(function(value, index, arr) {
          bargainId = arr[index].bargain_id
          combinationId = arr[index].combination_id
        })
        return {
          bargainId,
          combinationId
        }
      },
      /*
       * 提取砍价和拼团ide
       */
      //获取实名认证的状态s
      getUserVerifyState: function() {
        let verify_state = localStorage.getItem('verify_state'),
          cartInfo = this.cartInfo;
        let vstate = false;
        let needCheck = true;
        let hasOuter = false;
        if (verify_state == 1) {
          vstate = true
        }
        for (let i in cartInfo) {
          let is_othersource = cartInfo[i].productInfo.is_othersource;
          if (is_othersource == 1) {
            hasOuter = true;
            needCheck = false;
            this.verifyState = vstate;
            this.hasOuter = hasOuter;
          }
        }
        if (!hasOuter) {
          needCheck = true;
          this.needCheck = true;
        }
      },
      //获取实名认证的状态e

    }
  };
</script>

<style lang="less">
  .submitOrder {
    .s_imgWeixin {
      color: #FFFFFF;
      background: #41B035;
      height: 1.4rem;
      width: 1.4rem;
      border-radius: 50%;
      text-align: center;
      line-height: 1.4rem;
    }

    .s_ver {
      .van-cell__value {
        color: #E93323
      }
    }

    .s_add .goods-cell-group {
      margin: 0 !important;
    }

    .s_border {
      border-bottom: 1px solid #F1F1F1
    }

    .s_addIcon {
      height: 1rem;
      width: 1rem;
      margin-right: 1rem;
      text-align: center;
      line-height: 1rem;
    }

    .s_close {
      right: 0px;
      top: 0.15rem;
      font-size: 0.9rem;
    }

    .s_success {
      right: 0px;
      top: 0.9rem;
      font-size: 0.9rem;
      color: #E93323
    }

    .s_ico {
      top: 1.25rem;
      right: 0.7rem;
      color: #969799;
      font-size: 0.8rem;
    }

    .s_add {
      padding-bottom: 3.5rem;
    }

    .s_popup {
      // height: 100px;
      // border: 1px solid red;
      padding: 1rem 0.8rem;
      box-sizing: border-box;
    }

    .s_flex2 {
      width: 17.2rem;
    }

    .s_flex {
      position: fixed;
      bottom: 0;
    }

    .s_payBtn {
      padding: 0.3rem 0;
      width: 5rem;
      text-align: center;
      border-radius: 2.5rem;
      background: #E93323;
      color: #fff;
    }

    .s_pay {
      border-radius: 0.15rem;
      border: 1px solid #F44939;
      padding: 0.4rem 1.5rem;
      width: 17.2rem;
      box-sizing: border-box
    }

    .s_input {
      width: 17.2rem;
      height: 4rem;
      background: #F9F9F9;
      color: #000;
      border-radius: 0.15rem;
      margin-top: 0.5rem;
      box-sizing: border-box;
      padding: 0.5rem;

    }

    .s_xuan {
      padding: 1.5rem 0;
      padding-bottom: 0.5rem;

      &_add {
        border-radius: 1.5rem;
        background: #E93323;
        color: #fff;
        font-size: 0.7rem;
        text-align: center;
        padding: 0.6rem 0;
      }
    }

    .s_fei {
      width: 17.2rem;
    }

    .s_commodity {
      width: 3.2rem;
      height: 3.65rem;
      overflow: hidden;
      margin-right: 0.5rem;

      img {
        width: 3.2rem;
        height: 3.15rem;
        border-radius: 0.25rem;
      }
    }

    .s_price {
      width: 12rem;

      &_font {
        line-height: 0.5rem
      }
    }
  }
</style>
