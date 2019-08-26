//底部、侧边、头部等公共部分的逻辑
//document.getElementById  只能获取一个，数据类型 对象{}
//document.getElemenetsByName  获取多个， 数组[]
//document.getElementsByTagName
//document.getElementsByClassName

//document.querySelector()  获取一个 第一个， 对象{}
//document.querySelectorAll() 获取多个  数组[]

// 会员中心等的div显示与隐藏
var saideLists = document.querySelectorAll(".slide-bar");
// console.log(saideLists)

for(var i =0; i< saideLists.length;i++) {
	saideLists[i].onmouseenter = function(){

		var bar = this.children[1];
		// console.log(this.children[1]);
		if(!bar){
			return;
		}
		var right = 45;
		var timer = setInterval(function(){
			right = right-1;
			
			if(right<35) {
				// clearInterval(定时器名字)
				clearInterval(timer);
			}else{
				bar.style.right = right + 'px';
			}
		},50)
		
	}
}

// 返回顶部
var retop = document.querySelector(".return-top");

retop.onclick = function(){
	
	// 打印滚动条距离top的距离
	// console.log(document.documentElement.scrollTop);
	// 滚动距离
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
	
	// setInterval(function(){},10)
	// 每隔10毫秒执行函数体一次，不间断一直执行，除非是手动关闭
	
	var retoptime = setInterval(function(){
		// 在函数中定义的变量 只在函数中生效
		
		scrollTop = scrollTop -50;
		// console.log(scroll)
		
		document.body.scrollTop = scrollTop;
		document.documentElement.scrollTop = scrollTop;
		
		if(scrollTop <= 0){
			clearInterval(retoptime);
		} 
	},1) 
	
	
	// 兼容IE、火狐等浏览器
	document.documentElement.scrollTop = 0;
	// 兼容Chrome浏览器
	document.body.scrollTop = 0;
}


// 点击事件：购物、客服滑块的移动
var buyServer = document.querySelectorAll(".buy-server");

var asideSlide = document.querySelector(".aside-slide");

for(var i = 0;i< buyServer.length;i++){
	
	 
	buyServer[i].onclick = function(){
		
		// currentStyle获取css样式属性值 --> IE Opera
		// getComputedStyle()
		// console.log(asideSlide.currentStyle.right);
		 
		 // 获取弹出框的right值
		 var right = '';
		 
		 if(asideSlide.currentStyle){
			 right = asideSlide.currentStyle.right;
		 }else{
			 right = getComputedStyle(asideSlide,false).right;
		 }
		 
		 var right = parseInt(right);
		 // console.log(right);
		 var speed = 0;
		 // classList 获取元素的类型  数据类型为对象
		 
		 className = this.className;
		 // console.log(className.indexOf("on"));
		 
		 // right > -264表示出来或者处于出来的状态
		 // 判断right值和类名 若on存在就删除，没有就添加
		 if(right > -294 && className.indexOf("on") >= 0){
			 // 收回 right值：35 --> 264 删除on
			speed = -12;
			this.classList.remove("on");
		 }else{
			 // 弹出 -264 --> 35  添加on
			 speed = 12;
			 this.classList.add("on");
			 
			 // 显示的内容为购物车还是客服中心
			 // 判断是否有购物车的专属类名,有表示显示购物车,没有显示客服
			 var cart = document.querySelector(".gouwuche");
			 var server = document.querySelector(".buyingserver");
			 // console.log(className)
			 if(className.indexOf("slide-cart") >= 0){
				 // 显示购物车
				 this.nextElementSibling.classList.remove("on");
				 cart.style.display = "block";
				 server.style.display = "none";
			 }else{
				 // 显示客服
				 this.previousElementSibling.classList.remove("on");
				 cart.style.display = "none";
				 server.style.display = "block";
			 }
		 }
		 
		 // 运动 定义面板的弹出和收回
		var buyServerTime = setInterval(function(){
			right += speed;
			// 判断right的值，执行弹出和收回动作
			if((right >= 35 && speed > 0 )|| (right <= -294 && speed < 0 )){
				clearInterval(buyServerTime);
			}else{
				asideSlide.style.right = right + 'px';
			}
		},10)
	}
}

// 侧边栏购物车商品的删除
// 获取删除的a标签
var delBtn = document.querySelectorAll('.gwc-delete');

// 获取删除的a标签所在的ul
var LParent = document.querySelector('.gwc-lists');

// // 添加商品
// var addBtn = document.querySelectorAll('.add');
// 
// addBtn.onclick = function() {
// 	var goods = document.querySelector('.f-box');
// 	
// }


// 判断删除的a
for(var i = 0;i < delBtn.length; i++) {
	delBtn[i].onclick = function() {
		// 获取要删除的li
		var delLi = document.querySelector('.gwc-list')
		
		LParent.removeChild(delLi);
	}
}

