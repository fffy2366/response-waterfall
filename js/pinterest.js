var pinterest_doing=0;//是否正在排列
var pinterest_current=0;//当前排列到第几个
var pinterest_done=0;//是否全部加载完毕
var pinterest_totalItem=0;//瀑布块总数常量
var pinterest_perBlock=16;//设定每次加载块数

var pinterest_InitCount=0;//统计函数执行了几次


function pinterestInit(obj,add){

	pinterest_InitCount++;
	//console.log(pinterest_InitCount);

	pinterest_doing=1;

	var gapWidth=16;//设定块间距
	var containerPadding=2;//设定外边距
	var columns=5;//设定最大列数

	obj.style.transition="height 1s";
	var totalWidth=obj.offsetWidth;
	if(totalWidth<=720) {
		columns--; 
		if(totalWidth<=552) {
			columns--;
			if(totalWidth<=375) {
				columns--;
                if(totalWidth<=312) {
                    columns--;
                }
			}
		}
	}
	obj.className="pinterestUl";
	addClass(obj, "col"+columns);

	//var singleWidth=totalWidth/columns-gapWidth;
	var singleWidth= ( totalWidth - (columns-1)*gapWidth - containerPadding*2 ) / columns;

	var column=new Array();
	for(i=0;i<columns;i++){//set the columns and each top
		if (!column[i]) column[i]=0;
	}

	function findMaxHeight(){
		var maxHeight=column[0];
		var maxColum=0;
		for(var i=0;i<column.length;i++){
			if(maxHeight<=column[i]){
					maxHeight=column[i];
					maxColum=i;
				}
			}
		return {"maxHeight":maxHeight, "maxColum":maxColum }
	}
	function findMinHeight(){
		var minHeight=column[0];
		var minColum=0;
		for(var i=0;i<column.length;i++){
			if(minHeight>column[i]){
					minHeight=column[i];
					minColum=i;
				}
			}
		return {"minHeight":minHeight, "minColum":minColum }
	}


	pinterest_totalItem=obj.children.length;
	if(add) {
		pinterest_current+=pinterest_perBlock;
	}//判断是否增加数量
	for(var num=0; num<pinterest_totalItem; num++ ){
		if (num>= Math.max(pinterest_current, pinterest_perBlock) ) break;
		obj.children[num].style.display="block";
		
		
		//开始加载图片
		obj.children[num].getElementsByTagName("img")[0].src = obj.children[num].getElementsByTagName("img")[0].getAttribute("data-original");
		obj.children[num].getElementsByTagName("img")[0].onload= pinterestProcess ;

		//开始计算定位
		var atColum=findMinHeight().minColum;
		var atHeight=findMinHeight().minHeight;
		obj.children[num].style.left =  atColum * (singleWidth + gapWidth) + containerPadding + "px";
		obj.children[num].style.top = gapWidth + atHeight + "px" ;
		column[atColum] += obj.children[num].offsetHeight+gapWidth;
		
	}
	pinterest_current = num ;
	//console.log(pinterest_current);
	if(pinterest_current>=pinterest_totalItem){//全部加载完毕
		pinterest_done=1;
		document.getElementById("pinterestDone").style.display="block";
		document.getElementById("pinterestMore").style.display="none";
	}else{
		document.getElementById("pinterestMore").style.display="block";
	}

	obj.style.height= (findMaxHeight().maxHeight+40)+"px";
	
	setTimeout( function(){
		pinterest_doing=0;
	}, 500);

	function pinterestProcess(){//快速执行重新定位
		for(i=0;i<columns;i++){//set the columns and each top
			column[i]=0;
		}
		for(var num=0; num<pinterest_totalItem; num++ ){
			if (num>= pinterest_current) break;
			//开始计算定位
			var atColum=findMinHeight().minColum;
			var atHeight=findMinHeight().minHeight;
			obj.children[num].style.left =  atColum * (singleWidth + gapWidth) + containerPadding + "px";
			obj.children[num].style.top = gapWidth + atHeight + "px" ;
			column[atColum] += obj.children[num].offsetHeight+gapWidth;	
		}
		obj.style.height= (findMaxHeight().maxHeight+40)+"px";

	}


}
var pinterestObj=document.getElementById("pinterestList");



addEvent(window, "resize", function(){
	setTimeout( function(){
		if(pinterest_doing==0) {
			pinterest_doing=1;
			pinterestInit(pinterestObj);
		}
	}, 800);
} );

addEvent(window, "scroll", function(){
	if (document.body.scrollHeight-getViewPortSize().y <= getScrollOffsets().y+2){
		if(!pinterest_done){//如果没有全部加载完毕，显示loading图标
			addClass(pinterestObj ,"pinterestUl_loading");
		}else {
			document.getElementById("pinterestDone").style.display="block";
			document.getElementById("pinterestMore").style.display="none";
		}

		setTimeout( function(){
			if(pinterest_doing==0) {
				pinterest_doing=1;
				pinterestInit(pinterestObj, true );
			}
		}, 500);

	}
});
//addDOMLoadEvent( pinterestInit(pinterestObj) );
addDOMLoadEvent( function(){
	setTimeout( function(){
		pinterestInit(pinterestObj);
		//console.log("2000");
	}, 1000)
});