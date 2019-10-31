<template>
  <div class="goods" v-show="isPageShow">

    <!-- 轮播图s -->
    <div class="g_swipe p-r">
      <van-swipe class="goods-swipe" :autoplay="3000" :show-indicators='false' @change='handleIndex'>
        <van-swipe-item v-for="(item,index) in slider" :key="index">
          <img :src="item">
        </van-swipe-item>
      </van-swipe>
      <div class="p-a g_swipe_dis dis flex_y_center color_000 fz_14 ">
        <div> {{ current + 1 }}</div>
        <div>/{{slider.length}}</div>
      </div>
    </div>
    <!-- 轮播图e -->

    <!-- 详情部分s -->
    <van-cell-group>
      <van-cell>
        <div class="goods-price fz_18 fw_600 dis_flex flex_y_center flex_x_between">
          <div class="dis flex_y_center">
            <div> ¥{{storeInfo.original_price}}</div>
            <div class="g_newAcitvity" v-if='storeInfo.activity_name&&storeInfo.is_new_member==1'>{{storeInfo.activity_name}}</div>
            <div v-if='storeInfo.is_discount==1' class="fz_12 ml_10 g_color1">¥{{storeInfo.price}}</div>
            <div v-if='storeInfo.is_discount==1' class="fz_12 ml_10 g_color2">{{storeInfo.discount_price}}</div>
          </div>
          <div class="iconfont icon-fenxiang" style="color:#515151" @click="handleFen"></div>
        </div>
        <div class="goods-title fw_600">{{ storeInfo.store_name}}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="8">原价：¥ {{ storeInfo.ot_price }}</van-col>
        <van-col span="8">预计税费：¥ {{ storeInfo.tax }}</van-col>
        <van-col span="8">销量：{{ storeInfo.ficti }} 件</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group" @click='handleOpen'>
      <van-cell is-link>
        <template slot="title">
          <span class="custom-title">{{productAttr.length==0?'请选择':'已选择: '}}</span>
          <span class="custom-title">{{productAttr.length==0?'':isValue}}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 用户评论部分s -->
    <van-cell-group class="goods-cell-group" v-if='reply!=""'>
      <van-cell value="好评率" is-link>
        <template slot="title">
          <div class="dis flex_y_center flex_x_between g_yong">
            <span class="van-cell-text">用户评价({{replyCount}})</span>
            <span class="van-cell-text color_E93323">{{replyChance}}%</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <div class="fz_14 ">
            <div>
              <div class="dis flex_y_center">
                <img :src="reply.avatar" alt="" class="g_yongImg">
                <div class="ml_10">{{reply.nickname}}</div>
                <van-rate class="ml_10" v-model="value" readonly size='10px' color='#E93424' />
              </div>
              <div class="ptb_5  fz_12 dis flex_y_center" style="color:#999">{{reply.add_time}}</div>
              <div>{{reply.comment}}</div>
              <div class="dis_flex flex_x_between" v-show="pic.length!=0">
                <img v-for="(item,index) in pic" :key="index" :src="item" alt="" class="g_pingJiaImg mt_10">
              </div>
            </div>
          </div>
        </template>
      </van-cell>

    </van-cell-group>
    <!-- 用户评论部分e -->

    <van-cell-group class="goods-cell-group g_jieShao">
      <!-- <van-cell title="产品介绍" /> -->
      <!-- 产品介绍部分s -->
      <div class="fz_14 b_box goods_jieshao x_center">产品介绍</div>
      <!-- <div>{{storeInfo.userCollect}}</div> -->
      <div class="bg_fff pb_10 b_box w_all goods_description" v-html="description">
        {{description}}
      </div>
      <!-- 产品介绍部分e -->
    </van-cell-group>

    <!-- 详情部分e -->

    <!-- 底部按钮部分s -->
    <van-goods-action>
      <van-goods-action-icon icon="service-o" text="客服" />
      <van-goods-action-icon :icon="storeInfo.userCollect?'like':'like-o'" text="收藏" @click='hanldeCollect(storeInfo.userCollect,storeInfo.id)' />
      <van-goods-action-icon icon="cart-o" text="购物车" :info="isCartNum" @click="onClickCart(isCartNum)" />
      <van-goods-action-button type="warning" text="加入购物车" @click="handleOpen(storeInfo.id,steValue,isValue)" />
      <van-goods-action-button type="danger" text="立即购买" @click='handleSubmitOrder(storeInfo.id,steValue,isValue)' />
    </van-goods-action>
    <!-- 底部按钮部分e -->

    <!-- 购物车弹出部分s -->
    <!-- 45% -->
    <van-popup round v-model="isShow" position="bottom" :style="{ height}" @close='handleGuanBi'>
      <div class="g_car p-r">
        <van-icon name="cross" class="g_car_close p_a" @click="handleCarClose" />
        <van-card :title="storeInfo.store_name" :thumb="productAttr.length==0?slider[0]:productAttrImg">
          <div slot="tags">
            <div class="tags_price">{{productAttr.length==0?`¥ ${storeInfo.price}`:`¥ ${price}`}}</div>
            <div class="tags_font">库存: {{productAttr.length==0?storeInfo.stock:productAttrStock}}</div>
          </div>
        </van-card>
        <div v-if="productAttr.length!=0">
          <div class="pb_10">{{productValue.attr_name}}</div>
          <div class="dis flex_y_center pb_10">
            <van-button v-for="(item,index) in productValue.attr_value" :key="index" @click="handleNum(item.attr,index)"
              type="default" size="mini" :color="item.check?color:''">{{item.attr}}</van-button>
          </div>
        </div>
        <div>
          <div class="pb_10">数量</div>
          <van-stepper v-model="steValue" :max="storeInfo.stock" />
        </div>
      </div>
    </van-popup>
    <!-- 购物车弹出部分e -->
    <!-- 分享弹出框s -->
    <div class="g_fen">
      <van-popup v-model="showTow" position="bottom" :style="{ height: '20%' }">
        <div class="dis flex_y_center flex-x-around color_000 " style="height: 100%;">
          <div class="dis flex-dir-column flex-x-center flex_y_center" @click="handleFenTwo">
            <div class="iconn"></div>
            <div class="pt_5">发送给朋友</div>
          </div>
        <!--  <div class="dis flex-dir-column flex-x-center flex_y_center" @click="handleSheng">
            <div class="iconn1"></div>
            <div class="pt_5">生成海报</div>
          </div> -->
        </div>
      </van-popup>
    </div>
    <!-- 分享弹出框s -->

    <!-- 海报s -->
    <div v-if="isHaiBaoTow" class="share-image">
      <img class="g_h_btn_two" src="../../assets/img/poster-close.png" alt="" @click="handleGanHai(0)">
      <img :src="src" alt="">
      <div class="g_h_btn" @click="handleGanHai(1,src)">保存到手机</div>

    </div>
    <vue-canvas-poster :painting="painting" @success="success" v-show="isHaiBao"></vue-canvas-poster>
    <!-- </div> -->
    <!-- 海报e -->
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import wxapi from '../../assets/js/wxApiTwo.js'
  import {
    Tag,
    Col,
    Icon,
    Cell,
    CellGroup,
    Swipe,
    Toast,
    SwipeItem,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Popup,
    Skeleton,
    Rate,
    Card,
    Stepper,
    Button,
    ImagePreview
  } from 'vant';

  export default {
    components: {
      [Tag.name]: Tag,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [GoodsAction.name]: GoodsAction,
      [GoodsActionIcon.name]: GoodsActionIcon,
      [GoodsActionButton.name]: GoodsActionButton,
      [Popup.name]: Popup,
      [Skeleton.name]: Skeleton,
      [Rate.name]: Rate,
      [Card.name]: Card,
      [Stepper.name]: Stepper,
      [Button.name]: Button,
      [ImagePreview.name]: ImagePreview,
    },
    beforeCreate() {
      Toast.loading({
        mask: false,
        message: '加载中...'
      });
    },
    data() {
      return {
        slider: [],
        storeInfo: {},
        reply: {},
        pic: [],
        productAttr: [],
        description: '',
        current: 0,
        isShow: false,
        steValue: 1,
        value: 0,
        replyChance: '',
        replyCount: '',
        productValue: {},
        height: 'height:35%',
        price: '',
        color: '#FF3700',
        isColor: false,
        isValue: '',
        isPageShow: false,
        flag: [0, 0],
        infoNum: '',
        showTow: false,
        productValueTow: {},
        productAttrImg: '',
        productAttrStock: '',
        isCartNum: '',
        img1: '',
        src: '',
        isHaiBao: false,
        isHaiBaoTow: false,
        painting: {},
      };
    },
    computed: {

    },
    created() {

    },
    mounted() {
      //获取公众号配置s
      this.getGongConfig()
      //获取公众号配置e
      console.log(document.documentElement.clientWidth)
      // console.log(wxapi.wxRegister)
      //获取首页的idS
      let pid = this.$route.query.id;
      console.log(pid)
      //获取首页的idE
      //获取商品详情接口s
      this.$http
        .get("mzyl/store_api/details.html", {
          params: {
            id: pid
          }
        }).then(res => {
          console.log(res)
          let list = res.data.data;
          if (list.length == 0) {
            Toast.fail(res.data.msg);
            return false
          }
          console.log(list)
          this.replyChance = list.replyChance || '';
          this.replyCount = list.replyCount || '';
          this.productAttr = list.productAttr;
          if (list.productAttr.length != 0) {
            list.productAttr[0].attr_value[0].check = true
            this.productValue = list.productAttr[0];
            this.productValueTow = list.productValue;
            this.price = list.productValue[list.productAttr[0].attr_value[0].attr].price;
            this.productAttrImg = list.productValue[list.productAttr[0].attr_value[0].attr].image;
            this.productAttrStock = list.productValue[list.productAttr[0].attr_value[0].attr].stock;
            this.isValue = list.productValue[list.productAttr[0].attr_value[0].attr].suk;
          }
          this.storeInfo = list.storeInfo || '';
          console.log(list.storeInfo.image)
          this.slider = list.storeInfo && list.storeInfo.slider_image;

          this.reply = list.reply || '';
          this.value = list.reply && parseInt(list.reply.star);
          this.pic = list.reply && list.reply.pics;
          this.description = list.storeInfo && list.storeInfo.description;
          if (list.storeInfo) {
            Toast.clear();
            this.isPageShow = true
          } else {
            Toast({
              message: res.data.msg,
              duration: '1000'
            });
          }
          console.log(this.storeInfo.image)

          this.painting = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            views: [{
                type: 'image',
                url: require('@/assets/img/posterbackgd.png'),
                left: document.documentElement.clientWidth / 6,
                top: document.documentElement.clientHeight / 8,
                width: document.documentElement.clientWidth / 1.5,
                height: document.documentElement.clientHeight / 1.6
              },
              {
                type: 'image',
                url: 'https://tgoods.top1buyer.com/res/testfile/imgs/20190702180744/MR9600-Pink/3.jpg',
                left: document.documentElement.clientWidth / 6,
                top: document.documentElement.clientHeight / 8,
                width: document.documentElement.clientWidth / 1.5,
                height: document.documentElement.clientHeight / 1.5 / 2
              },
              {
                type: 'text',
                content: this.storeInfo.store_name,
                fontSize: 12,
                bolder: true,
                top: document.documentElement.clientHeight / 2,
                left: document.documentElement.clientWidth / 6,
                width: document.documentElement.clientWidth / 1.5,
                breakWord: true,
                MaxLineNumber: 1,
              },
              {
                type: 'text',
                content: '￥' + this.storeInfo.price,
                fontSize: 12,
                color: '#DF2D0A',
                bolder: true,
                top: document.documentElement.clientHeight / 2 + 20,
                left: document.documentElement.clientWidth / 6,
                width: document.documentElement.clientWidth / 1.5,
                breakWord: true,
                MaxLineNumber: 1,
              },
              {
                type: 'image',
                url: 'https://tgoods.top1buyer.com/res/testfile/imgs/20190702180744/MR9600-Pink/2.jpg',
                left: document.documentElement.clientWidth / 5,
                top: document.documentElement.clientHeight / 1.65,
                width: 60,
                height: 60
              },
              {
                type: 'text',
                content: '国有良心 服务中国',
                fontSize: 12,
                color: '#000',
                bolder: true,
                top: document.documentElement.clientHeight / 1.49,
                left: document.documentElement.clientWidth / 2.3,
                width: document.documentElement.clientWidth / 1.5,
                breakWord: true,
                MaxLineNumber: 1,
              },
            ]
          }
        })
      //获取商品详情接口e
      //获取购物车数量s
      this.getCartNum()
      //获取购物车数量e
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
                'updateAppMessageShareData'
              ]
            })
          })
      },
      // 公众号注入权限验证配置e
      formatPrice() {
        return '¥' + (this.goods.price / 100).toFixed(2);
      },

      onClickCart(n) {
        console.log(n)
        if (n == '' && n == 0) {
          Toast('请加入购物车');
          return false
        }
        this.$router.push('cart');
      },
      handleIndex(index) {
        // console.log(e)
        this.current = index;
      },
      //生成海报s
      handleSheng() {
        let id = this.storeInfo.id;
        if (this.img1) {
          this.isHaiBaoTow = true;
          this.showTow = false;
        } else {
          //获取二维码s
          this.$http
            .get("mzyl/store_api/product_promotion_code.html", {
              params: {
                id
              }
            }).then(res => {
              console.log(res)
              let img1 = res.data.msg;
              this.img1 = img1;
              this.isHaiBaoTow = true;
              this.showTow = false;
            })
          //获取二维码e
        }

      },
      //生成海报e
      // 加入购物车s
      handleOpen(id, num, center) {
        let flag = this.flag;
        let isShow = this.isShow;
        let productId = id;
        let cartNum = num;
        let uniqueId = '';
        if (this.productValueTow && center) {
          let productValueTow = this.productValueTow;
          uniqueId = productValueTow[center].unique
        }
        if (isShow) {
          // Toast.success('加入成功');
          this.getShopCart(productId, cartNum, uniqueId, 0)
          return false
        }
        if (flag[0] == 0) {
          this.$set(flag, 0, 1);
          this.isShow = true;
        } else if (flag[0] == 1) {
          // this.isShow = false;
          this.getShopCart(productId, cartNum, uniqueId, 0)
          // Toast.success('加入成功');
        }
      },
      // 加入购物车e
      getShopCart(productId, cartNum, uniqueId, type) {
        let _this = this;
        let url = type == 0 ? 'mzyl/auth_api/set_cart.html' : 'mzyl/auth_api/now_buy.html'
        _this.$http
          .get(url, {
            params: {
              productId,
              cartNum,
              uniqueId: uniqueId || ''
            }
          }).then(res => {
            if (type == 1 && res.data.code == 200) {
              this.$router.push({
                path: '/submitOrder',
                query: {
                  id: res.data.data.cartId
                }
              })
              return false
            }
            if (res.data.code == 200) {
              Toast.success('加入成功');
              this.getCartNum()
            } else {
              Toast(res.data.msg);
            }
          })
      },
      handleGuanBi() {
        let flag = this.flag;
        this.$set(flag, 0, 0);
        this.$set(flag, 1, 0);
      },
      handleCarClose() {
        this.isShow = false;
        let flag = this.flag;
        this.$set(flag, 0, 0);
        this.$set(flag, 1, 0);
      },
      //立即购买s
      handleSubmitOrder(id, num, center) {
        let flag = this.flag;
        let isShow = this.isShow;
        // console.log(id)
        let productId = id;
        let cartNum = num;
        let uniqueId = '';
        if (this.productValueTow && center) {
          let productValueTow = this.productValueTow;
          uniqueId = productValueTow[center].unique
        }
        if (isShow) {
          this.getShopCart(productId, cartNum, uniqueId, 1)
          // this.$router.push({
          //   path: '/submitOrder',
          //   query: {
          //     id: id
          //   }
          // })
        } else {
          if (flag[1] == 0) {
            this.$set(flag, 1, 1);
            this.isShow = true;
          } else {
            this.getShopCart(productId, cartNum, uniqueId, 1)
            // this.$router.push({
            //   path: '/submitOrder',
            //   query: {
            //     id: id
            //   }
            // })
          }
        }
      },
      //立即购买e
      //分享弹出框s
      handleFen() {
        this.showTow = true
      },
      //获取购物上面的数量sauth_api/get_cart_num.html
      getCartNum() {
        this.$http
          .get("mzyl/auth_api/get_cart_num.html", {
            params: {

            }
          }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              this.isCartNum = res.data.data
            }
          })
      },
      //获取购物上面的数量e
      //分享弹出框e
      handleNum(num, index) {
        let productValueTow = this.productValueTow;
        let productValue = this.productValue;
        this.price = productValueTow[num].price;
        this.productAttrImg = productValueTow[num].image;
        this.productAttrStock = productValueTow[num].stock;
        this.isValue = num;
        for (let i in productValue.attr_value) {
          productValue.attr_value[i].check = false
        }
        productValue.attr_value[index].check = true
        this.productValue = productValue
      },
      hanldeCollect(value, id) {
        console.log(value)
        let storeInfo = this.storeInfo;
        let url = value ? 'mzyl/store_api/uncollect_product.html' : 'mzyl/store_api/collect_product_all'
        this.$http
          .get(url, {
            params: {
              productId: id
            }
          }).then(res => {
            console.log(res)
            if (value == true) {
              Toast.success({
                message: '取消收藏',
                duration: '800'
              })
            } else {
              Toast.success({
                message: res.data.msg,
                duration: '800'
              });
            }

            if (res.data.code == 200) {
              storeInfo.userCollect = !value
              this.storeInfo = storeInfo
            }
          })
      },
      // 保存
      success(src) {
        // console.log(src)
        this.src = src;

      },
      handleGanHai(num, url) {
        if (num == 0) {
          this.isHaiBaoTow = false;
          return false
        }

        console.log(url)
      },
      //分享s
      handleFenTwo() {
        console.log("分享");
        let data = this.storeInfo;
        let href = window.location.href;

        wx.ready(function() { //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: data.store_name, // 分享标题
            desc: '', // 分享描述
            link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.image, // 分享图标
            success: function(res) {
              // 设置成功
              console.log("设置成功")
              console.log(res)
            },
            fail: function(err) {
              console.log(err)
            }
          })
        });
      }
      //分享e
    }
  };
