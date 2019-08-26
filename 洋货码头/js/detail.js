var send = $('.send');

send.click(function() {
	var value = $('[name=content]').val();
	if (value) {
		if (confirm('交否')) {
			var html =
				`<div class="evaluate-content">
								<div class="evaluate-touxiang">
									<img src="img/touxiang.png">
									<p>h*****o</p>
								</div>
								<div class="evaluate-cont-text">
									<div class="evaluate-cont-time">
										好评 | 2016-11-29 16:10:45
									</div>
									<div class="evaluate-cont-txt text-ellipsis-o">
										${value}
									</div>
									<!-- 晒图 -->
									<div class="evaluate-shaitu">
										<img src="img/g.png">
										<img src="img/g.png">
										<img src="img/g.png">
										<img src="img/g.png">
										<img src="img/g.png">
									</div>
									<div class="evaluate-reply text-ellipsis-o">
										客服回复：感谢您对西安港及Ulife的肯定和信任，我们会继续做好服务工作，西安港全体工作人员期待您的下次惠顾！
									</div>
								</div>
							</div>`;
			$('.evaluate-lists').prepend(html);
			$('[name=content]').val('');
		}
	}
});


// 放大镜
(function($) {
	$.fn.jqzoom = function(options) {
		var _this = this;

		// 找到被放大的图片
		var smallImg = $(_this).find('.small-img');

		// 获取被放大的图片的宽高
		var smallWidth = smallImg.width();
		var smallHeight = smallImg.height();

		// 存弹出选择范围的宽高
		var popwidth = 0,
			popheight = 0

		var bigWidth = 0,
			bigHeight = 0

		// 鼠标移入事件
		$(_this).mouseenter(function() {

			// 获取右边放大的图片地址-->将放大的图片放进来
			var smallSrc = smallImg.attr('src');

			var bigHtml =
				`<div style="width: ${options.offwidth}px;height: ${options.offheight}px;" class="zoom-big">
								<img src="${smallSrc}" >
							</div>`
			// 添加放大镜框
			$(_this).append('<div class="zoom-pop"></div>');
			// 放大的图片位置添加
			$(_this).append(bigHtml);

			// 获取放大的图片的宽高
			var bigImg = $(_this).find('.zoom-big img');
			
			bigWidth = bigImg.width();
			bigHeight = bigImg.height();

			// 计算放大镜框的宽高
			var popx = smallWidth / bigWidth * options.offwidth
			var popy = smallHeight / bigHeight * options.offheight
			
			popwidth = popx;
			popheight = popy;

			$(_this).find('.zoom-pop').css({
				width: popx,
				height: popy
			})

		})

		$(_this).mouseleave(function() {
			$(_this).find('.zoom-pop').remove();
			$(_this).find('.zoom-big').remove();
		})

		// 鼠标移动是设置镜框的移动范围
		$(_this).mousemove(function(e) {
			// 鼠标距离页面位置
			var pagex = e.pageX;
			var pagey = e.pageY;

			// 当前图片(被放大图片)距离界面位置
			var offsetx = $(_this).offset().left;
			var offsety = $(_this).offset().top;

			// 计算弹出的left top
			var popx = pagex - offsetx - popwidth / 2
			var popy = pagey - offsety - popheight / 2

			popx = popx < 0 ? 0 : popx
			popy = popy < 0 ? 0 : popy

			popx = popx > (smallWidth - popwidth) ? (smallWidth - popwidth) : popx
			popy = popy > (smallHeight - popheight) ? (smallHeight - popheight) : popy

			$('.zoom-pop').css({
				left: popx,
				top: popy
			})
			// 放大效果
			$(_this).find('.zoom-big img').css({
				// 比例放大 -popx(-popy)*（被放大的图片宽(高)/放大的图片宽(高)）
				// 即是 -popx(-popy)*放大的图片宽(高)/被放大的图片宽(高)
				left: -popx * bigWidth / smallWidth,
				top: -popy * bigHeight / smallHeight
			})

		})
	}
})(jQuery)

$('.jqzoom').jqzoom({
	offwidth: 280,
	offheight: 280
})


// 图片切换
// $(selector).attr(attribute,value)
$('.detail-slide-img img').click(function() {
	
	$('.jqzoom img').attr('src', $(this).attr('src'))
})


// 点击按钮切换

$(document).ready(function() {
	var imglength = $(".detail-slide-box .detail-slide-img .ddd").outerHeight()
	// console.log(imglength)

	//向左按钮点击事件
	var index = 0;
	var liLen;
	
	liLen = $(".detail-slide-box .detail-slide-img img").length; //目前长度返回值为6
	var we = liLen*imglength
	console.log(we)
	
	$(".leftBtn").click(function() {
		index++;
		
		if (index >= 5) {
			$(".detail-slide-box").stop();
			alert("已经到达最后一页！");
			index = 4;
		} else {
			if (index == 1) {
				$(".detail-slide-box").animate({
					left: -index * 68
				}, 700);
			} else {
				$(".detail-slide-box").animate({
					left: -index * 68
				}, 700);
			}
		}
	});
	// //向右按钮点击事件
	// $(".rightBtn").click(function() {
	// 	if (index == 0) {
	// 		$(".detail-slide-box").stop();
	// 		alert("这是第一页，不能再往前翻了！");
	// 	} else {
	// 		index--;
	// 		if (index == 0) {
	// 			$(".detail-slide-box").animate({
	// 				left: -40
	// 			}, 700);
	// 		} else {
	// 			$(".detail-slide-box").animate({
	// 				left: -index * 66
	// 			}, 700);
	// 		}
	// 	}
	// });
});









