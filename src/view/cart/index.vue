<template>
  <div class="c_cart" v-show='isPageShow'>
    <!-- 认证部分s -->
    <div class="dis flex_y_center c_attestation flex-x-around ptb_10 b_box">
      <div class="dis flex_y_center fz_12" v-for='(item,index) in attestation' :key="index">
        <van-icon name="passed" />
        <div class="ml_5">{{item.des}}</div>
      </div>
    </div>
    <!-- 认证部分e -->

    <!-- 购物数量s -->
    <div class="c_num">
      <div class="color_000 dis flex_y_center c_attestation flex_x_between pall_10 bg_fff">
        <div class="dis flex_y_center fz_14">
          <div>购物数量</div>
          <div class="ml_5 color_E93323">{{isNumData}}</div>
        </div>
        <div class="dis flex_y_center fz_14">
          <div class="ml_5 c_num_guan" @click='hanldeMage(isMage)'>管理</div>
        </div>
      </div>
    </div>
    <!-- 购物数量e -->

    <!-- 购物列表部分s -->
    <div v-for='(item,index) in shopListData' :key="index" class="mt_10" v-if="shopListData.length!=0">
      <div class="dis flex_y_center fz_14 bg_fff b_box pall_10">
        <van-checkbox checked-color="#E93323" v-model="item.isAllSelect" :name='item.store_id' @click='handleXuZe({item:item,isAllSelect:item.isAllSelect})'>全选</van-checkbox>
        <div class="ml_10">{{item.name}}</div>
      </div>
      <van-checkbox checked-color="#E93323" class="card-goods__item p_r" v-for="(itemSon,indexSon) in item.product"
        :key="indexSon" :name="itemSon.id" @click='hanldeRadio({itemSon:itemSon,store_id:item.store_id,checked:itemSon.checked})'
        v-model="itemSon.checked">
        <van-card :title="itemSon.store_name" :desc="itemSon.attrInfo?`属性 ${itemSon.attrInfo.suk}`:''" :price="itemSon.price"
          :thumb="itemSon.image" />
        <div class="p-a card_stepper" @click.stop>
          <van-stepper v-model="itemSon.cart_num " :max='itemSon.stock' min='1' @minus='handleminus(itemSon)' @change="hanldeChange(itemSon)"
            @plus='handleAdd(itemSon)' disable-input />
        </div>
        <div class="p-a c_jump" @click="hanldeGoodes(itemSon.product_id)"></div>
      </van-checkbox>
    </div>
    <!-- 购物列表部分e -->

    <!-- 失效商品s -->
    <div class="c_shiXiao mt_10" v-show="invalidListData.length!=0">
      <div class="dis flex_y_center flex_x_between fz_14 bg_fff b_box pall_10">
        <div class="dis flex_y_center" @click="hanldeShiXiao(isShiXiao)">
          <!-- icon-xiangxia -->
          <div class='iconfont' :class="isShiXiao?'icon-xiangshang':'icon-xiangxia '"></div>
          <div class="ml_10">失效商品</div>
        </div>

        <div class="dis flex_y_center" @click="hanldeShiDel">
          <div class="iconfont icon-shanchu1"></div>
          <div class="ml_5">清空</div>
        </div>

      </div>
      <div v-for='(item,index) in invalidListData' :key="index" v-show='isShiXiao'>
        <van-card :title="item.store_name" :thumb="item.image" tag="失效" :desc="item.attrInfo?`属性 ${item.attrInfo.suk}`:''">
          <div slot="tags" class="dis flex_y_center flex_x_between mt_20 colo_aaa">
            <div>￥{{item.price}}</div>
            <div>该商品已失效</div>
          </div>
        </van-card>
      </div>
    </div>
    <!-- 失效商品e -->

    <!-- 没有商品s -->
    <NoneCart v-if="shopListData.length==0&&invalidListData.length==0"></NoneCart>
    <!-- 没有商品e -->
    <!-- 立即购买s -->
    <van-submit-bar v-if='isMage' button-text="立即下单" :disabled='totalPrice.needId.length==0' @submit="handleOnSubmit(totalPrice.needId)">
      <div class="c_submit p-r">
        <div class="c_price">
          <div>总价（不含税）：￥{{formatPrice(totalPrice.total)}}</div>
          <div>预估税费：￥{{`${formatPrice(totalPrice.totxt)}`}}</div>
        </div>
      </div>
    </van-submit-bar>
    <van-submit-bar v-else class="c_cancel">
      <div class="dis flex_y_center flex-x-end plr_10 b_box">
        <van-button type="default" size="small" round @click='hanldeCollect({cart:"cart"})'>收藏</van-button>
        <van-button type="default" size="small" round class='ml_10' @click='hanldeDelete'>删除</van-button>
      </div>
    </van-submit-bar>
    <!-- 立即购买e -->
  </div>
