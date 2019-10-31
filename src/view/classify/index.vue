<template>
  <div class="div_all classify" :style="all_height">
    <!-- 搜索框s -->
    <!--  <div class='c_search'>
      <van-search placeholder="点击搜索商品信息" input-align='left'/>
    </div> -->
    <!-- 搜索框e -->

    <!-- <div class="fz_14 x_center mt_50">具体详请到"长生态小程序"</div> -->
    <div class="p_r">
      <div class="dis" v-for="(item,index) in classList" :key="index">
        <van-sidebar class="c_color p_r" @change='handleTitle(index)'>
          <!-- @click='hanldeActiveKey' -->
          <van-sidebar-item :title="item.cate_name" @click="hanldeActiveKey(index)">
          </van-sidebar-item>
          <div class="p_a c_line_box" v-show="index==activeIndex"></div>
        </van-sidebar>
        <div class="c_name_box" v-show="index==activeIndex">
          <div>
            <div class="dis flex_y_center flex-x-center">
              <div class="c_line"></div>
              <div class="c_name">{{item.cate_name}}</div>
              <div class="c_line"></div>
            </div>
            <div class="mt_10">
              <van-grid :column-num="3">
                <van-grid-item v-for="(itemc,cindex) in classList[activeIndex].child" :key="cindex.index" @click="handleDetails(itemc.id)">
                  <img :src="itemc.pic" alt="" class="c_center_img">
                  <div class="mt_5 fz_14">{{itemc.cate_name}}</div>
                </van-grid-item />
              </van-grid>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表部分s -->
    <!--  <div class="i_hotList plr_20 bg_fff dis flex_y_center p_r" v-for='(item,index) in classList' :key="index" @click="handleDetails(item.id)">
      <img :src='item.image' alt="" class="i_hotList_img">
      <div class=" i_hotList_box">
        <div class="fz_16 color_000 onelist-hidden">{{item.store_name}}</div>
        <div>
          <div class="onelist-hidden fz_18 color_E93323 fw_600">￥{{item.price}}</div>
          <div class="onelist-hidden fz_14 fw_600 color_000">已销售{{item.sales}}件</div>
        </div>
      </div>
      <div class="iconfont icon-gouwuche i_hotList_shop"></div>
    </div> -->
    <!-- 列表部分e -->
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    Search,
    Sidebar,
    SidebarItem,
    Grid,
    GridItem
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Search.name]: Search,
      [Sidebar.name]: Sidebar,
      [SidebarItem.name]: SidebarItem,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,

    },

    props: {},

    data() {
      return {
        classList: [],
        activeKey: 0,
        activeIndex: 0
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
      next();
    },

    beforeRouteEnter(to, from, next) {
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

      // let classList = JSON.parse(localStorage.getItem('classList'));
      // this.classList = classList

      this.all_height = `height:${document.documentElement.clientHeight}px`
      //请求成功后关闭

      //获取全部商品sstore_api/get_product_category.html
      this.$http
        .get("mzyl/store_api/get_product_category.html", {

        }).then(res => {
          // console.log(res)
          let list = res.data.data;
          let arr = [];
          list.forEach((a) => {
            a.child.forEach((b) => {
              arr.push(b)
            })
          })
          let obj = {};
          obj.id = '';
          obj.cate_name = '全部'
          obj.child = arr
          list.unshift(obj)
          console.log(list)
          this.classList = list
          //获取全部商品e
          Toast.clear()
        })
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
      hanldeActiveKey(index) {
        this.activeIndex = index
      },
      handleTitle(index) {
        console.log(index)
        this.activeIndex = index
      },
      handleDetails(pid) {
        console.log(pid)
        let _this = this;
        _this.$router.push({
          path: '/goods',
          query: {
            id: pid
          }
        })
      }
    }
  };
</script>

<style lang="less">
  .classify {
    background: #FFFFFF;
    // padding: 1rem 0;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;

    .c_line_box {
      height: 4rem;
      left: 0px;
      top: 0px;
      background-color: #ee0a24;
      border-left: 0.1rem solid #ee0a24;
    }

    .c_name_box {
      width: 13.9rem;
      position: absolute;
      top: 0px;
      right: 0px;
    }

    .c_color {
      .van-sidebar-item--select {
        color: #323233;
        font-weight: 500;
        // border-color: #ee0a24;
        border-color: #fff;
        background-color: #fff;
      }
    }

    .c_line {
      width: 2.8rem;
      height: 1px;
      background-color: #999;

    }

    .c_center_img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }

    .c_name {
      font-size: 0.6rem;
      color: #333;
      margin: 0 1rem;
      font-weight: bold;
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