</script>

<style lang="less">
  .goods {
    padding-bottom: 3.5rem;

    .g_color1 {
      color: #323233;
    }

    .g_color2 {
      background: #000;
      color: #A39B22;
      padding: 0.1rem 0.15rem;
      border-radius: 0.1rem;
      line-height: 0.6rem;
      font-size: 0.45rem;

    }

    .share-image {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.6);
      height: 100vh;
      z-index: 2041;
    }

    .g_h_btn_two {
      right: 2.75rem;
      width: 1.35rem;
      position: fixed;
      top: 1.6rem;
    }

    .g_h_btn {
      height: 2.5rem;
      width: 12.5rem;
      background: #FF0000;
      position: fixed;
      bottom: 5.1rem;
      left: 3.15rem;
      line-height: 2.5rem;
      text-align: center;
      color: #fff;
    }

    .canvas[data-v-41aea6a5] {
      position: fixed;
      top: 0;
      left: 0;
    }

    .van-info {
      background-color: #E93323;
    }

    .g_newAcitvity {
      background: #F51F0F;
      padding: 0.1rem 0.25rem;
      color: #fff;
      margin-left: 0.25rem;
      font-size: 0.4rem;
      border-radius: 0.75rem;
      line-height: 0.4rem;
    }

    .iconn {
      background-image: url('data:image/png;base64,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');
      width: 2.5rem;
      height: 2.5rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
    }

    .iconn1 {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAR4ElEQVR4nO2deZgU5Z3HP1XVU9zDMYDcIDcaBjJQCsMhDy54crjhTMDEXKtE27gGn8TkiZpo8qgRQyeyq0924wKrgMawEDRuUBFkQBsQgVW5j8EBgeGYGRBqpqv2j6oeaqqqr+nu6eqZ/jxPP1BvvTVVXd9+r9/7e3+vMHLxFbKdoF9uBxQC/YG+QG+gG1BgfloBPqCNeUklUANcBMrNTxlwFDgEHAB2KQH1fMN9i/oR9MtRz/sa6DlSRtAvy8BIYDQwDigCeib4Z8JCtwd6RLlXKbAD2ARsAbYpAVVN9JkzSVYIHPTL1wBTgFuByVwVKN30ND/TzOOqoF9eD6wD1ioB9csGeo56I3i1ig765bbATGAOMAGQMvpATkLA+8AKYJUSUC9k4iFiVdGeEzjol28A7sMQt1U819RocOSczsFynS8u6Jyo0DlZCeWXdCquwFeqTo0Gl6qN/C3zwCdCC1mgjQwdWwl0aQNd8wW6txXoVyDQp72AT4z7sS8CrwEvKgF1a6LfORmyQuCgXxaB6cDDQHGs/Oe+go9KNXaWaew6oXOo3BAwlfhE6FsgUNhVYFhXkRt7ibRvEdelJcBzwGoloKb4qZx4WuCgXxaAu4DHgaHR8u4/o/PuAY2Soxqfn9LR9IZ4wquIAgzuLFDcW2Rif5EBHYVYl+zG+F5/VQJq2p7WswIH/fIE4HfAiEh5Tlfp/M+nGm/v1ThyroEVjUGf9gK3DBKZdp1Ip9ZRxd4O/EQJqBvS8RyeEzjol3sAzwBzI+X5qFRjxU6NzUe0Bi+piSIKMKaPyJzhIjf0jNporwAeUQJqaSrv7xmBzXZ2AfAbXIY5mg7r92v81/YQ+057XNUIDOwk8O0REv80QER0L9SVwKPAklS1z54QOOiX+wDLgTFu5zcc1Hhxa4gD5dkprJ3+BQL3jpa4qW/EEr0ZmK8E1MPJ3ivjAgf98jzgBSDffm7vaZ3nN4XYfjztnc2MMKKHyEPjJAZ1ci3OFcCPlIC6PJl7ZEzgoF9uBvwR+L793KVq+LctIVZ9EvJ8G5ssogCzCiXuK5Zomeea5U/A/UpArZcQsQSOfyif2E17YNhvHeJuPaYxZ3k1K3Y2fnHB6Fus+CTEnOXVbD3mWlN9H9hkvrOUk3KBg355OPAhoFjT1RA8vymEf3UNJyqbgLI2TlTq+FfXsGhjCDXkOK0AH5rvLqWkVOCgX74Fo+R2s6aXVeh8d1U1r3wcoulJexUdeHVniHtWVVNW4XgT3TBK8i2pvGfKBA765buANUBra/qWoxp3r6hmb5YOfdLBvtM6d6+oZstRR5XdGlgT9Mv/nKp7pUTgoF/+JoaxvU6L//oujR+vqeHC5VTcpXFx4TL8eE0Nr+92iCwDq8x3mjRJC2z+2pZimc7TgcAHIZ7eUNMkOlL1RdPh6fdqWPyBo+mSgKVBv/yNZO+RlMBBv3wb8CoWcTUdnlxfw7Idzp5EDneW7wjx6/WOwiABr5jvuN7UW+CgXx4KrMRSLWs6/Gp9DWs+bZyGi3Sy9lONXzlFDlfXUWfaolEvgc0x25tYbMo68Nv3alj3WU7c+rLuM43fvldjr65bA2/Wd5ycsMCm09sb2JzVlpSEWL0nJ26yrN6jsaTE0bz1AN4wrYMJUZ8SvASbEeP13Rovb8u1uani5W0ht961gmHTT4iEBDYnDr5nTdtyVOPZDTWJ3jdHDJ7dUOM2Tv6eqUHcxC2wOeVX5xdUVqHzi7dzQ6F0oOnwi7dr3CxeLwT98rXx/p24BDYn65djmfJTQ/DIuhoqckaMtFFxGRauq7HbrvOBZaYmMYm3BC/ANln/QkkoZ35sAPad1vnjZkf/ZgyGJjGJOR8c9Ms9gf/DMiT68JjGA6sd3fkcaUIA/jDdx4296pTHSuB6IKqPVzwl+Dks4l6qhqfeadqzQg2NDjz5TqjWcd+kDYY2UYkqcNAvjwNmWNOWlISa5HxupjlZqbuNj2diLMCLSESBTaf05zFqCMBoD17blRvvZorXdrl6nNbRyE60EnwXNqf0RZuahpuNV9F0eG6jw+YwAkMrV1wFNrvgj1vTNhzUGq33Yzax4wudDQcdOjxBBC0jleApWNYKaTos2ZKrmr3Ci1sdNenXMDRzEEnghdaDf+zXOHw2Vzd7hQPlOuv3O0rxQre8DoGDfnkUNqPGsu250us1ljo1GQOMsie6leAfWg+CpVrOYuVB9p7W+ajUUYp/aE+oE6PDDJswy5r26s7Md6xayyDEXI7b8FRmeO38ip2afUXjLOAhoDachD0Iy2wsYRNOVemUOKesGoye7QR+d4ePvgUeVBcjbMRP36zhYIYWzW0+onGqSqfz1fXJrTA0fCmcYK+iZ1sP1n6mEcpgAX50ouRZccFYBP74pMwFKtJ0QyMbdTSsFTjol7sAN1lP/v3zzFbPgzqlZelUShncObM/wLecGt0EdAkfWH9+U7C4v+4/o2c8bIJbu3vknM7RDD1Xr3YC13bwVo1y9JzO/jO6NWaIBNyJsWqxjsC3Wy9890DmO1d2/vRRiJe2ZnYm67uKxH2jvRWy690DGgM61nmmOzAFFgGCfjkPmGjNsfGwtwS+cNkQONMDtpe3hThzMdNPUZcPjji0mgjkwdU2eCQWd5zySzr7PTb2PVWlZ7TDF0bTjThdXmLvKZ2zl+rolY/p+RquoutYrrYf1zNeUuKlXQuYMkRiYCeBKhU2Hzai82TL86cCHdh2XGfywDr9g2KgxGc5qOWTE9nxeoZ1FVg0NY98izv4jKEiGw9p/PStGqqbkIV1Z5nO5IF1korhahVdZ9531wkP1IUxaCnDM3f66ogbZnxfkR/c4K2OULrZfdKh2QgAMeiX2wO9wqmaDoeyIJzRpAEiHVpEHrJ8o1CKFKuqUXLgjCNeZy+gvYgtRuTJSt0thoTn6N0+unr5zaCgZdNROBxx18ZQERhgTcm0cSNeqmIY+nXgYvpigHoSF5v4YBHoY005liUCbzwUvZ+wrVSzu5k2esouOLTrK2JsYlFLpsyAiXKgXOe/P3ZvSy6q8Oz7WdDOpJgvnOuYevmAa+pmarDnSZrFm0IcP68zr0iie1uBkAYlRzUCH4SypqlJJScrHUmdfUAHa8r5r7LnxegYa5Nf363R3GcsiEvGrbdFnhEaeER3kf4dBbrlQytZoFX0aIGeoeKy48sX+IDO1pTzWbpa8HISS5TbtYC5wyVmFkq0SXgNvXc47zShdvZhC1xW6fwVNGruGCLy8HhfVgsbpvKKQ7tWPmxeHd63YaUGAfCPlZhX1HgsXi7Nk2Td7g2AS1m1r1f9eWSCjxmF3vcYSQSXYWHrrPmGqaxC71GkRiduJESMhcS1tPRoj7Fza4Fr2iRvery5v8gCj3lkpAqXgONVIrZm16u/a1GAb49I7umUHiJPTM6K7RrrhcvkSkjE2JatljbNvGugn1koceeQ+oms9BBZNNVHs8arr5t2F0XglDWlXXzbt2WMxyb5eHCsRAv3/Q8cNPPBD26U+MN0H80bsbjgqt0pH8bmyLW0bS6Axx1e5hVJ3DFE4m+fhdh0WOPTL3Wu2AwdPdsJjO0jMq9ItHr+N2rymzu+Z7kPqLMHbpeG2pk3Sdq3gPlFEvOLJHQMK85FVUcSoUMLoVFXxZFw0e5LH1Bnc6Zu+dn3axcwBG8fxcOjKeCi3RERu8Btm/ZLyma6O7U7LAL7rSn9PLzYK0d0XLTbJwJ7rCkJ7nydwyP4REM7G3tEJaCexRIOzydC/9ibH+fwGP0KHAXzGHA2nLTNeqawa64IZxsumm2Hq5bJEuuZYV1zJTjbGN7NoVkJXBV4s/VMUXchcmy8HJ5DAEb0iC7wNoz9bAHo2ErItcNZxKDOgt3JvxIIgimwElCrgXetOaLsXp3DY4zt49DqHaAa6s4OvmnNMbF/TuBswUWrdeH/WM+sBWq9xQd0FGKu/0k3urfnPDxB7/aCNT4HGBr+LXxQK7ASUE8C71tz3jY4s6V4/xnvK+wSv7lBuXWQQ6P3gZPhA/vZldaDKUNEpAxq/NQ7NZ4Oglp6Xuex/83cnlGiAFOvcwhUR0P7pNpKjAjiLcHwgyruLbIpQwFZjp3XmbW82rM+y1VXMjtzPqaPY677EtEEVgLqhaBfXgncE06bMzxzAofJdExIrzJ7mGvpvWBNcKuAX7Ie3NBTZFCn3JjYawzqJNi32QGbduAisBJQtwJbrGmNyfu/sTB/hEOTLcBWe2KkLtTT1oPJA0XPhfBryvQrEJg0wCHd0255Iwm8Fss8sSjQaJ3Fs5F7RzkCzOzB0MyBq8BKQNWAx6xpE/qJFHXPleJM8/XuAhP6OWR7jAjrBqONcv+KOacY5uHxviYVmshriAL8ZLzDXXQHhlbu10Q6oQRUHSM8fC0DOwnMLMxV1ZliZqERstHGQ0QZjke1UykBdRPwmjVtQbFElxQsAsuRGF3aCCwodhSu14CN0a6LxxD5MJYViC3z4Oc3SzmHgAZEwHjnttWDVRjaRCWmwEpALQUetaaN6iUyZ3iuqm4oZg+XGOU0ajxqahOVeKcSlmBz67l/jGt7kCPFDOwk8MAYR2EqAV6I5/q4BDaHTfOxuPXIEjxzu3u01xypIb+Z8Y7luvpWAPNNTWIS92SgElAPA/db07q3FXjy1tzQKR2IAvz6Vp/bcpT7lYB6KO6/k8hNlYC6DPgPa9ro3iILJzTBpXxpZuEEH8W9HfL8p6lB3NRnOv9H2BzlZwwV+c7IXKcrVXxnpMSMoQ5ptgELEv1bCQusBNQrGDtOH7emLyiWmH59zlEvWaZfL7qNd48Dd5nvPiHqpYgSUI9j7LNUFU4TgJ9N9HF7hv24spnbB4v8bKLPbmO4CNxuvvOEqbcaSkDdjbHbZW3oNFEwYmjUN1BKU+bOISKPTXJ0WFVgpvmu60VSSigB9S1gLhZ3W1GAX07y5ZwEEmBekcQvneKGgG+a77jeJF3UlID6BnA3FpEF4MGxEo9MaFobYySKKMAjEyQeHOsw/YaAu5WA+pek75HsHwBQAuor2KprMGY/fj/VR37zVNylcZHfHH4/1ec2O6cCs813mjQpayzNkjwNS8cLjHHysjl5ObOmhYGdBJbNyWO0c5xbBUxLRckNk9LekBJQ/w6MB8qs6d3yBf48K4+5w5v2LJQAzBom8edZeW4RccqA8eY7TBkp7+4qAfVj4EZsxhBZgn8dL7F4mq9Jzid3aSOweJqPhTdJdtsyGO/qRvPdpZS0jGfMMds4zD1srYzuLbLyW3nMHtY0OmCiALOHSaz8lmuVDIbpd1x9x7mxEEYuTu+ygaBfnocxtZVvP7f3tM7zm0JsP94448yP6CHy0Dgp0sKBCuABJaAuTeYeQX/0+M9pF9h8iL7AUmzb2IbZcFDj37eG3Hbuykr6FQjcO0py834MU4Ix5Rf3rFAkPCGw+SAixkTFU9i2EQBjv4F/7NdYuj2U8SWZ9WVgJ4G7R0hMGiBGan4qgZ8DL8Q7nxsLzwgcJuiXewKLgBmR8nxUqvHqxxolR7Wk9kFqCEQBinuLzP26yA09o3Zp/gI8FI+bTSJ4TuAwQb88AXgOKIqU51SVzppPNd76XOPYeW8p3audwG2DRaZeFzNc8Q7gYSWgbkjHc3hWYICgXxYwph6fAL4WLe++0zrrD2iUHNHYd7rht6AXMKrgMX1Ebu4vxmO42QM8Drxh+pinBU8LHMZsn6djuIEWx8hO+SWdYKnOJ2Uau07qHCp3bI6cND4R+hYIFHYRGNZNROnpCFUUiRKMmml1qtrZaGSFwFaCfnkU8C8Ytu2W8VxTo8HhszqHzup8cUGnrELnZCWUX9SpVOErVadag6/MfYVa5EGeCC1kgTYyFLQSuKa1EUq5R1uBvh0Eru2QUFDWS8Aq4EVz+W2DkXUChwn65bYYIs/FMH96bf4xhLGq4FVglRJQL8TInxayVmArQb98DTAFuBWYjMswq4GoAtZjxKFaqwTUL2PkTzuNQmArQb8sAyOB0Rjm0CKgZ5puV4rRC96EsYJ+mxJQPbX5X6MT2I2gX24PFAIDMLas7wN0AwrMT0tABlqZl1wCrpj/lpufMuCI+dkP7FIC6rmG+Qb1J5bA/w8QrL/zy2ZeXQAAAABJRU5ErkJggg==');
      width: 2.5rem;
      height: 2.5rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
    }

    &_jieshao {
      padding: 0.5rem 0.8rem;
    }

    &_description p {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
    }

    &_description p img {
      width: 18.75rem;
      overflow: hidden
    }

    .g_pingJiaImg {
      width: 5rem;
      height: 5rem;
    }

    .van-goods-action {
      z-index: 2040
    }

    .van-card__title {
      width: 10.45rem;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 0.95rem;
      max-height: 2.15rem;
      margin-bottom: 0.7rem;
    }

    .tags_font {
      font-size: 0.6rem;
      color: #999;
    }

    .tags_price {
      font-size: 0.75rem;
      color: #fc4141;
      font-weight: 600
    }

    .g_fen {
      .van-popup--bottom {
        z-index: 2500 !important;
        bottom: 0;
        border-radius: 0px;
      }
    }

    .van-icon-like:before {
      color: #E93323;
    }

    .g_car {
      box-sizing: border-box;
      padding: 0.9rem;

      .van-card {
        background: #fff;
        margin-top: 0px !important;
        padding-right: 0.2rem;
        padding-left: 0px;
      }

      &_close {
        right: 0.5rem;
        top: 0.75rem;
        font-size: 1.1rem;
        z-index: 100
      }
    }

    .g_yongImg {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }

    .g_jieShao {

      .van-cell__title,
      .van-cell__value {
        display: flex;
        justify-content: center;
      }
    }

    .g_yong {
      width: 13.8rem
    }

    .van-popup--bottom {
      bottom: 2.5rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }

    .van-overlay {
      top: -2.5rem
    }

    .goods-cell-group {
      margin: 0.5rem 0 !important;
    }

    .g_swipe {
      &_dis {
        bottom: 0.5rem;
        right: 1rem;
        padding: 0rem 0.15rem;
        border-radius: 0.15rem;
        background: rgba(255, 255, 255, 0.6)
      }
    }

    .goods {
      padding-bottom: 50px;

      &-swipe {
        img {
          width: 100%;
          display: block;
        }
      }

      &-title {
        font-size: 16px;
      }

      &-price {
        color: #f44;
      }

      &-express {
        color: #999;
        font-size: 12px;
        padding: 5px 15px;
      }

      &-cell-group {
        margin: 15px 0;

        .van-cell__value {
          color: #999;
        }
      }

      &-tag {
        margin-left: 5px;
      }
    }
  }
</style>
