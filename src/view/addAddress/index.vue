<template>
  <div class="div_all">
    <div class="ad_list">
      <van-address-edit :address-info="addressInfo" :area-list="areaList" :show-postal='false' :show-delete='false'
        show-set-default show-search-result :search-result="searchResult" @save="onSave" @delete="onDelete" @change-default='handleDefault' />
    </div>
    <!-- <div>{{sumAddess}}</div> -->
  </div>
</template>

<script>
  import {
    provinceList,
    cityList,
    countyList
  } from '../../assets/js/area.js';
  import {
    Swipe,
    SwipeItem,
    Toast,
    AddressEdit,
    AddressList,
    Area
  } from 'vant';
  export default {
    name: '',

    mixins: [],

    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [AddressEdit.name]: AddressEdit,
      [AddressList.name]: AddressList,
      [Area.name]: Area,
    },

    props: {},

    data() {
      return {
        areaList: {

        },
        sumAddess: '',
        searchResult: [],
        addressInfo: {},
        isClice:''

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
      if (this.$route.params.type == 'editor') {
        document.title = '修改地址'
      } else {
        document.title = '添加地址'
      }
      Toast.loading({
        mask: false,
        message: '加载中...'
      });
    },
    created() {
      console.log('页面初始化数据加载一般写这里')
      console.log(this.$route.params)
      let type = this.$route.params.type;
      //修改地址的数据
      if(type=='editor'){
        this.getXiuAddess(this.$route.params.id)
      }

      //请求成功后关闭
      this.areaList = {
        province_list: JSON.parse(provinceList())[0],
        city_list: JSON.parse(cityList())[0],
        county_list: JSON.parse(countyList())[0],
      }
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
      //修改地址
      getXiuAddess(addressId) {
        this.$http
          .get("mzyl/user_api/get_user_address.html", {
            params: {
              addressId
            }
          }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              let list = res.data.data;
              let addressInfo = new Object;
              let isDefault = false,
                sumAddess = '',
                aProvi = '',
                areaCode = '';
              if (list.is_default == 1) {
                isDefault = true
              }
              sumAddess = `${list.province+list.city+list.district}`
              console.log(this.areaList)
              console.log(sumAddess)
              let county_list = this.areaList.county_list;
              let province_list =this.areaList.province_list;
              for(let i in province_list){
                if(province_list[i] == list.province){
                  aProvi = i
                }
              }
              aProvi = aProvi.slice(0,2)
              for (let i in county_list) {
                if (county_list[i] == list.district) {
                  let a = '';
                  a = i.slice(0,2);
                  if(a==aProvi){
                   areaCode = i
                  }
                }
              }
              addressInfo = {
                id: list.id,
                name: list.real_name,
                tel: list.phone,
                addressDetail: list.detail,
                isDefault: isDefault,
                areaCode: areaCode,
                province: list.province,
                city: list.city,
                county: list.county,
              }
              this.sumAddess = sumAddess
              this.addressInfo = addressInfo;

            }
          })
      },
      onSave(content) {
        console.log(content)
        let obj = {};
        let _this = this;
        obj.address = {
          city: content.city,
          district: content.county,
          province: content.province
        }
        obj.detail = content.addressDetail
        obj.id = content.id
        let isDefault = '';
        if(content.isDefault==false){
          isDefault = 0
        }else{
          isDefault = 1
        }
        obj.is_default =  isDefault
        obj.phone = content.tel
        obj.real_name =content.name
        console.log(obj)
        _this.$http
          .post("mzyl/user_api/edit_user_address.html", obj).then(res => {
            console.log(res)
            if(res.data.code==200){
              Toast.success({message:'修改成功',onOpened:function(){
                 _this.$router.go(-1);//返回上一层
              }});

            }else{
               Toast.fail(res.data.msg);
            }
          })
        // Toast('save');
      },
      handleDefault(value){
        console.log(value)
        this.isClice = value
      },
      onDelete() {
        Toast('delete');
      },

    }
  };
</script>

<style lang="less">
  .ad_list {
    .van-button--danger {
      background: #E93323;
      border: none;
      border-radius: 1.5rem
    }

    .van-switch--on {
      background-color: #E93323
    }
  }
</style>
