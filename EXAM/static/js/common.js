let api = 'http://127.0.0.1:3000/';

// 提示封装 start
;(function($, w) {
	// $即看成对象也看成方法
	// options 对象
	// content 提示内容
	// type 提示类型
	// interval  提示的时间
	$.tooltip = function(options) {
		// 移除定时器
		if(w.timer) {
			clearTimeout(w.timer);
		}
		$('.alert').remove();
		// 1.添加提示语
		var html = $(`<div class="alert alert-${options.type}">${options.content}</div>`)
		$('body').append(html);
		// w.timer = window.timer
		w.timer = setTimeout(function() {
			html.remove();
			if(options.success) {
				options.success();
			}
		}, options.interval || 5000)
	}

	// md5 加密封装
	$.md5 = function(pwd){
		return hex_md5(pwd)
	}
})(jQuery, window)
// 提示封装 end




