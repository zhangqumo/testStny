webpackJsonp([11],{"9/ui":function(e,t){},dcLm:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("eqfM");var n,i=a("/QYm"),o=a("bOdI"),s=a.n(o),r=(a("3Lne"),a("SSsa")),l=(a("i0mo"),a("Hkar")),c=(a("OWWB"),a("1fWZ")),u=(a("oXr1"),a("wbAJ")),d=(a("zP7x"),a("rD0v")),h=(a("3AsM"),a("7ZPY")),f={name:"",mixins:[],components:(n={},s()(n,h.a.name,h.a),s()(n,d.a.name,d.a),s()(n,u.a.name,u.a),s()(n,c.a.name,c.a),s()(n,l.a.name,l.a),s()(n,r.a.name,r.a),n),props:{},data:function(){return{userInfo:{},cert_id:"",verify_state:""}},computed:{},watch:{$route:function(e,t){console.log(e)}},beforeRouteLeave:function(e,t,a){console.log(t),a()},beforeRouteEnter:function(e,t,a){console.log(t),a()},beforeCreate:function(){console.log("给个loading界面 created撤销loading"),i.a.loading({mask:!1,message:"加载中..."})},created:function(){console.log("页面初始化数据加载一般写这里"),this.cert_id=localStorage.getItem("cert_id"),1==localStorage.getItem("verify_state")?this.verify_state=!0:this.verify_state=!1,this.getVerified(),i.a.clear()},mounted:function(){},updated:function(){console.log("页面刷新了")},beforeDestory:function(){console.log("你确认删除XX吗？")},destroyed:function(){console.log("页面跳转了,当前组件已被删除，清空相关内容")},methods:{handleClick:function(e){console.log(e)},handleResult:function(e){if(0==e)return this.$router.push({path:"/result"}),!1;1==e&&this.$router.push({path:"/iDidentity"})},getVerified:function(){var e=this;this.$http.get("mzyl/user_api/get_my_user_info.html",{}).then(function(t){console.log(t),e.userInfo=t.data.data})}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"div_all  authentication"},[a("van-cell-group",[a("van-cell",{attrs:{title:"姓名",value:e.userInfo.nickname}}),e._v(" "),a("van-cell",{attrs:{title:"身份证",value:e.cert_id}}),e._v(" "),a("van-cell",{attrs:{title:"认证状态",value:e.verify_state?"已认证":"未认证"}}),e._v(" "),a("van-cell",{attrs:{title:"手机号码",value:e.userInfo.phone?e.userInfo.phone:""}}),e._v(" "),a("van-cell",{attrs:{title:"ID号",value:e.userInfo.uid}})],1),e._v(" "),a("div",{staticClass:"plr_10 b_box"},[e.verify_state?a("van-button",{staticClass:"mt46",attrs:{color:"#E93323",type:"danger",size:"large",round:""},on:{click:function(t){return e.handleResult(0)}}},[e._v("查看认证详情")]):a("van-button",{staticClass:"mt46",attrs:{color:"#E93323",type:"danger",size:"large",round:""},on:{click:function(t){return e.handleResult(1)}}},[e._v("去认证")])],1)],1)},staticRenderFns:[]};var p=a("VU/8")(f,v,!1,function(e){a("zgMH")},null,null);t.default=p.exports},mSI1:function(e,t){},oXr1:function(e,t,a){"use strict";var n=a("nsZj"),i=(a.n(n),a("5Hoj")),o=(a.n(i),a("nOtf")),s=(a.n(o),a("px3J")),r=(a.n(s),a("hW8u")),l=(a.n(r),a("eh36")),c=(a.n(l),a("JKiR")),u=(a.n(c),a("yU4Z")),d=(a.n(u),a("9/ui")),h=(a.n(d),a("mSI1"));a.n(h)},wbAJ:function(e,t,a){"use strict";var n=a("RfZZ"),i=a("o69Z"),o=a("6Svu"),s=a("iTiM"),r=a("0zAV"),l=a("qYlo"),c=a("/QYm"),u=a("SSsa"),d=a("il3B"),h=a("wlRt"),f=a("1fWZ"),v=Object(i.b)("address-edit-detail"),p=v[0],m=v[1],g=v[2],b=Object(h.a)(),y=p({props:{value:String,error:Boolean,focused:Boolean,detailRows:Number,searchResult:Array,detailMaxlength:Number,showSearchResult:Boolean},methods:{onSelect:function(e){this.$emit("select-search",e),this.$emit("input",((e.address||"")+" "+(e.name||"")).trim())},onFinish:function(){this.$refs.field.blur()},renderFinish:function(){var e=this.$createElement;if(this.value&&this.focused&&b)return e("div",{class:m("finish"),on:{click:this.onFinish}},[g("complete")])},renderSearchResult:function(){var e=this,t=this.$createElement,a=this.searchResult;if(this.focused&&a&&this.showSearchResult)return a.map(function(a){return t(f.a,{key:a.name+a.address,attrs:{title:a.name,label:a.address,icon:"location-o",clickable:!0},on:{click:function(){e.onSelect(a)}}})})}},render:function(){var e=arguments[0];return e(f.a,{class:m()},[e(r.a,{attrs:{autosize:!0,rows:this.detailRows,clearable:!b,type:"textarea",value:this.value,error:this.error,label:g("label"),maxlength:this.detailMaxlength,placeholder:g("placeholder")},ref:"field",scopedSlots:{icon:this.renderFinish},on:Object(n.a)({},this.$listeners)}),this.renderSearchResult()])}}),w=a("AA6R"),S=a.n(w),C=a("rhik"),D=a("V+2B"),R={value:null,loading:Boolean,disabled:Boolean,activeColor:String,inactiveColor:String,activeValue:{type:null,default:!0},inactiveValue:{type:null,default:!1},size:{type:String,default:"30px"}},A=a("pIDD"),_=Object(i.b)("switch"),k=_[0],j=_[1];function O(e,t,a,n){var i=t.size,o=t.value,s=t.loading,r=t.disabled,l=t.activeColor,c=t.activeValue,u=t.inactiveColor,d=t.inactiveValue,h=o===c,f={fontSize:i,backgroundColor:h?l:u},v=h?l||D.a:u||D.j;return e("div",S()([{class:j({on:h,disabled:r}),attrs:{role:"switch","aria-checked":String(h)},style:f,on:{click:function(){if(!r&&!s){var e=h?d:c;Object(C.a)(n,"input",e),Object(C.a)(n,"change",e)}}}},Object(C.b)(n)]),[e("div",{class:j("node")},[s&&e(A.a,{class:j("loading"),attrs:{color:v}})])])}O.props=R;var x=k(O),$=Object(i.b)("switch-cell"),B=$[0],I=$[1];function z(e,t,a,i){return e(f.a,S()([{attrs:{center:!0,size:t.cellSize,title:t.title,border:t.border},class:I([t.cellSize])},Object(C.b)(i)]),[e(x,{props:Object(n.a)({},t),on:Object(n.a)({},i.listeners)})])}z.props=Object(n.a)({},R,{title:String,cellSize:String,border:{type:Boolean,default:!0},size:{type:String,default:"24px"}});var V=B(z),F=Object(i.b)("address-edit"),P=F[0],L=F[1],M=F[2],E={name:"",tel:"",country:"",province:"",city:"",county:"",areaCode:"",postalCode:"",addressDetail:"",isDefault:!1};t.a=P({props:{areaList:Object,isSaving:Boolean,isDeleting:Boolean,validator:Function,showDelete:Boolean,showPostal:Boolean,searchResult:Array,showSetDefault:Boolean,showSearchResult:Boolean,saveButtonText:String,deleteButtonText:String,showArea:{type:Boolean,default:!0},showDetail:{type:Boolean,default:!0},detailRows:{type:Number,default:1},detailMaxlength:{type:Number,default:200},addressInfo:{type:Object,default:function(){return Object(n.a)({},E)}},telValidator:{type:Function,default:o.a},postalValidator:{type:Function,default:function(e){return/^\d{6}$/.test(e)}}},data:function(){return{data:{},showAreaPopup:!1,detailFocused:!1,errorInfo:{tel:!1,name:!1,postalCode:!1,addressDetail:!1}}},computed:{areaListLoaded:function(){return Object(i.e)(this.areaList)&&Object.keys(this.areaList).length},areaText:function(){var e=this.data,t=e.country,a=e.province,n=e.city,i=e.county;if(e.areaCode){var o=[t,a,n,i];return a&&a===n&&o.splice(1,1),o.filter(function(e){return e}).join("/")}return""}},watch:{addressInfo:{handler:function(e){this.data=Object(n.a)({},E,{},e),this.setAreaCode(e.areaCode)},deep:!0,immediate:!0},areaList:function(){this.setAreaCode(this.data.areaCode)}},methods:{onFocus:function(e){this.errorInfo[e]=!1,this.detailFocused="addressDetail"===e,this.$emit("focus",e)},onChangeDetail:function(e){this.data.addressDetail=e,this.$emit("change-detail",e)},onAreaConfirm:function(e){this.showAreaPopup=!1,this.assignAreaValues(),this.$emit("change-area",e)},assignAreaValues:function(){var e=this.$refs.area;if(e){var t=e.getArea();t.areaCode=t.code,delete t.code,Object(n.a)(this.data,t)}},onSave:function(){var e=this,t=["name","tel","areaCode","addressDetail"];this.showPostal&&t.push("postalCode"),t.every(function(t){var a=e.getErrorMessage(t);return a&&(e.errorInfo[t]=!0,Object(c.a)(a)),!a})&&!this.isSaving&&this.$emit("save",this.data)},getErrorMessage:function(e){var t=String(this.data[e]||"").trim();if(this.validator){var a=this.validator(e,t);if(a)return a}switch(e){case"name":return t?"":M("nameEmpty");case"tel":return this.telValidator(t)?"":M("telInvalid");case"areaCode":return t?"":M("areaEmpty");case"addressDetail":return t?"":M("addressEmpty");case"postalCode":return t&&!this.postalValidator(t)?M("postalEmpty"):""}},onDelete:function(){var e=this;d.a.confirm({title:M("confirmDelete")}).then(function(){e.$emit("delete",e.data)}).catch(function(){e.$emit("cancel-delete",e.data)})},getArea:function(){return this.$refs.area?this.$refs.area.getValues():[]},setAreaCode:function(e){this.data.areaCode=e||"",e&&this.$nextTick(this.assignAreaValues)},setAddressDetail:function(e){this.data.addressDetail=e},onDetailBlur:function(){var e=this;setTimeout(function(){e.detailFocused=!1})}},render:function(){var e=this,t=arguments[0],a=this.data,n=this.errorInfo,i=this.searchResult,o=function(t){return function(){return e.onFocus(t)}},c=i&&i.length&&this.detailFocused;return t("div",{class:L()},[t(r.a,{attrs:{clearable:!0,label:M("name"),placeholder:M("namePlaceholder"),error:n.name},on:{focus:o("name")},model:{value:a.name,callback:function(e){a.name=e}}}),t(r.a,{attrs:{clearable:!0,type:"tel",label:M("tel"),placeholder:M("telPlaceholder"),error:n.tel},on:{focus:o("tel")},model:{value:a.tel,callback:function(e){a.tel=e}}}),t(r.a,{directives:[{name:"show",value:this.showArea}],attrs:{readonly:!0,label:M("area"),placeholder:M("areaPlaceholder"),value:this.areaText},on:{click:function(){e.showAreaPopup=!0}}}),t(y,{directives:[{name:"show",value:this.showDetail}],attrs:{focused:this.detailFocused,value:a.addressDetail,error:n.addressDetail,detailRows:this.detailRows,detailMaxlength:this.detailMaxlength,searchResult:this.searchResult,showSearchResult:this.showSearchResult},on:{focus:o("addressDetail"),blur:this.onDetailBlur,input:this.onChangeDetail,"select-search":function(t){e.$emit("select-search",t)}}}),this.showPostal&&t(r.a,{directives:[{name:"show",value:!c}],attrs:{type:"tel",maxlength:"6",label:M("postal"),placeholder:M("postal"),error:n.postalCode},on:{focus:o("postalCode")},model:{value:a.postalCode,callback:function(e){a.postalCode=e}}}),this.slots(),this.showSetDefault&&t(V,{directives:[{name:"show",value:!c}],attrs:{title:M("defaultAddress")},on:{change:function(t){e.$emit("change-default",t)}},model:{value:a.isDefault,callback:function(e){a.isDefault=e}}}),t("div",{directives:[{name:"show",value:!c}],class:L("buttons")},[t(u.a,{attrs:{block:!0,loading:this.isSaving,type:"danger",text:this.saveButtonText||M("save")},on:{click:this.onSave}}),this.showDelete&&t(u.a,{attrs:{block:!0,loading:this.isDeleting,text:this.deleteButtonText||M("delete")},on:{click:this.onDelete}})]),t(l.a,{attrs:{position:"bottom",lazyRender:!1,getContainer:"body"},model:{value:e.showAreaPopup,callback:function(t){e.showAreaPopup=t}}},[t(s.a,{ref:"area",attrs:{loading:!this.areaListLoaded,value:a.areaCode,areaList:this.areaList},on:{confirm:this.onAreaConfirm,cancel:function(){e.showAreaPopup=!1}}})])])}})},yU4Z:function(e,t){},zgMH:function(e,t){}});
//# sourceMappingURL=11.80d41d55ef11944c76c1.js.map