</template>

<script>
  import NoneCart from '@/components/templateTwo.vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import {
    Checkbox,
    CheckboxGroup,
    Card,
    SubmitBar,
    Toast,
    Icon,
    Stepper,
    Button
  } from 'vant';

  export default {
    components: {
      [Card.name]: Card,
      [Checkbox.name]: Checkbox,
      [SubmitBar.name]: SubmitBar,
      [CheckboxGroup.name]: CheckboxGroup,
      [Icon.name]: Icon,
      [Stepper.name]: Stepper,
      [Button.name]: Button,
      NoneCart
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    beforeCreate() {
      console.log('给个loading界面 created撤销loading');
      Toast.loading({
        mask: false,
        message: '加载中...'
      });
    },
    data() {
      return {
        checked: false,
        isPageShow: false,
        isMage: true,
        isShiXiao: false,
        attestation: [{
          des: '100%正品保证'
        }, {
          des: '所有商品精挑细选'
        }, {
          des: '售后无忧'
        }],
      };
    },
    watch: {
      //监听路由变化
      $route(to, from) {
        console.log('监听路由变化')
      },
      hanldeDelete: function(newValue) {
        console.log(newValue)
      }


    },
    created() {
      // this.$store.commit('added', '');
      // console.log(this.$store)
      localStorage.setItem('flagPup',1)
      this.$http
        .get("mzyl/auth_api/get_cart_list.html", {
          params: {
            version: 'V2.0'
          }
        }).then(res => {
          console.log(res)
          let list = res.data.data;
          console.log(list.invalid)
          let shopList = list.valid;
          let invalidList = list.invalid;
          // 测试s
          let obj = {
            bargain_id: 0,
            cart_num: 1,
            checked: false,
            combination_id: 0,
            cost: "0.00",
            id: 1990,
            image: "https://cst.stnyhb.com/public/uploads/attach/2019/08/02/5d43ae85cb4cc.jpg",
            is_del: 0,
            is_show: 1,
            numAdd: false,
            numSub: true,
            price: 265,
            product_attr_unique: "",
            product_id: 7,
            product_type: 1,
            seckill_id: 0,
            stock: 767,
            store_id: 1,
            store_name: "Encare 口服耳牛蛋白粉胶囊",
            tax: "24.11",
            tax_rate: "9.10",
            vip_price: 0,
          };
          let obj2 = {
            bargain_id: 0,
            cart_num: 1,
            checked: false,
            combination_id: 0,
            cost: "0.00",
            id: 14567,
            image: "https://cst.stnyhb.com/public/uploads/attach/2019/08/02/5d43ae85cb4cc.jpg",
            is_del: 0,
            is_show: 1,
            numAdd: false,
            numSub: true,
            price: 265,
            product_attr_unique: "",
            product_id: 7,
            product_type: 1,
            seckill_id: 0,
            stock: 767,
            store_id: 1,
            store_name: "Encare 口服耳牛蛋白粉胶囊",
            tax: "24.11",
            tax_rate: "9.10",
            vip_price: 0,
          }
          // invalidList.push(obj, obj2)
          // console.log(shopList)
          // shopList[0].product.push(obj, obj2);
          // shopList[1].product.push(obj3)
          // 测试e
          shopList.forEach((shopOne, index, arr) => {
            shopOne.isAllSelect = false;
            shopOne.checkedCartCount = 0;
            shopOne.product.forEach((shopTow, indexTow, arrTow) => {
              shopTow.checked = false;
              shopTow.numSub = true;
              shopTow.numAdd = false;
              shopTow.store_id = shopOne.store_id;
            })
          })
          this.$store.commit('getShopList', shopList);
          this.$store.commit('getInvalidList', invalidList);
          Toast.clear();
          this.isPageShow = true;
          console.log(shopList)
        })
      // 获取购物车e

      //获取数量接口s
      this.$http
        .get("mzyl/auth_api/get_cart_num.html", {
        }).then(res => {
          console.log(res)
          if(res.data.code==200){
       
             this.$store.commit('getNum', res.data.data);
          }
        })
      //获取数量接口e
    },
    destroyed() {
      console.log('页面跳转了,当前组件已被删除，清空相关内容')
      let added = [];
      this.$store.commit('getClearData', added);

    },
    computed: {
      ...mapGetters(['shopListData', 'totalPrice', 'invalidListData','isNumData'])
    },

    methods: {
      formatPrice(price) {
        return (price).toFixed(2);
      },
      hanldeMage(j) {
        this.isMage = !j
        console.log(j)
        console.log('管理')
      },
      hanldeShiXiao(i) {
        this.isShiXiao = !i
      },
      handleOnSubmit(needId) {
        // Toast('点击结算');
        // console.log(needId)
        let _this = this;
        _this.$router.push({
          path: '/submitOrder',
          query: {
            id: needId
          }
        })
      },
      hanldeGoodes(id) {
        this.$router.push({
          path: '/goods',
          query: {
            id: id
          }
        })
      },
      ...mapActions(['handleXuZe', 'hanldeRadio', 'hanldeChange', 'hanldeDelete', 'handleAdd', 'handleminus',
        'hanldeShiDel', 'hanldeCollect'
      ]),
    }
  };
</script>

<style lang="less">
  .c_cart {
    padding-bottom: 6rem;

    .van-button--large {
      line-height: 2.15rem;
    }

    .c_jump {
      top: 0px;
      left: 1.9rem;
      width: 11rem;
      height: 4.8rem;
    }

    .c_cancel {
      .van-button--danger {
        display: none
      }

      .van-button--default:nth-of-type(1) {
        color: #E93323;
        border: 1px solid #E93323
      }

      .van-button--default:last-child {
        color: #999;
        border: 1px solid #999
      }
    }

    .van-stepper__input[disabled] {
      color: #000000;
    }

    .c_price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 0.55rem;

    }

    .c_submit {
      box-sizing: border-box;
      height: 100%;
      display: flex;
      width: 66%;
      align-items: center;
      justify-content: space-between
    }

    .van-button--danger {
      background-color: #E93323;
      border: 1px solid #E93323;
    }

    .van-card {
      font-size: 0.7rem
    }


    .c_shiXiao {
      .van-card__title {
        color: #AAAAAA
      }
    }

    // .van-card__title {
    //   padding-bottom: 0.25rem;
    // }

    .van-card__price {
      color: #000 !important;
    }

    .van-card__bottom {
      padding-top: 0.5rem;
    }

    .van-card__content {
      display: flex;
      justify-content: center;
    }

    .van-tag--danger {
      background-color: #AAAAAA;
    }

    .card_stepper {
      bottom: 0.75rem;
      right: 0.75rem;
    }

    .van-checkbox__label,
    .van-card,
    .card-goods__item van-checkbox,
    .card-goods__item {
      background: #fff !important;
    }

    .card-goods__item {

      // margin-top: 0.5rem;

    }

    .card-goods {
      background: #F4F4F4 !important;
    }

    .c_num_guan {
      border: 1px solid #BABABA;
      border-radius: 0.15rem;
      padding: 0.15rem 0.5rem;
    }

    .van-submit-bar {
      box-sizing: border-box;
      bottom: 2.5rem;
      border-top: 1px solid #ddd;
    }

    .card-goods {
      background-color: #fff;

      &__item {
        position: relative;
        background-color: #fafafa;

        .van-checkbox__label {
          width: 100%;
          height: auto; // temp
          padding: 0 10px 0 15px;
          box-sizing: border-box;
        }

        .van-checkbox__icon {
          top: 50%;
          left: 10px;
          z-index: 1;
          position: absolute;
          margin-top: -10px;
        }

        .van-card__price {
          color: #E93323;
        }
      }
    }
  }
</style>
