/* 
 *countDown   倒计时
 * @param future date 表示倒计时结束时间   IS NOT NUll
 * @param history date 表示倒计时开始时间
 * 将时间转换为相差的时分秒字符串返回
 */

function countDown(future, histry) {
	
	if(!histry) {
		//当前时间距离1970年1月1日毫秒数
		histry = new Date().getTime();
	}else {
		histry = new Date(histry).getTime();
	}
	//倒计时结束时间距离1970年的毫秒数
	future = new Date(future).getTime();
	
	//倒计时相差的毫秒数
	var distance = future - histry;
	
	
	if(distance <= 0) {
		return '000000'
	}
	
	//距离毫秒数- 小时毫秒数 =  分钟毫秒数 + 秒的毫秒数
	//1小时  1*60*60*1000
	//向下取整 Math.floor()
	var hours = Math.floor(distance/(60*60*1000));
	
	//1分钟 1*60*1000
	var minutes = Math.floor((distance - hours*60*60*1000)/(60*1000));
	
	var seconds = Math.floor((distance - hours*60*60*1000 - minutes*60*1000)/1000);

	return changeLength(hours) + changeLength(minutes) + changeLength(seconds);
}

/*
 *changeLength   将一位数的时间转换为两位数
 * @param num string|number 表示转换的字符   IS NOT NUll
 */
function changeLength(num) {
	//判断长度
	num = String(num);
	if(num.length <=1) {
		num = '0' + num;
	}
	return num;
}

/* 
 * changeTab  模拟tab切换   切换事件mouseenter
 * @param parentClass  string  父类别名
 * 
 * */

// js方法

// function changeTab(parentClass) {
// 	var parent = document.querySelector(parentClass);
// 	
// 	var tabTitle = parent.querySelectorAll('.tab-title');
// 	
// 	var tabLists = parent.querySelectorAll('.tab-lists');
// 	
// 	for(var i = 0;i< tabTitle.length; i++) {
// 		tabTitle[i].index = i;
// 		tabTitle[i].onmouseenter = function() {
// 			for(var j = 0; j< tabLists.length; j++) {
// 				tabTitle[j].classList.remove('active');
// 				tabLists[j].classList.remove('active');
// 			}
// 			this.classList.add('active');
// 			tabLists[this.index].classList.add('active');
// 		}
// 	}
// }
// 
// // 调用tab切换
// // 商品推荐
// changeTab('.tab-box');
// // 1F
// changeTab('.tab-boxone');
// // 2F
// changeTab('.tab-boxtwo');
// // 3F
// changeTab('.tab-boxthree');



// jQuery方法

function changeTab(parentClass) {
	$('.tab-title').click(function() {
		// 添加类名
		$(this).addClass('active');
		// 删除类名
		$(this).siblings().removeClass('active');
		
		var index = $(this).index();
		
		// $('.tab-lists').eq(index).addClass('active').siblings().removeClass('active')
		
		// 找到父级类名 tab-box
		var parent = $(this).parents(parentClass)
		// 再找到父级下面的 tab-lists
		var ele = parent.find('.tab-lists');
		// siblings() 找到当前的兄弟标签，不包括自己
		ele.eq(index).addClass('active').siblings().removeClass('active');
	})
}
changeTab('.tab-box');
// 1F
changeTab('.tab-boxone');
// 2F
changeTab('.tab-boxtwo');
// 3F
changeTab('.tab-boxthree');


