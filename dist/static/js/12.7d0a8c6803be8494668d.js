webpackJsonp([12],{CGQl:function(t,e){},OhwO:function(t,e,i){"use strict";var n=i("RfZZ"),a=i("7+uW"),o=i("o69Z"),s=i("joY4"),r=i("RP/J"),l=i("CsZI"),c=i("vwLT"),u=i("Xx0f"),h=i("Wtz3"),d=i("pIDD"),f=i("7ZPY"),m=i("rD0v"),v=Object(o.b)("image-preview"),p=v[0],g=v[1];function w(t){return Math.sqrt(Math.abs((t[0].clientX-t[1].clientX)*(t[0].clientY-t[1].clientY)))}var y,b=p({mixins:[l.a,c.a,u.a],props:{className:null,lazyLoad:Boolean,asyncClose:Boolean,showIndicators:Boolean,images:{type:Array,default:function(){return[]}},loop:{type:Boolean,default:!0},swipeDuration:{type:Number,default:500},overlay:{type:Boolean,default:!0},showIndex:{type:Boolean,default:!0},startPosition:{type:Number,default:0},minZoom:{type:Number,default:1/3},maxZoom:{type:Number,default:3},overlayClass:{type:String,default:g("overlay")},closeOnClickOverlay:{type:Boolean,default:!0}},data:function(){return this.bindStatus=!1,{scale:1,moveX:0,moveY:0,moving:!1,zooming:!1,active:0,doubleClickTimer:null}},computed:{imageStyle:function(){var t=this.scale,e={transitionDuration:this.zooming||this.moving?"0s":".3s"};return 1!==t&&(e.transform="scale3d("+t+", "+t+", 1) translate("+this.moveX/t+"px, "+this.moveY/t+"px)"),e}},watch:{value:function(){this.setActive(this.startPosition)},startPosition:function(t){this.setActive(t)}},methods:{onWrapperTouchStart:function(){this.touchStartTime=new Date},onWrapperTouchEnd:function(t){var e=this;Object(r.c)(t);var i=new Date-this.touchStartTime,n=this.$refs.swipe||{},a=n.offsetX,o=void 0===a?0:a,s=n.offsetY;i<300&&o<10&&(void 0===s?0:s)<10&&(this.doubleClickTimer?(clearTimeout(this.doubleClickTimer),this.doubleClickTimer=null,this.toggleScale()):this.doubleClickTimer=setTimeout(function(){var t=e.active;e.$emit("close",{index:t,url:e.images[t]}),e.asyncClose||e.$emit("input",!1),e.doubleClickTimer=null},300))},startMove:function(t){var e=t.currentTarget.getBoundingClientRect(),i=window.innerWidth,n=window.innerHeight;this.touchStart(t),this.moving=!0,this.startMoveX=this.moveX,this.startMoveY=this.moveY,this.maxMoveX=Math.max(0,(e.width-i)/2),this.maxMoveY=Math.max(0,(e.height-n)/2)},startZoom:function(t){this.moving=!1,this.zooming=!0,this.startScale=this.scale,this.startDistance=w(t.touches)},onImageTouchStart:function(t){var e=t.touches,i=(this.$refs.swipe||{}).offsetX,n=void 0===i?0:i;1===e.length&&1!==this.scale?this.startMove(t):2!==e.length||n||this.startZoom(t)},onImageTouchMove:function(t){var e=t.touches;if((this.moving||this.zooming)&&Object(r.c)(t,!0),this.moving){this.touchMove(t);var i=this.deltaX+this.startMoveX,n=this.deltaY+this.startMoveY;this.moveX=Object(s.a)(i,-this.maxMoveX,this.maxMoveX),this.moveY=Object(s.a)(n,-this.maxMoveY,this.maxMoveY)}if(this.zooming&&2===e.length){var a=w(e),o=this.startScale*a/this.startDistance;this.scale=Object(s.a)(o,this.minZoom,this.maxZoom)}},onImageTouchEnd:function(t){if(this.moving||this.zooming){var e=!0;this.moving&&this.startMoveX===this.moveX&&this.startMoveY===this.moveY&&(e=!1),t.touches.length||(this.moving=!1,this.zooming=!1,this.startMoveX=0,this.startMoveY=0,this.startScale=1,this.scale<1&&this.resetScale()),e&&Object(r.c)(t,!0)}},setActive:function(t){this.resetScale(),t!==this.active&&(this.active=t,this.$emit("change",t))},resetScale:function(){this.scale=1,this.moveX=0,this.moveY=0},toggleScale:function(){var t=this.scale>1?1:2;this.scale=t,this.moveX=0,this.moveY=0},genIndex:function(){var t=this.$createElement;if(this.showIndex)return t("div",{class:g("index")},[this.slots("index")||this.active+1+"/"+this.images.length])},genImages:function(){var t=this,e=this.$createElement,i={loading:function(){return e(d.a,{attrs:{type:"spinner"}})}};return e(f.a,{ref:"swipe",attrs:{loop:this.loop,duration:this.swipeDuration,indicatorColor:"white",initialSwipe:this.startPosition,showIndicators:this.showIndicators},on:{change:this.setActive}},[this.images.map(function(n,a){return e(m.a,[e(h.a,{attrs:{src:n,fit:"contain",lazyLoad:t.lazyLoad},class:g("image"),scopedSlots:i,style:a===t.active?t.imageStyle:null,nativeOn:{touchstart:t.onImageTouchStart,touchmove:t.onImageTouchMove,touchend:t.onImageTouchEnd,touchcancel:t.onImageTouchEnd}})])})])}},render:function(){var t=arguments[0];if(this.value)return t("transition",{attrs:{name:"van-fade"}},[t("div",{class:[g(),this.className],on:{touchstart:this.onWrapperTouchStart,touchMove:r.c,touchend:this.onWrapperTouchEnd,touchcancel:this.onWrapperTouchEnd}},[this.genImages(),this.genIndex()])])}}),x={images:[],loop:!0,swipeDuration:500,value:!0,minZoom:1/3,maxZoom:3,className:"",onClose:null,onChange:null,lazyLoad:!1,showIndex:!0,asyncClose:!1,startPosition:0,showIndicators:!1,closeOnPopstate:!1},S=function(t,e){if(void 0===e&&(e=0),!o.f){y||(y=new(a.default.extend(b))({el:document.createElement("div")}),document.body.appendChild(y.$el),y.$on("change",function(t){y.onChange&&y.onChange(t)}));var i=Array.isArray(t)?{images:t,startPosition:e}:t;return Object(n.a)(y,x,i),y.$once("input",function(t){y.value=t}),i.onClose&&y.$once("close",i.onClose),y}};S.install=function(){a.default.use(b)};e.a=S},"X+8o":function(t,e,i){"use strict";var n=i("nsZj"),a=(i.n(n),i("5Hoj"));i.n(a)},dvRy:function(t,e){},kKJ6:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("eqfM");var n=i("/QYm"),a=i("bOdI"),o=i.n(a),s=(i("3Lne"),i("SSsa")),r=(i("nsZj"),i("nOtf"),i("hW8u"),i("JsOw"),i("W0KU"),i("CGQl"),i("kXkE"),i("RfZZ")),l=i("o69Z");function c(t){return Array.isArray(t)?t:[t]}function u(t,e){return new Promise(function(i){var n=new FileReader;n.onload=function(t){i(t.target.result)},"dataUrl"===e?n.readAsDataURL(t):"text"===e&&n.readAsText(t)})}var h=/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;function d(t){return!!t.isImage||(t.file&&t.file.type?0===t.file.type.indexOf("image"):t.url?(e=t.url,h.test(e)):!!t.content&&0===t.content.indexOf("data:image"));var e}var f,m=i("+2ln"),v=i("Wtz3"),p=i("OhwO"),g=Object(l.b)("uploader"),w=g[0],y=g[1],b=w({inheritAttrs:!1,model:{prop:"fileList"},props:{disabled:Boolean,uploadText:String,afterRead:Function,beforeRead:Function,beforeDelete:Function,previewSize:[Number,String],name:{type:[Number,String],default:""},accept:{type:String,default:"image/*"},fileList:{type:Array,default:function(){return[]}},maxSize:{type:Number,default:Number.MAX_VALUE},maxCount:{type:Number,default:Number.MAX_VALUE},previewImage:{type:Boolean,default:!0},previewFullImage:{type:Boolean,default:!0},imageFit:{type:String,default:"cover"},resultType:{type:String,default:"dataUrl"}},computed:{detail:function(){return{name:this.name}},previewSizeWithUnit:function(){return Object(l.a)(this.previewSize)}},methods:{onChange:function(t){var e=this,i=t.target.files;if(!this.disabled&&i.length){if(i=1===i.length?i[0]:[].slice.call(i),this.beforeRead){var n=this.beforeRead(i,this.detail);if(!n)return void this.resetInput();if(n.then)return void n.then(function(){e.readFile(i)}).catch(this.resetInput)}this.readFile(i)}},readFile:function(t){var e=this,i=function(t,e){return c(t).some(function(t){return t.size>e})}(t,this.maxSize);if(Array.isArray(t)){var n=this.maxCount-this.fileList.length;t.length>n&&(t=t.slice(0,n)),Promise.all(t.map(function(t){return u(t,e.resultType)})).then(function(n){var a=t.map(function(t,e){return{file:t,content:n[e]}});e.onAfterRead(a,i)})}else u(t,this.resultType).then(function(n){e.onAfterRead({file:t,content:n},i)})},onAfterRead:function(t,e){e?this.$emit("oversize",t,this.detail):(this.resetInput(),this.$emit("input",[].concat(this.fileList,c(t))),this.afterRead&&this.afterRead(t,this.detail))},onDelete:function(t,e){var i=this;if(this.beforeDelete){var n=this.beforeDelete(t,this.detail);if(!n)return;if(n.then)return void n.then(function(){i.deleteFile(t,e)}).catch(l.g)}this.deleteFile(t,e)},deleteFile:function(t,e){var i=this.fileList.slice(0);i.splice(e,1),this.$emit("input",i),this.$emit("delete",t)},resetInput:function(){this.$refs.input&&(this.$refs.input.value="")},onPreviewImage:function(t){var e=this;if(this.previewFullImage){var i=this.fileList.filter(function(t){return d(t)}).map(function(t){return t.content||t.url});Object(p.a)({images:i,closeOnPopstate:!0,startPosition:i.indexOf(t.content||t.url),onClose:function(){e.$emit("close-preview")}})}},onClickPreview:function(t){this.$emit("click-preview",t,this.detail)},renderPreviewItem:function(t,e){var i=this,n=this.$createElement,a=n(m.a,{attrs:{name:"delete"},class:y("preview-delete"),on:{click:function(n){n.stopPropagation(),i.onDelete(t,e)}}}),o=d(t)?n(v.a,{attrs:{fit:this.imageFit,src:t.content||t.url,width:this.previewSize,height:this.previewSize},class:y("preview-image"),on:{click:function(){i.onPreviewImage(t)}}}):n("div",{class:y("file"),style:{width:this.previewSizeWithUnit,height:this.previewSizeWithUnit}},[n(m.a,{class:y("file-icon"),attrs:{name:"description"}}),n("div",{class:[y("file-name"),"van-ellipsis"]},[t.file?t.file.name:t.url])]);return n("div",{class:y("preview"),on:{click:function(){i.onClickPreview(t)}}},[o,a])},renderPreviewList:function(){if(this.previewImage)return this.fileList.map(this.renderPreviewItem)},renderUpload:function(){var t=this.$createElement;if(!(this.fileList.length>=this.maxCount)){var e,i=this.slots(),n=t("input",{attrs:Object(r.a)({},this.$attrs,{type:"file",accept:this.accept,disabled:this.disabled}),ref:"input",class:y("input"),on:{change:this.onChange}});if(i)return t("div",{class:y("input-wrapper")},[i,n]);if(this.previewSize){var a=this.previewSizeWithUnit;e={width:a,height:a}}return t("div",{class:y("upload"),style:e},[t(m.a,{attrs:{name:"plus"},class:y("upload-icon")}),this.uploadText&&t("span",{class:y("upload-text")},[this.uploadText]),n])}}},render:function(){var t=arguments[0];return t("div",{class:y()},[t("div",{class:y("wrapper")},[this.renderPreviewList(),this.renderUpload()])])}}),x=(i("X+8o"),i("iTiM")),S=(i("i0mo"),i("Hkar")),C=(i("OWWB"),i("1fWZ")),I=(i("ibaI"),i("Ni69")),O=(i("zP7x"),i("rD0v")),T=(i("3AsM"),i("7ZPY")),_={name:"",mixins:[],components:(f={},o()(f,T.a.name,T.a),o()(f,O.a.name,O.a),o()(f,I.a.name,I.a),o()(f,C.a.name,C.a),o()(f,S.a.name,S.a),o()(f,x.a.name,x.a),o()(f,b.name,b),o()(f,s.a.name,s.a),f),props:{},data:function(){return{listOne:{},isShow:!1,showCenter:"",notedata:"",areaList:{},fileList:[]}},computed:{},watch:{$route:function(t,e){console.log(t)}},beforeRouteLeave:function(t,e,i){console.log(e),i()},beforeRouteEnter:function(t,e,i){console.log(e),i()},beforeCreate:function(){console.log("给个loading界面 created撤销loading"),n.a.loading({mask:!1,message:"加载中..."})},created:function(){var t=this;console.log("页面初始化数据加载一般写这里"),this.$http.get("mzyl/user_api/get_order.html",{params:{uni:this.$route.query.id}}).then(function(e){t.listOne=e.data.data,console.log(e)}),this.$http.get("mzyl/public_api/get_refund_reason.html",{}).then(function(e){var i=e.data.data,n={};for(var a in i)n[a]=i[a];t.showCenter=i[0],t.areaList={province_list:n}}),n.a.clear()},mounted:function(){},updated:function(){console.log("页面刷新了")},beforeDestory:function(){console.log("你确认删除XX吗？")},destroyed:function(){console.log("页面跳转了,当前组件已被删除，清空相关内容")},methods:{handleClick:function(t){console.log(t)},handleConfirm:function(t){console.log(t),this.showCenter=t[0].name,this.isShow=!1},handleCancel:function(){this.isShow=!1},handleRefund:function(){var t=this.fileList,e=[];this.notedata,this.listOne.order_id,this.showCenter;t.forEach(function(t){console.log(t),e.push(t.content)}),this.$router.push({path:"/returnsList"})},handleTui:function(t){this.isShow=!t}}},z={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div_all cargoTui"},[t._l(t.listOne.cartInfo,function(t,e){return i("van-card",{key:e,attrs:{num:t.cart_num,price:t.productInfo.attrInfo?t.productInfo.attrInfo.price:t.productInfo.price,title:t.productInfo.store_name,thumb:t.productInfo.image}})}),t._v(" "),i("van-cell-group",[i("van-cell",{attrs:{title:"退货件数",value:t.listOne.total_num}}),t._v(" "),i("van-cell",{attrs:{title:"退货金额",value:"￥"+t.listOne.pay_price}}),t._v(" "),i("van-cell",{attrs:{title:"退货原因",value:t.showCenter,"is-link":""},on:{click:function(e){return t.handleTui(t.isShow)}}}),t._v(" "),i("van-cell",[i("template",{slot:"title"},[i("div",{staticClass:"dis flex_x_between"},[i("div",[t._v("备注说明")]),t._v(" "),i("div",[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.notedata,expression:"notedata"}],staticClass:"c_input",attrs:{maxlength:"100",placeholder:"填写备注信息,(100字以内)"},domProps:{value:t.notedata},on:{input:function(e){e.target.composing||(t.notedata=e.target.value)}}})])])])],2),t._v(" "),i("van-cell",{attrs:{title:"上传凭证",value:"(最多可上次3张)"}}),t._v(" "),i("div",{staticClass:"c_up"},[i("van-uploader",{attrs:{multiple:"","max-count":3},model:{value:t.fileList,callback:function(e){t.fileList=e},expression:"fileList"}})],1)],1),t._v(" "),i("van-button",{attrs:{type:"primary",size:"large",color:"#E93323"},on:{click:t.handleRefund}},[t._v("申请退款")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"c_bottom"},[i("van-area",{staticStyle:{width:"100%"},attrs:{"area-list":t.areaList,"columns-num":"1"},on:{confirm:t.handleConfirm,cancel:t.handleCancel}})],1)],2)},staticRenderFns:[]};var M=i("VU/8")(_,z,!1,function(t){i("dvRy")},null,null);e.default=M.exports},kXkE:function(t,e){}});
//# sourceMappingURL=12.7d0a8c6803be8494668d.js.map