<template>
  <div class="div_all cargoTui">
    <van-card :num="item.cart_num" :price="item.productInfo.attrInfo?item.productInfo.attrInfo.price:item.productInfo.price"
      :title="item.productInfo.store_name" :thumb="item.productInfo.image" v-for="(item,index) in listOne.cartInfo"
      :key="index" />
    <van-cell-group>
      <van-cell title="退货件数" :value="listOne.total_num" />
      <van-cell title="退货金额" :value="'￥'+listOne.pay_price" />
      <van-cell title="退货原因" :value="showCenter" is-link @click="handleTui(isShow)" />
      <van-cell>
        <template slot="title">
          <div class="dis flex_x_between">
            <div>备注说明</div>
            <div>
              <textarea maxlength='100' class="c_input" placeholder="填写备注信息,(100字以内)" v-model="notedata"></textarea>
            </div>
          </div>
        </template>
      </van-cell>
      <van-cell title="上传凭证" value="(最多可上次3张)" />
      <div class="c_up">
        <van-uploader v-model="fileList" multiple :max-count="3" />
      </div>

    </van-cell-group>

    <van-button type="primary" size="large" color='#E93323' @click='handleRefund'>申请退款</van-button>
    <div class="c_bottom" v-show="isShow">
      <van-area :area-list="areaList" columns-num='1' @confirm="handleConfirm" @cancel='handleCancel' style="width:100%" />
    </div>

  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem,
    Toast,
    Card,
    Cell,
    CellGroup,
    Area,
    Uploader,
    Button
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Card.name]: Card,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Area.name]: Area,
      [Uploader.name]: Uploader,
      [Button.name]: Button,
    },

    props: {},

    data() {
      return {
        listOne: {},
        isShow: false,
        showCenter: '',
        notedata: '',
        areaList: {

        },
        fileList: [

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
      //获取详情s user_api/get_order.html  public_api/get_refund_reason.html
      this.$http
        .get("mzyl/user_api/get_order.html", {
          params: {
            uni: this.$route.query.id
          }
        }).then(res => {
          this.listOne = res.data.data;
          console.log(res)
        })

      //获取详情e
      //获取退款原因s
      this.$http
        .get("mzyl/public_api/get_refund_reason.html", {}).then(res => {
          let list = res.data.data;
          let listObj = {};
          for (let key in list) {
            listObj[key] = list[key];
          }
          this.showCenter = list[0]
          this.areaList = {
            province_list: listObj
          }
        })
      //获取退款原因
      Toast.clear();

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
      handleConfirm(e) {
        console.log(e)
        this.showCenter = e[0].name;
        this.isShow = false
      },
      handleCancel() {
        this.isShow = false
      },
      handleRefund() {
        let fileList = this.fileList;
        let refund_reason_wap_img = [];
        let refund_reason_wap_explain = this.notedata;
        let uni = this.listOne.order_id;
        let text = this.showCenter;
        //后台接口base64的图片
        fileList.forEach((a) => {
          console.log(a)
          refund_reason_wap_img.push(a.content)
        })
        this.$router.push({
          path: '/returnsList',
         
        })
        // console.log(refund_reason_wap_img)
        // console.log(fileList);
        // console.log(uni)
        // console.log(refund_reason_wap_explain)
        // console.log(text)
      },
      handleTui(isShow) {
        this.isShow = !isShow
      }
    }
  };
</script>

<style lang="less">
  .cargoTui {
    .c_bottom {
      background: rgba(0, 0, 0, 0.6);
      height: 100vh;
      position: fixed;
      top: 0;

      // bottom: 0rem;
      width: 100%;
      display: flex;
      align-items: flex-end;
    }

    .c_up {
      padding-left: 0.8rem;
      padding-bottom: 0.8rem;
    }

    .c_input {
      height: 3.2rem;
      width: 12.05rem;
      text-align: right;
    }
  }
</style>
