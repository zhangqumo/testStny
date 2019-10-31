<template>
  <div class="user" v-show="isPageShow">
    <!-- 背景图片s -->
    <div class="u_bg p_r">
      <div class="u_bg_box dis flex_y_center">
        <div class="u_bg_box_title">
          <img :src="userImg" alt="" class="u_bg_box_userImg">
        </div>
        <div class="u_bg_box_box1 color_fff fz_14 ml_20">
          <div class="pb_5">{{userName}}</div>
          <div class="pt_5">
            <div class="iconfont icon-bianji1"></div>
          </div>
        </div>
      </div>
      <div class="u_bg_set color_fff dis_flex flex-x-end">
        <div class="iconfont icon-shezhi"></div>
      </div>
    </div>
    <!-- 背景图片e -->

    <!-- 总分类s -->
    <div class="u_classify p_r  b_box">
      <!-- 分类列表1s -->
      <div class="u_classify_one   bg_fff fz_14 color_B4B4B4 dis_flex flex_y_center flex-x-center">
        <div class="dis flex_dir_column flex_y_center u_classify_one_link">
          <div class="pb_5">当前佣金</div>
          <div class="dis flex_y_end">
            <div class="color_E93323 ">￥</div>
            <div class="color_000  fz_16">{{isIntegral.brokerage}}</div>
          </div>
        </div>
        <div class="dis flex_dir_column flex_y_center u_classify_one_link u_classify_one_border">
          <div class="pb_5">我的积分</div>
          <div class="dis flex_y_end">
            <div class="color_000  fz_16">{{isIntegral.integral}}</div>
          </div>
        </div>
        <div class="dis flex_dir_column flex_y_center u_classify_one_link">
          <div class="pb_5">优惠券</div>
          <div class="dis flex_y_end">
            <div class="color_000  fz_16">{{isIntegral.couponCount}}</div>
          </div>
        </div>
      </div>
      <!-- 分类列表1e -->

      <!-- 分类列表2s -->
      <div class="u_classify_two bg_fff fz_14 color_000 mt_10 dis flex_y_center flex_x_between " @click="handleOrder(0)">
        <div class="u_classify_two_order fz_16">我的订单</div>
        <div class="dis flex_y_center fz_14">
          <div class="fz_14">全部订单</div>
          <van-icon name="arrow" />
        </div>
      </div>

      <van-grid :column-num="5" clss='fz_12'>
        <van-grid-item :to="{ name: 'order', params: {type: 0}}" class="p-r">
          <img src="../../assets/img/dfk.png" alt="" class="u_one">
          <div class="pt_5 fz_12">待付款</div>
          <div class="p-a u_ab" v-if="numObj.unpaid_count!=0">{{numObj.unpaid_count}}</div>
        </van-grid-item>
        <van-grid-item :to="{ name: 'order', params: {type: 1}}" class="p-r">
          <img src="../../assets/img/dfh.png" alt="" class="u_one">
          <div class="pt_5 fz_12">待发货</div>
          <div class="p-a u_ab" v-if="numObj.unshipped_count!=0">{{numObj.unshipped_count}}</div>
        </van-grid-item>
        <van-grid-item :to="{ name: 'order', params: {type: 2}}" class="p-r">
          <img src="../../assets/img/dsh.png" alt="" class="u_one">
          <div class="pt_5 fz_12">待收货</div>
          <div class="p-a u_ab" v-if="numObj.received_count!=0">{{numObj.received_count}}</div>
        </van-grid-item>
        <van-grid-item :to="{ name: 'order', params: {type: 3}}" class="p-r">
          <img src="../../assets/img/dpj.png" alt="" class="u_one">
          <div class="pt_5 fz_12">待评价</div>
          <div class="p-a u_ab" v-if="numObj.evaluated_count!=0">{{numObj.evaluated_count}}</div>
        </van-grid-item>
        <van-grid-item :to="{ name: 'order', params: {type: 4}}">
          <img src="../../assets/img/sh.png" alt="" class="u_one">
          <div class="pt_5 fz_12">售后/退款</div>
        </van-grid-item>
      </van-grid>
      <!-- 分类列表2e -->

      <!-- 分类列表3s -->
      <div class="u_classify_two bg_fff fz_14 color_000 mt_10 dis flex_y_center flex_x_between">
        <div class="u_classify_two_order fz_16">我的服务</div>
      </div>
      <van-row class="user-links">
        <van-grid>
          <van-grid-item text="文字" to="/address">
            <van-image src="https://cst.stnyhb.com/public/uploads/attach/2019/07/29/5d3f0a79793bd.png" class="user-links-img" />
            <div class="mt_5">地址信息</div>
          </van-grid-item>
        </van-grid>
      </van-row>
      <!-- 分类列表3e -->
    </div>
    <!-- 总分类e -->
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Icon,
    Cell,
    CellGroup,
    Grid,
    GridItem,
    Image,
    Toast,
  } from 'vant';

  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [Image.name]: Image,
      [Toast.name]: Toast,
    },
    props: {},

    data() {
      return {
        userImg: '',
        userName: '',
        numObj: {},
        isIntegral: '',
        isPageShow: false,
      }
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    computed: {},

    watch: {},
    beforeCreate() {
      Toast.loading({
        mask: false,
        message: '加载中...'
      });
    },
    created() {
      this.userImg = localStorage.getItem('avatar');
      this.userName = localStorage.getItem('nickname');
      //订单信息
      this.getOrderData();

    },
    // this.isPageShow = true;
    mounted() {},

    destroyed() {},
    updated() {
      console.log('页面刷新了')
    },
    methods: {
      handleClick: function(e) {
        console.log(e)
      },
      getMynum(callback) {
        this.$http
          .get("mzyl/user_api/my.html", {
            params: {

            }
          }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              this.isIntegral = res.data.data;
              callback && callback();
            }

          })
      },
      getOrderData() {
        let _this = this;
        _this.$http
          .get("mzyl/auth_api/get_order_data.html", {
            params: {

            }
          }).then(res => {
            if (res.data.code == 200) {
              //积分信息
              _this.numObj = res.data.data;
              console.log(res)
              _this.getMynum(function() {
                _this.isPageShow = true;
                console.log("异步")
              });
              Toast.clear()
            }
          })
      },
      handleOrder(e) {
        this.$router.push({
          name: 'order',
          params: {
            type: e
          }
        });
      }
    }
  };
