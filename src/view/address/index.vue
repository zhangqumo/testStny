<template>
  <div class="div_all a_all">
    <div class='a_list fz_14'>
      <van-list   v-model="loading" :finished="finished" finished-text="没有可加载的数据了" @load="handleOnLoad" v-if="list.length!=0" :immediate-check='false'>
        <van-panel class="mt_5" :title="`收货人: ${item.real_name} ${item.phone}`" :desc="`收货地址: ${item.sumAddess}`" v-for="(item,index) in list"
          :key="index">
          <div class="a_center dis flex_y_center flex_x_between">
            <div class="dis flex_y_center">
              <van-checkbox v-model="item.is_default==1" checked-color="#E93323" @click='handleCheck(list,index)'>设为默认</van-checkbox>
            </div>
            <div class="dis flex_y_center">
              <div class="dis flex_y_center " @click="handleNewAdd('editor',item.id)">
                <div class="iconfont icon-bianji"></div>
                <div class="ml_5">编辑</div>
              </div>
              <div class="dis flex_y_center ml_20" @click="handleDelAddess(item.id,index)">
                <div class="iconfont icon-shanchu"></div>
                <div class="ml_5">删除</div>
              </div>
            </div>
          </div>
        </van-panel>
      </van-list>

      <div v-if="list.length==0" class="dis flex-x-center flex_y_center">
        <img src="../../assets/img/noAddress.png" alt="" class="a_noAddess">
      </div>

      <!-- <div class="fz_14 t-c mt_20">没有可加载的数据了</div> -->
    </div>
    <div class="a_btn dis flex_y_center b_box flex-x-around w_all bg_fff">
      <div class="a_btn_tian fz_14 dis flex_y_center flex-x-center" @click="handleNewAdd('add')">
        <div class="iconfont icon-tianjiadizhi"></div>
        <div class="ml_5">添加新地址</div>
      </div>
      <div class="a_btn_dao fz_14 dis flex_y_center flex-x-center">
        <div class="iconfont icon-weixin2"></div>
        <div class="ml_5">导入微信地址</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    Panel,
    Button,
    Checkbox,
    CheckboxGroup,
    List
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Panel.name]: Panel,
      [Button.name]: Button,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [List.name]: List,

    },

    props: {},

    data() {
      return {
        checked: true,
        page: 1,
        limit: 100,
        list: [],
        loading: false,
        finished: false
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
      this.getAddessList(this.page, this.limit)
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
      handleCheck(list, index) {
        list.forEach((a) => {
          a.is_default = 0
        })
        list[index].is_default = 1;
        this.list = list
        this.$http
          .get("mzyl/user_api/set_user_default_address.html", {
            params: {
              addressId: list[index].id
            }
          }).then(res => {
            console.log(res)

            Toast.success('设置成功')
          })

      },
      handleNewAdd(e, id) {
        this.$router.push({
          name: 'addAddress',
          params: {
            type: e,
            id: id
          }
        });
      },
      handleOnLoad() {
        console.log('44')
        // 加载状态结束
        // this.loading = false;
        // this.finished = true
      },
      handleDelAddess(addressId,index) {
        this.$http
          .get("mzyl/user_api/remove_user_address.html", {
            params: {
              addressId
            }
          }).then(res => {
            console.log(res)
            let list = this.list;
            list.splice(index,1)
            this.list = list;
            Toast.success('删除成功')
          })
      },
      getAddessList(page, limit) {
        this.$http
          .get("mzyl/user_api/user_address_list.html", {
            params: {
              page,
              limit
            }
          }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              let list = res.data.data;
              list.forEach((a, index, arr) => {
                let sumAddess = `${arr[index].province+arr[index].city+arr[index].district+arr[index].detail}`;
                arr[index].sumAddess = sumAddess;

              })
              this.list = list;
            }
          })
      }
    }
  };
</script>

<style lang="less">
  .a_all {
    padding-bottom: 6rem;

    .a_center {
      padding: 0.5rem 0.75rem;
      box-sizing: border-box;
    }

    .van-cell {
      font-weight: 600
    }
    .a_noAddess{
      height: 10rem;
      width: 10rem;
    }
    .a_height{
      // height: 500px;
      // display: flex;
    }
    // .a_list {
    //   padding-bottom: 3.5rem
    // }

    .a_btn {
      position: fixed;
      bottom: 0;
      padding: 0.4rem 0;

      &_tian {
        border-radius: 1.5rem;
        background: #E93323;
        color: #fff;
        padding: 0.4rem 0;
        text-align: center;
        width: 7.5rem
      }

      &_dao {
        border-radius: 1.5rem;
        background: #FE960F;
        color: #fff;
        padding: 0.4rem 0;
        text-align: center;
        width: 7.5rem
      }
    }

    .van-cell__label {
      font-size: 0.7rem;
      color: #424242
    }
  }
</style>
