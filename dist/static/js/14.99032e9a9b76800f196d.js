webpackJsonp([14],{ARAM:function(t,e){},GajC:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("eqfM");var l,a=i("/QYm"),s=i("bOdI"),o=i.n(s),n=(i("zP7x"),i("rD0v")),c=(i("3AsM"),i("7ZPY")),r={name:"",mixins:[],components:(l={},o()(l,c.a.name,c.a),o()(l,n.a.name,n.a),l),props:{},data:function(){return{urserInfo:{}}},computed:{},watch:{$route:function(t,e){console.log(t)}},beforeRouteLeave:function(t,e,i){console.log(e),i()},beforeRouteEnter:function(t,e,i){console.log(e),i()},beforeCreate:function(){console.log("给个loading界面 created撤销loading"),a.a.loading({mask:!1,message:"加载中..."})},created:function(){console.log("页面初始化数据加载一般写这里");var t={cert_id:localStorage.getItem("cert_id"),real_name:localStorage.getItem("real_name"),after_img:localStorage.getItem("after_img"),front_img:localStorage.getItem("front_img")};this.urserInfo=t,a.a.clear()},mounted:function(){},updated:function(){console.log("页面刷新了")},beforeDestory:function(){console.log("你确认删除XX吗？")},destroyed:function(){console.log("页面跳转了,当前组件已被删除，清空相关内容")},methods:{handleClick:function(t){console.log(t)}}},g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div_all result"},[t._m(0),t._v(" "),i("div",{staticClass:"fz_14 mt_20"},[i("div",{staticClass:"dis flex_y_center r_box"},[i("div",{staticClass:"r_name color_000"},[t._v("姓名")]),t._v(" "),i("div",[t._v(t._s(t.urserInfo.real_name))])]),t._v(" "),i("div",{staticClass:"dis flex_y_center r_box"},[i("div",{staticClass:"r_name color_000"},[t._v("身份证号")]),t._v(" "),i("div",[t._v(t._s(t.urserInfo.cert_id))])])]),t._v(" "),i("div",{staticClass:"dis flex_y_center fz_14 color_000 flex_x_between ov w_all b_box pt_5"},[i("div",{staticClass:"dis flex-dir-column r_shengBox"},[i("img",{staticClass:"r_sheng",attrs:{src:t.urserInfo.front_img,alt:""}}),t._v(" "),i("div",{staticClass:"mt_10"},[t._v("添加身份证正面（头像）")])]),t._v(" "),i("div",{staticClass:"dis flex-dir-column r_shengBox"},[i("img",{staticClass:"r_sheng",attrs:{src:t.urserInfo.after_img,alt:""}}),t._v(" "),i("div",{staticClass:"mt_10"},[t._v("添加身份证反面（国徽）")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"dis flex-dir-column flex_y_center flex-x-center"},[e("img",{staticClass:"r_img",attrs:{src:i("Xs0s"),alt:""}}),this._v(" "),e("div",{staticClass:"fz_16 fw_600 color_000"},[this._v("恭喜，实名认证成功")])])}]};var m=i("VU/8")(r,g,!1,function(t){i("ARAM")},null,null);e.default=m.exports},Xs0s:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwMDgwM0E0M0ZGMTExRTlCNDA5ODY3OURGQTBBMTJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwMDgwM0E1M0ZGMTExRTlCNDA5ODY3OURGQTBBMTJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTAwODAzQTIzRkYxMTFFOUI0MDk4Njc5REZBMEExMkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTAwODAzQTMzRkYxMTFFOUI0MDk4Njc5REZBMEExMkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz41J2CRAAAHOklEQVR42uxa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"}});
//# sourceMappingURL=14.99032e9a9b76800f196d.js.map