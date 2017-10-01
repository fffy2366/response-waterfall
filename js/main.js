
// JavaScript Document
(function ($) {



	var wait = 5;

	function timeOut() {
		if (wait == 0) {
			$('.pop-bg').fadeOut(100);
			window.location.href = "login.html";
		} else {
			setTimeout(function () {
				wait--;
				$('.timespan').text(wait);
				timeOut();
			}, 1000)
		}
	}

	/*$(".forgetBtn").click(function(){
	 $(".pop-bg").show();
	 timeOut();
	 })
	 */


	var num = Math.floor(Math.random() * 3 + 1);
	$(".loginBg").css('background-image', 'url(img/login-bg' + num + '.jpg)');
	$(".wraploginBg").css('background-image', 'url(img/wrap' + num + '.jpg)');

	setInterval(
		function () {
			var num2 = Math.floor(Math.random() * 3 + 1);
			//$('.loginBg').html('<img src="img/login-bg"+num+".jpg"');
			//$('.loginBg img').attr('src','img/login-bg'+num+'.jpg');
			$(".loginBg").css('background-image', 'url(img/login-bg' + num2 + '.jpg)');
			$(".wraploginBg").css('background-image', 'url(img/wrap' + num2 + '.jpg)');
		}, 3000) ;
	/**
	 * 退出
	 */
	$("#logout").click(function(){
		$("#logoutForm").submit() ;
	}) ;
	$(".smallImg").click(function(){
		var photo_id = $(this).attr("photo_id") ;
		var bigImg = $(this).attr("bigImg") ;
		var num = $(this).attr("num") ;
		var favorite = $(this).attr("favorite") ;
		$("#bigImg").attr("src",bigImg) ;
		$(".imgPhoto-name").html(num) ;
		var favorite_text = "收藏" ;
		if(favorite==1){
			favorite_text = "已收藏" ;
		}
		$("#myModal").find(".collect").attr("photo_id",photo_id).html("<em class=\"emStar\"></em>"+favorite_text) ;
        $("#myModal").find(".collect").attr("photo_id",photo_id).removeClass("Star-qx") ;

    }) ;
	/* 图片不完全按比例自动缩小 by zwwooooo */
	/*$('.imgBox img').each(function(){
		var x = 358; //填入目标图片宽度
		var y = 240; //填入目标图片高度
		var w=$(this).width(), h=$(this).height();//获取图片宽度、高度
		if (w > x) { //图片宽度大于目标宽度时
			var w_original=w, h_original=h;
			h = h * (x / w); //根据目标宽度按比例算出高度
			w = x; //宽度等于预定宽度
			if (h < y) { //如果按比例缩小后的高度小于预定高度时
				w = w_original * (y / h_original); //按目标高度重新计算宽度
				h = y; //高度等于预定高度
			}
		}
		$(this).attr({width:w,height:h});
	});*/
	//上一个
	$("#img-left").click(function(){
		var bigImg = $("#bigImg").attr("src") ;
		var index = $(".ull-img").find("li[bigImg='"+bigImg+"']").index() ;
		console.log(index-1) ;
		if(index==0){
			//alert("这已经是第一张了") ;
			//return ;
		}
		bigImg = $(".ull-img").find("li").eq(index-1).attr("bigImg") ;
		$("#bigImg").attr("src",bigImg) ;
	}) ;
	//下一个
	$("#img-right").click(function(){
		var size = $(".ull-img").find("li").length ;
		var bigImg = $("#bigImg").attr("src") ;
		var index = $(".ull-img").find("li[bigImg='"+bigImg+"']").index() ;
		console.log(index+1) ;
		if(index==size-1){
			index = -1 ;
		}
		bigImg = $(".ull-img").find("li").eq(index+1).attr("bigImg") ;
		$("#bigImg").attr("src",bigImg) ;
	}) ;
	//我的照片
	//上一个
	$(".img-left").click(function(){
		var bigImg = $("#bigImg").attr("src") ;
		var index = $(".ull-img2").find("li[bigImg='"+bigImg+"']").index() ;
		console.log(index-1) ;
		if(index==0){
			//alert("这已经是第一张了") ;
			//return ;
		}
		bigImg = $(".ull-img2").find("li").eq(index-1).attr("bigImg") ;
		$("#bigImg").attr("src",bigImg) ;
	}) ;
	//下一个
	$(".img-right").click(function(){
		var size = $(".ull-img2").find("li").length ;
		var bigImg = $("#bigImg").attr("src") ;
		var index = $(".ull-img2").find("li[bigImg='"+bigImg+"']").index() ;
		console.log(index+1) ;
		if(index==size-1){
			index = -1 ;
		}
		bigImg = $(".ull-img2").find("li").eq(index+1).attr("bigImg") ;
		$("#bigImg").attr("src",bigImg) ;
	}) ;
	//收藏
	$(".collect").click(function () {
		$this = $(this) ;
        var csrf = $("#csrf").val() ;
		var photo_id = $(this).attr("photo_id") ;
		var  data = {} ;
		data['_csrf'] = csrf ;
		data['photo_id'] = photo_id ;
		$.post("/favorite/collect",data,function (res) {
            var d = JSON.parse(res) ;
            if(d.status=="y"){
                $this.removeClass("Star-qx") ;
                $this.html("<em class=\"emStar\"></em>已收藏") ;
				$(".imgShow").html(d.favoriteInfo.bottom) ;
				$("#top_tips").html(d.favoriteInfo.top) ;

            }else{
				alert(d.info) ;
			}
        }) ;
    }) ;
	//从收藏夹删除
    $(".emDele").click(function () {
        $this = $(this) ;
        var photo_id = $(this).attr("photo_id") ;
        $("#confirmBox_"+photo_id).show() ;
    }) ;
    //从收藏夹删除
    $(".confirmDele").click(function (event) {
        event.stopPropagation();
        $this = $(this) ;
        var csrf = $("#csrf").val() ;
        var photo_id = $(this).attr("photo_id") ;
        var  data = {} ;
        data['_csrf'] = csrf ;
        data['photo_id'] = photo_id ;
        $.post("/favorite/delete",data,function (res) {
            var d = JSON.parse(res) ;
            if(d.status=="y"){
                window.location.reload() ;
            }
        }) ;
    }) ;
    //取消删除收藏
    $(".cancelDel").click(function (event) {
        event.stopPropagation();
        $this = $(this) ;
        var photo_id = $(this).attr("photo_id") ;
        $("#confirmBox_"+photo_id).hide() ;
    }) ;

    //我的照片
	$("#myphoto").click(function () {
		return true ;
    }) ;
})(jQuery) ;

