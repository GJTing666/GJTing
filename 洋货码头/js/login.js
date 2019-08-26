$(document).ready(function() {
	// 登录&&注册面板切换
	$('.login-rightNow').click(function() {
		var parent = $('.play-box');
		if (parent.hasClass('on')) {
			parent.toggleClass('on')
		}
	})
});

// 表单验证
$.extend($.validator, {
	messages: {
		required: "该字段不能为空.", // 字段，必须
		remote: "Please fix this field.", // 远程，发送请求
		email: "请输入正确的邮箱.", // 邮箱字段
		url: "请输入正确的地址.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "两次输入的密码不一致！.",  //等于--> 确认密码
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "请输入6-18位字符." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	}
});

$('.validateform').validate({
	// 验证规则
	rules: {
		email: {
			// 该邮箱必填
			required: true,
			email: true,
		},
		password: {
			required: true,
			rangelength: [6,18]
		},
		repassword: {
			equalTo: $('[name=password]')
		},
		mobile:{
			required: true,
			tel: true
		}
	},
	// 定义错误信息
	messages: {
		email: {
			required: '邮箱不能为空',
		}
	}
})
// $.validator.addMethod(验证名字) 自定义验证
$.validator.addMethod('tel', function(value, element) {
	var length = value.length;
	var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
	return this.optional(element) || (length == 11 && mobile.test(value));
}, '请输入正确的手机号码，且为11位纯数字格式')

// 获取验证码
// 4.获取cookie 再继续倒计时 获取刷新前的倒计时剩余时间 刷新后继续计时
var cookia = $.cookie('cookia')
console.log(cookia)
if(cookia) {
	countDown(cookia)
}

$('.get-code').click(function() {
	var _this = this;
	if($(this).hasClass('disabled'))
		return;
	countDown(10)
})
// 设置加载获取验证码的方法
function countDown(count) {
	$('.get-code').addClass('disabled');
	$('.get-code').html(count + 'S后重获');
	// 1.开启倒计时
	var timer = setInterval(function() {
		count--;
		$('.get-code').html(count + 'S后重获');
		// 3.设置cookie
		$.cookie('cookia', count);
		// 2.结束倒计时
		if(count <= 0) {
			clearInterval(timer);
			$('.get-code').removeClass('disabled').html('重新获取');
			// 倒计时结束时清除获取cookie
			$.removeCookie('cookia');
		}
	}, 1000)
}

