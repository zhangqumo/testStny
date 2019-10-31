<template>
  <div class="div_all">
    <div class="jump">
      <div class="o_filter" id="moveDiv" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move"
        @mouseup="end" @touchend="end" :class="nav_select?'buttom':'buttom2'">
        <div :class="nav_select?'active':'active2'">
          <div class="o_filter_ico">
            <van-icon name="home-o" @click='handleJump(0)' />
            <van-icon name="shopping-cart-o" @click='handleJump(1)' />
            <van-icon name="friends-o" @click='handleJump(2)' />
          </div>
        </div>
        <img class='o_filter_img' :src="nav_select?open:close" alt="" @click="handleCommonNav">
      </div>
    </div>
  </div>
</template>

<script>
  import open from '../assets/img/open.gif'
  import close from '../assets/img/close.gif'
  import {
    Swipe,
    SwipeItem,
    Toast,
    Icon
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Icon.name]: Icon,
    },

    props: {},

    data() {
      return {
        nav_select: false,
        open: open,
        close: close,
        flags: false,
        position: {
          x: 0,
          y: 0
        },
        nx: '',
        ny: '',
        dx: '',
        dy: '',
        xPum: '',
        yPum: '',
      }
    },

    computed: {},

    watch: {
      //监听路由变化
      $route(to, from) {
        console.log(to);
        if (to) {
          this.nav_select = false;
        }

      }
    },
    //组件中的路由生命周期
    beforeRouteLeave(to, from, next) {
      console.log(from);

      next();
    },

    beforeRouteEnter(to, from, next) {
      console.log(to);
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
      // 实现移动端拖拽
      down() {
        this.flags = true;
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
      },
      move() {
        if (this.flags) {
          var touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          this.nx = touch.clientX - this.position.x;
          this.ny = touch.clientY - this.position.y;
          this.xPum = this.dx + this.nx;
          this.yPum = this.dy + this.ny;
          moveDiv.style.left = this.xPum + "px";
          moveDiv.style.top = this.yPum + "px";
          //阻止页面的滑动默认事件
          document.addEventListener("touchmove", function() { // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
            event.preventDefault(); //jq 阻止冒泡事件
            // event.stopPropagation(); // 如果没有引入jq 就用 stopPropagation()
          }, false);
        }
      },
      end() {
        this.flags = false;
      },
      handleCommonNav() {
        this.nav_select = !this.nav_select;
      },
      handleJump(index) {
        if (this.$route.fullPath == '/index' && index == 0) {
          return false
        }
        let url = ''
        switch (index) {
          case 0:
            url = '/index';
            break;
          case 1:
            url = '/cart';
            break;
          case 2:
            url = '/user';
            break;
        }
        this.$router.push({
          path: url,
        })
      }
    }
  };
</script>

<style lang="less">
   * { touch-action: pan-y; }
  .jump {
    .van-icon::before {
      font-size: 1.3rem
    }

    .active2 {
      height: 7rem;
      box-sizing: border-box;
      border-radius: 1.5rem;
      padding: 34rpx 0;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out 0s;
      opacity: 0;
      transform: scale(0);
      height: 0;
    }

    .active {
      opacity: 1;
      transform: scale(1);
      height: 7rem;
      box-sizing: border-box;
      width: 2rem;
      color: #fff;
      background: #E93323;
      border-radius: 1.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s ease-in-out 0s;//动画延迟

    }

    .buttom {
      bottom: 4.5rem !important;
      transition: all 0.3s ease-in-out 0s;
    }

    .buttom2 {
      bottom: 10.5rem !important;
      transition: all 0.3s ease-in-out 0s;
    }

    // 测试
    .o_filter {
      position: fixed;
      right: 0.6rem;
      bottom: 7.5rem;
      z-index: 1000;

      &_img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        overflow: hidden;
        display: block;
      }

      &_ico {
        height: 7rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
</style>