</script>

<style lang="less">
  .user {
    .u_one {
      width: 1.35rem;
      height: 1.1rem;
    }

    .u_ab {
      top: 0.85rem;
      right: 1.25rem;
      box-sizing: border-box;
      min-width: 16px;
      padding: 0 3px;
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
      line-height: 14px;
      text-align: center;
      background-color: #E93323;
      border: 1px solid #fff;
      border-radius: 16px;
      -webkit-transform: translate(50%, -50%);
      transform: translate(50%, -50%);
      -webkit-transform-origin: 100%;
      transform-origin: 100%;
      z-index: 100;
    }

    .van-col--4 {
      width: 19.666667%;
    }

    .u_classify {
      margin: 0 0.5rem;
      top: -1.9rem;
      border-radius: 0.3rem;
      overflow: hidden;

      &_one {
        box-sizing: border-box;
        padding: 1rem 0;
        border-radius: 0.3rem;

        &_link {
          padding: 0 1.4rem;
        }

        &_border {
          border-right: 0.05rem solid #b4b4bf;
          border-left: 0.05rem solid #b4b4bf;
        }
      }

      &_two {
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        box-sizing: border-box;
        padding: 0.5rem 0.75rem;
        border-bottom: 0.1rem dashed #f4f4f4;
      }
    }

    .u_bg {
      background: #E93323;
      border-bottom-right-radius: 1rem;
      border-bottom-left-radius: 1rem;
      box-sizing: border-box;
      width: 100%;
      padding: 2.5rem 1rem;
      padding-top: 1rem;

      &_set {
        position: absolute;
        top: 1.5rem;
        right: 1rem;
        height: 1rem;
        width: 1rem;
      }

      &_box {
        &_title {
          border-radius: 50%;
          border: 0.1rem solid #fff;
          height: 3rem;
          width: 3rem;
          overflow: hidden
        }

        &_userImg {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
        }
      }
    }

    .user {
      position: relative;

      &-title {
        height: 25vw;
        width: 24vw;
        position: absolute;
        top: 19vw;
        left: 38%;
        border-radius: 50%;
      }

      &-poster {
        width: 100%;
        height: 53vw;
        display: block;
      }

      &-group {
        margin-bottom: 15px;
      }

      &-links {
        padding: 0.75rem 0;
        padding-top: 0.25rem;
        font-size: 0.6rem;
        background-color: #fff;

        &-img {
          width: 1.35rem;
          height: 1.15rem;
        }

        .van-icon {
          display: block;
          font-size: 1.2rem;
        }
      }
    }
  }
</style>
