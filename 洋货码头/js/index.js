// 首页的逻辑代码

window.onload = function() {
	cursoal()
}

function cursoal() {
	var dotIndex = 0;
	
	var speed = 80;
	
	var bannerCursoal = document.querySelector(".banner-cursoal");
	
	var cursoalImg = document.querySelectorAll(".banner-cursoal img");
	
	// 轮播盒子
	var cursoalSlide = document.querySelector(".cursoal-silide");
	
	// 获取轮播图原点
	var aDot = document.querySelectorAll(".cursoal-dot li");
	
	// 轮播左右按钮
	var aBtn = document.querySelectorAll(".cursoal-btn");
	
	var imgWidth = cursoalImg[0].offsetWidth;
	// console.log(imgWidth)
	
	var imgLength = cursoalImg.length;
	// 1. 计算cursoal-silide 的宽度 --> 图片长度*图片宽度
	cursoalSlide.style.width = imgWidth * imgLength + 'px';
	
	// 2.让图片运动起来
	var index = 1;
	
	// 循环轮播
	// 先把autoInterval定义为全局变量
	var autoInterval = null;
	// 调用autoAnimate()方法
	autoAnimate()
	
	function autoAnimate() {
		autoInterval = setInterval(function() {
			animate(-20, 'left');
		}, 2000)
	}
	
	// 综合左右按钮
	function animate(speed, position) {
		
		changeDot(position)
		
		var timer = setInterval(function() {
	
			var left = cursoalSlide.offsetLeft + speed;
	
			cursoalSlide.style.left = left + 'px';
			// curIndex表示即将移动到的图片下标
			var curIndex = 0;
	
			if (position == 'left') {
				curIndex = index + 1;
			} else {
				curIndex = index - 1;
			}
	
			// （按钮）往左移 || 往右移
			if ((left <= -(curIndex) * imgWidth && speed<0) || (left >= -curIndex * imgWidth && speed>0)) {
	
				clearInterval(timer);
				index = curIndex
				// 4.判断运动到最后一张返回显示第一张
				if (index >= imgLength - 1) {
					index = 1;
					cursoalSlide.style.left = -imgWidth + 'px';
				} else if (index <= 0) {
					index = imgLength - 2;
					cursoalSlide.style.left = -index * imgWidth + 'px';
				}
			}
		}, 20)
	}
	// 点击圆点事件
	function changeDot(position) {
		if(position == 'left') {
			dotIndex ++;
		}else {
			dotIndex --;
		}
		
		if(dotIndex > aDot.length -1 ){
			dotIndex = 0;
		}else if(dotIndex < 0){
			dotIndex = aDot.length-1;
		}
		
		for(var i=0;i< aDot.length;i++){
			aDot[i].classList.remove('on');
		}
		aDot[dotIndex].classList.add('on');
	}
	
	// 5.鼠标光标移入轮播盒子 停止动画 移除开始
	bannerCursoal.onmouseenter = function() {
		clearInterval(autoInterval)
	}
	bannerCursoal.onmouseleave = function() {
		autoAnimate()
	}
	
	// 6.给左右按钮添加点击事件
	for (var i = 0; i < aBtn.length; i++) {
		aBtn[i].onclick = function() {
			// 获取类名 prev next
			var className = this.className
			if (className.indexOf('prev') >= 0) {
				// 点击左边按钮
				animate(20, 'right');
			} else {
				// 点击右边按钮
				animate(-20, 'left');
			}
		}
	}
	
	// 7给圆点添加点击事件
	for(var i = 0; i< aDot.length; i++) {
		aDot[i].dot = i;
		aDot[i].onclick = function() {
			// 判断控制圆点的移动
			if(this.dot < dotIndex) {
				speed = Math.abs(speed);
				// 获取当前圆点的下标 1
				index = this.dot+2;
				
				dotIndex = this.dot + 1;
				// 圆点右移
				animate(speed, 'right')
			}else {
				speed = -Math.abs(speed);
				index = this.dot;
				dotIndex = this.dot - 1;
				// 圆点左移动
				animate(speed, 'left')
			}
			
		}
	}
	
	
	// banner
	var requestUrl = 'http://127.0.0.1:3001/'
	$.ajax({
		// 1. 请求的地址
		url: requestUrl + 'getBanner',
		// 2. 请求的类型
		type: 'get',
		// 3. 是否是同步还是异步
		async: true,
		// 4. 请求返回的数据类型
		dataType: 'json',
		// 5. 请求成功 回调 函数
		success: function(res) {
			if(res.success == true){
				
				var bannerLists = res.list;
				var html = `<img src="${requestUrl + bannerLists[bannerLists.length-1].img}" />`
				for(var i = 0; i < bannerLists.length; i++) {
					html += `<img src="${requestUrl + bannerLists[i].img}" />`
				}
				
				html += `<img src="${requestUrl + bannerLists[0].img}" />`
			}
			$('.cursoal-silide').html(html);
		}
	})
	
	// 推荐商品列表
	for (var j = 0; j < 3; j++) {
		sendAjax(j)
	}
	
	function sendAjax(id) {
		$.ajax({
			url: requestUrl + 'lists?id=' + (id+1),
			type: 'get',
			async: true,
			dataType: 'json',
			success: function(res) {
				if(res.success == true){
					var lists = res.list;
					var html = '';
					for(var i=0; i<lists.length; i++) {
						html += `<li class="recommen-lists fl">
								<img src="${requestUrl + lists[i].img}">
								<div class="text-ellipsis-o recommen-goods-title">
									${lists[i].title}
								</div>
								<div class="recommen-goods-price">
									<span class="text-main font-14 price iconfont icon-renminbi1688">${lists[i].price}</span>
								</div>
								</li>`
					}
				}
				$('.recommen-box').eq(id).html(html)
			}
		})
	}
	
	
	// 当浏览器最小化或者切换不同标签时间执行的时执行的动作 visibilitychange
	// document.addELlementListener 添加监听事件
	document.addEventListener('webkitvisibilitychange', function() {
		var isHidden = document.webkitVisibilityState;
		// console.log(isHidden);
		// 当聚焦不在当前窗口时,停止轮播,即停止定时器
		if (isHidden == 'hidden') {
			clearInterval(autoInterval);
		} else {
			autoAnimate();
		}
	})
	
	// 执行倒计时
	countDownHtml();
	// 设置倒计时的计时器
	var countInterval = setInterval(countDownHtml, 1000);
	// 定义倒计时方法
	function countDownHtml() {
		// 倒计时
		var countDownTime = countDown('2019-8-8 17:30:00');
		if(parseInt(countDownTime) <= 0) {
			clearInterval(countInterval);
		}
		
		// 字符串转为数组split
		var arrTime = countDownTime.split('');
		// 通过模板字符串``设置时间
		var html = `<span>本场还剩</span>
						<span class="time">${arrTime[0]}</span>
						<span class="time">${arrTime[1]}</span>
						<span>:</span>
						<span class="time">${arrTime[2]}</span>
						<span class="time">${arrTime[3]}</span>
						<span>:</span>
						<span class="time">${arrTime[4]}</span>
						<span class="time">${arrTime[5]}</span>`
		
		document.querySelector('.count-down').innerHTML = html;
	}
}

// 懒加载
// $('img').lazyload({
// 	effect: 'fadeIn',
// 	threshold: -450,
// 	// placeholder: '' 加图片路径 为占位图
// })




