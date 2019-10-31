//使用JS控制rem作为单位进行计算
//window.onload在html全部加载完了才执行。
window.onload=function(){
    
    //1、首次加载时，调用动态设置rem的api
    setRemSize();
    //2、当用户企图更改浏览器宽度 自动获取屏幕宽度，再计算rem赋值给根元素的font-size
    window.addEventListener('resize',setRemSize,false);//resize--浏览器宽度改变时触发
    /*window.onresize=function(){                                          //onresize浏览器尺寸改变事件
        setRemSize();
    }*/
    function setRemSize(){
        //在任何尺寸中都可以获得rem值
        //获得屏幕的宽度   rem=屏幕宽度/7.5+"px"
        var _clientWidth=document.documentElement.clientWidth/18.75+'px';
        //console.log(_clientWidth);
        //将得到的rem值复制给根元素的font-size
        document.documentElement.style.fontSize=_clientWidth;
    }
    //禁止手机浏览器缩放
    // 阻止双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 阻止双指放大
    document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    });

}
