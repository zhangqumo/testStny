<!-- 首页 -->
<template>
  <div class="index" v-show="isPageShow">
    <!-- 搜索框s -->
    <div class='i_search'>
      <van-search placeholder="搜索商品" input-align='left' :readonly='true' />
    </div>
    <!-- 搜索框e -->

    <!-- 轮播图 s-->
    <van-swipe class="index-swipe" :autoplay="3000" :show-indicators='true' indicator-color='#000'>
      <van-swipe-item v-for="(item,index) in images" :key="index">
        <img :src="item.pic">
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图 e-->

    <!-- 公告s -->
    <div class="i_affiche">
      <van-notice-bar :text='rollList' color='#000' left-icon="volume-o" background="#fff" mode="link" />
    </div>
    <!-- 公告e -->

    <!-- 积分兑换s -->
    <div class="i_integral  p_r" v-if="false">
      <div class="i_integral_bg p-a"></div>
      <div class="i_integral_bg2 p-a"></div>
      <div class="dis flex_y_center flex_x_between color_fff p-r z_1">
        <div class="fz_16">积分兑换</div>
        <div class="dis flex_y_center fz_14">
          <div>更多</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="i_integral_one bg_fff dis flex_x_between">
        <van-row v-for="(item,index) in pointList" :key='index'>
          <van-col span="8" class='dis flex_dir_column'>
            <img :src="item.image" alt="" class="i_integral_one_img">
            <div class="i_integral_one_font  onelist-hidden fz_14 ptb_5 color_000">{{item.store_name}}</div>
            <div class="i_integral_one_font  onelist-hidden fz_14 ptb_5 color_E93323">积分{{item.price}}</div>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 积分兑换e -->

    <!-- 热门榜单s -->
    <div class="i_hot plr_20 bg_fff fz_16 dis flex_x_between flex_y_center" >
      <div>
        <div class="fz_16 fw_600 color_000">热门榜单</div>
        <div class="fz_12" style="color: #CCCCCC;">根据销量,搜索，好评等综合提出</div>
      </div>
      <div class="dis flex_y_center fz_14 color_000">
        <div>更多</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 热门榜单e -->

    <!-- 热门列表s -->
    <div class="i_hotList plr_20 bg_fff dis flex_y_center p_r" v-for='(item,index) in likeInfo' :key="index" @click="handleDetails(item.id)">
      <img :src='item.image' alt="" class="i_hotList_img">
      <div class=" i_hotList_box">
        <div class="fz_16 color_000 onelist-hidden">{{item.store_name}}</div>
        <div>
          <div class="dis flex_y_center">
            <div class="onelist-hidden fz_18 color_E93323 fw_600">￥{{item.price}}</div>
            <div class="ml_10 i_newAcitvity" v-if='item.activity_name&&item.is_new_member==1'>{{item.activity_name}}</div>
          </div>

          <div class="onelist-hidden fz_14 fw_600 color_000">已销售{{item.sales}}件</div>
        </div>
      </div>
      <div class="iconfont icon-gouwuche i_hotList_shop"></div>
    </div>
    <!-- 热门列表e -->
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Search,
    NoticeBar,
    Row,
    Col,
    Icon,
    Toast
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Search.name]: Search,
      [NoticeBar.name]: NoticeBar,
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
    },
    beforeCreate() {
      console.log('给个loading界面 created撤销loading');
      Toast.loading({
        mask: false,
        message: '加载中...'
      });
    },
    props: {},

    data() {
      return {
        images: [],
        rollList: '',
        pointList: [],
        likeInfo: [],
        isPageShow: false,
      }
    },

    computed: {},
    //组件中的路由生命周期
    beforeRouteLeave(to, from, next) {
      next();
    },

    beforeRouteEnter(to, from, next) {
      console.log(from)
      next();
    },
    watch: {
      $route(to, from) {
        console.log(to);
      }
    },

    created() {
       let url = location.href.split('#')[0] //获取锚点之前的链接
       console.log(url)
      //测试s
      //       this.$http
      //         .get("mzyl/wechat_api/get_appid", {
      //            params: {
      //             id: pid
      //             }
      //         }).then(res => {
      //           console.log(res)
      //         })
      // this.$http
      //   .post("auth_api/confirm_order.html", {
      //     cartId: needId
      //   }).then(res => {
      //     console.log(res)
      //
      //   })
      //测试e
      //商城首页接口
      this.$http
        .get("mzyl/public_api/index.html", {

        }).then(res => {
          console.log(res.data.data)
          let list = res.data.data,
            str = '';
          list.roll.forEach((currentValue, index, arr) => {
            str += currentValue.info + '  '
          })
          this.images = list.banner;
          this.rollList = str;
          this.pointList = list.info.pointList;
          this.likeInfo = list.likeInfo;
          let classList = JSON.stringify(list.likeInfo);
          // console.log(classList)
          localStorage.setItem('classList', classList);
          Toast.clear();
          this.isPageShow = true;
        })
      //商城首页接口
    },

    mounted() {},

    destroyed() {},

    methods: {
      //获取实名认证的状态s
      handleDetails(pid) {
        console.log(pid)
        let _this = this;
        _this.$router.push({
          path: '/goods',
          query: {
            id: pid
          }
        })
      },
  
    }
  };
</script>

<style lang="less">
  .index {
    .i_swipe2 {
      height: 6.3rem !important;
    }

    .i_newAcitvity {
      background: #F51F0F;
      padding: 0.1rem 0.25rem;
      color: #fff;
      margin-left: 0.25rem;
      font-size: 0.4rem;
      border-radius: 0.75rem;

    }

    .index {
      &-swipe {
        img {
          width: 100%;
          display: block;
          height: 9.375rem;
        }
      }
    }

    .i_integral {
      background: #fff;
      padding: 0.5rem 1rem;
      margin-top: 0.25rem;

      &_bg {
        top: 0px;
        left: 0px;
        background: #FF3122;
        height: 6rem;
        width: 100%;
      }

      &_bg2 {
        background: #fff;
        height: 1.5rem;
        top: 4.55rem;
        left: 0px;
        width: 100%;
        border-top-right-radius: 1.5rem;
        border-top-left-radius: 1.5rem;
      }

      &_one {
        padding: 1rem;
        width: 100%;
        box-sizing: border-box;
        border-radius: 0.25rem;
        margin-top: 0.5rem;
        box-shadow: 0 0 1rem -0.5rem #aaa;
        position: relative;
        z-index: 4;
        // position: relative;
        // z-index: 1

        &_img {
          width: 4.6rem;
          height: 4.3rem;
          border-radius: 0.5rem;
        }

        &_font {
          width: 4.6rem;
        }
      }
    }

    .i_hot {
      padding-bottom: 0.5rem
    }

    .i_hotList {
      &_shop {
        width: 1.4rem;
        height: 1.4rem;
        position: absolute;
        right: 1.1rem;
        bottom: 1.1rem;
        color: #FD8A6B;
        border: 1px solid #FD8A6B;
        border-radius: 50%;
        text-align: center;
        line-height: 1.4rem;
      }

      padding-bottom: 1rem;

      &_img {
        width: 4.55rem;
        height: 4.9rem
      }

      &_box {
        height: 4.9rem;
        box-sizing: border-box;
        width: 12rem;
        padding-left: 0.75rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between
      }
    }
  }
</style>
