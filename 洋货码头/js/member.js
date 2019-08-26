$('.liStyle').click(function() {
		var parent = $(this).parent();
		if(parent.hasClass('on')) {
			parent.removeClass('on');
		}else{
		parent.addClass('on');
		parent.siblings().removeClass('on');
		// 父级的兄弟姐妹
		parent.siblings().find('.order-lists').slideUp();
		}
		// 显示与隐藏的切换
		$(this).next().slideToggle(300);
	})
	


