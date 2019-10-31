//初始化数据类似data
import Vue from 'vue'
import axios from 'axios'
import {
  Toast
} from 'vant';
Vue.use(Toast);
const state = {
  shopList: [],
  added: [],
  invalidList: [],
  isNum: 0,
  // count:0
};
//getter 抛出去的数据
const getters = {
  shopListData: state => state.shopList,
  invalidListData: state => state.invalidList,
  isNumData: state => state.isNum,
  // collectNumData: state => state.collectNum,
  //计算总价s
  totalPrice: (state, getters) => {
    let total = 0;
    let totxt = 0;
    let needId = []
    console.log(getters.cartProducts)
    // localStorage.setItem('isJump',1)
    // if()
    getters.cartProducts.forEach(n => {
      total += parseFloat(n.price) * parseFloat(n.cart_num);
      totxt += parseFloat(n.tax) * parseFloat(n.cart_num);
      needId.push(n.id)
    })

    return {
      total,
      totxt,
      needId
    };
  },
  //计算总价e
  //购物车的列表
  cartProducts: state => {
    return state.added
  }
};
//action 异步的此操作
const actions = {
  //全选s
  handleXuZe({
    commit
  }, sid) {
    commit('allSelected', {
      storeId: sid.item.store_id,
      isAllSelect: sid.isAllSelect
    })
  },
  //全选e
  //单选s
  hanldeRadio({
    commit
  }, dis) {
    commit('radioSelected', {
      list: dis,
      id: dis.itemSon.id,
      sid: dis.store_id,
      checked: dis.checked
    })
  },
  //删除失效s
  hanldeShiDel({
    commit
  }) {
    commit('getShiDel')
  },
  //删除失效e
  //单选e
  // 数量增加s
  hanldeChange({
    commit
  }, data) {
    commit('addNum', {
      data: data
    })
  },
  //数量减小e
  //增s
  handleAdd({
    commit
  }, data) {
    commit('getCarAdd', {
      data: data
    })
  },
  //增e
  //减s
  handleminus({
    commit
  }, data) {
    commit('getMinus', {
      data: data
    })
  },
  //减e
  //删除s
  hanldeDelete({
    commit
  }) {
    commit('deleteCar')
  },
  //删除e
  //收藏s
  hanldeCollect({
    commit
  }, type) {
    commit('getCollect', {
      type
    })
  }
  //收藏e

};
//mutation
const mutations = {
  //全选s
  allSelected(state, {
    storeId,
    isAllSelect
  }) {
//     let isShow = false;
//     if (isAllSelect == true) {
//
//       isShow = false;
//     } else {
//       isShow = true;
//       console.log("选择")
//     }
    mutations.getIsShowCommodity(localStorage.getItem('isFlagCar'), localStorage.getItem('flagPup'), storeId, state.shopList
      .length)
    state.shopList.find((a, index, arr) => {
      if (a.store_id == storeId && a.isAllSelect == false) {
        state.added = []
        a.isAllSelect = true;
        a.product.find((b) => {
          b.checked = true;
          if (isAllSelect == false) {
            let obj = {};
            obj.price = b.price;
            obj.cart_num = b.cart_num;
            obj.tax = b.tax;
            obj.id = b.id;
            obj.store_id = b.store_id;
            state.added.push(obj)
          }
          console.log(state.added)
        })
      } else {
        if (isAllSelect == true) {

          state.added = []
        }
        a.isAllSelect = false;
        a.product.find((b) => {
          b.checked = false;

        })
      }
    })
  },
  //全选e
  //单选s
  radioSelected(state, {
    id,
    sid,
    list,
    checked
  }) {
    // console.log(checked)
    mutations.getIsShowCommodity(localStorage.getItem('isFlagCar'), localStorage.getItem('flagPup'), sid, state.shopList
      .length)
    if (list.itemSon.store_id == sid) {
      if (checked == false) {
        let obj = {};
        obj.price = list.itemSon.price;
        obj.cart_num = list.itemSon.cart_num;
        obj.tax = list.itemSon.tax;
        obj.id = list.itemSon.id;
        obj.store_id = list.itemSon.store_id;
        state.added.push(obj)
        state.added.forEach((n, i) => {
          if (n.store_id == list.itemSon.store_id) {} else {
            state.added = [];
            let obj = {};
            obj.price = list.itemSon.price;
            obj.cart_num = list.itemSon.cart_num;
            obj.tax = list.itemSon.tax;
            obj.id = list.itemSon.id;
            obj.store_id = list.itemSon.store_id;
            state.added.push(obj)
          }
        })
      } else if (checked == true) {
        if (list.itemSon.id == id) {
          state.added.forEach((n, i) => {
            if (n.id == list.itemSon.id) {
              state.added.splice(i, 1)
            }
          })
        }
      }
    }
    for (let i in state.shopList) {
      let productArr = state.shopList[i].product;
      if (sid == state.shopList[i].store_id) {
        for (let j in productArr) {

//             if (id == productArr[i].id && productArr[i].checked == false) {
//               productArr[i].checked = true
//             }
//
//             if (id == productArr[i].id && productArr[i].checked == true) {
//               productArr[i].checked = false
//             }


          if (productArr.length == state.added.length) {
            state.shopList[i].isAllSelect = true;
          } else {
            state.shopList[i].isAllSelect = false;
          }
        }
      } else {
        state.shopList[i].isAllSelect = false;
        for (let j in productArr) {
          productArr[j].checked = false
        }
      }
    }
  },
  //单选e
  //初始数据1s
  getShopList(state, listData) {
    state.shopList = listData
  },
  //初始数据1e
  //初始数据2s
  getInvalidList(state, invalidList) {
    state.invalidList = invalidList
  },
  //初始数据2e
  //初始数据3s
  getNum(state, data) {
    state.isNum = data
  },
  //初始数据3e
  //删除s
  deleteCar(state) {
    if (state.added.length == 0) {
      Toast({
        message: '请选择产品',
        duration: '1000'
      });
      return false
    }
    // state.added
    let ids = [];
    for (let i in state.added) {
      ids.push(state.added[i].id)
    }
    ids = ids.join(',')
    axios.get("mzyl/auth_api/remove_cart.html", {
      params: {
        ids
      }
    }).then(res => {
      console.log(res)
      mutations.getNewList(state)
      mutations.getNewNum(state)
    })
  },
  //删除e
  //刷新数据1s
  getNewList(state) {
    axios.get("mzyl/auth_api/get_cart_list.html", {
      params: {
        version: 'V2.0'
      }
    }).then(res => {
      let list = res.data.data;
      let shopList = list.valid;
      if (shopList.length == 0) {
        state.shopList = shopList
      } else {
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
        state.shopList = shopList
      }
    })
  },
  //刷新数据1e
  //刷新数据2s

  //刷新数据2
  getNewNum(state) {
    axios.get("mzyl/auth_api/get_cart_num.html", {}).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        state.isNum = res.data.data
      }
    })
  },
  //清除数据s
  getClearData(state, added) {
    state.added = added
  },
  //清除数据e
  //初始数据e
  // 数量增加s
  addNum(state, {
    data
  }) {
    state.added.forEach((n) => {
      if (n.id == data.id) {
        n.cart_num = data.cart_num;
      }
    })
  },
  // 数量增加e
  //增s
  getCarAdd(state, {
    data
  }) {

    console.log("加")

    let cartId = data.id;
    let cartNum = parseInt(data.cart_num + 1);
    mutations.getCartNum(cartId, cartNum, state)
  },
  //增e
  //减s
  getMinus(state, {
    data
  }) {
    console.log("减")
    let cartId = data.id;
    let cartNum = parseInt(data.cart_num - 1);
    mutations.getCartNum(cartId, cartNum)
  },
  //减e
  //修改数量接口s
  getCartNum(cartId, cartNum, state) {
    axios.get("mzyl/auth_api/change_cart_num.html", {
      params: {
        cartId,
        cartNum
      }
    }).then(res => {
      if (res.data.code == 400 && state) {
        state.shopList.forEach((a) => {
          for (let i in a.product) {
            if (a.product[i].id == cartId) {
              a.product[i].cart_num = cartNum - 1
            }
          }
        })
        Toast({
          message: res.data.msg,
          duration: '1000'
        });
      }
    })
  },
  //修改数量接口e
  //删除失效s
  getShiDel(state) {
    console.log(state.invalidList)
    let ids = [];
    state.invalidList.forEach((o) => {
      console.log(o)
      ids.push(o.id)
    })
    ids = ids.join(',')
    axios.get("mzyl/auth_api/remove_cart.html", {
      params: {
        ids
      }
    }).then(res => {
      state.invalidList = []
    })
  },
  //删除失效e
  //收藏s
  getCollect(state, {
    type
  }) {
    console.log(type)
    if (state.added.length == 0 && type.cart == 'cart') {
      Toast({
        message: '请选择产品',
        duration: '1000'
      });
      return false
    }
    let productId = [];
    if (type.cart == 'cart') {
      for (let i in state.added) {
        productId.push(state.added[i].id)
      }
      productId = productId.join(',')
    }
    axios.get("mzyl/store_api/collect_product_all", {
      params: {
        productId
      }
    }).then(res => {
      Toast.success({
        message: res.data.msg,
        duration: '1000'
      });
    })
  },
  //收藏e
  // 判断是否显示不同商品s
  getIsShowCommodity(isFlagCar, flagPup, storeId, length,isShow) {
    if (length == 1) {
      return false
    }
    if (flagPup == 1) {
      localStorage.setItem('flagPup', 2)
      localStorage.setItem('newStoreId', storeId)
      // if (isShow) {
      //   localStorage.setItem('flagPup', 2)
      //   localStorage.setItem('newStoreId', storeId)
      // } else {
      //   localStorage.setItem('flagPup', 1)
      // }
    }
    if (localStorage.getItem('newStoreId') != storeId) {
      if (localStorage.getItem('isFlagCar') == 1) {
        Toast({
          message: '不同仓库间的商品无法同时下单',
        });
        localStorage.setItem('isFlagCar', 2)
      }
    }
  }
  // 判断是否显示不同商品e
};
export default {
  state,
  getters,
  actions,
  mutations
}
