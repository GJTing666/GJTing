// 步骤一
$(document).ready(function() {
	// name=tel的聚焦事件

	$('[name=tel]').focus(function() {
		$('.rePwd-code-num').css('border-color', '#ff2d52')

		$('.rePwd-tips').html('请输入手机号')
	})
	$('[name=tel]').blur(function() {
		$('.rePwd-code-num').css('border-color', '#ccc')
		// 获取输入框的值
		var value = $('[name=tel]').val();
		// 手机号正则表达式
		var re = /^1[3456789]\d{9}$/;
		var result = re.test(value)
		if (!result) {
			$('.rePwd-tips').html('请输入正确的手机号!')
		}else {
			// 判断验证码
			$('[name=yzm]').blur(function() {
				if ($('[name=yzm]').val() == '123456') {
					// 找回密码-->步骤切换
					var rePwdBtn = $('.rePwd-button1')
					rePwdBtn.click(function() {
						// 添加类名
						$('.rePwd-steps1').addClass('on');
						$('.rePwd-form1').addClass('active').siblings().removeClass('active')
					})
				} else {
					alert('验证码错误，请重新输入！')
				}
			})
		}
	})
})

// 步骤二
$(document).ready(function() {
	// name=tel的聚焦事件
	$('[name=newPwd]').focus(function() {
		$('.rw').css('border-color', '#ff2d52');
		$('.pwd-one').html('请输入登录密码');
	})
	$('[name=newPwd]').blur(function() {
		$('.rw').css('border-color', '#ccc')
// 		// 获取输入框的值
		var value = $('[name=newPwd]').val();
		// console.log(value)
		var rew = new RegExp("^[A-Za-z]\\w{5,17}");
		var result = rew.test(value)
		// console.log(result)
		if (!result) {
			$('.pwd-one').html('要求: 以字母开头、只能包含字母、数字和下划线，6-18个字符!')
		}else {
			// 确认密码
			$('[name=password]').focus(function() {
				$('.ew').css('border-color', '#ff2d52')
				$('.pwd-two').html('请再次输入登录密码')
			})
			$('[name=password]').blur(function() {
				$('.ew').css('border-color', '#ccc')
				var valPwd = $('[name=password]').val();
				if (valPwd == value) {
					var rePwd = $('.rePwd-button2')
					rePwd.click(function() {
						// 添加类名
						$('.rePwd-steps2').addClass('on');
						$('.rePwd-form2').addClass('active').siblings().removeClass('active')
					})
					skip()
				} 
				else {
					alert('两次输入的内容不一致')
				}
			})
		}
	})
})

// 步骤三
var t = 6;
function skip() {
	t--;
	$('.count-down-skip em').html(t);
	if(t == 1) {
		window.location.href = "login.html";
		// document.location.href = 'login.html'
		 // $(location).attr('href', 'login.html');
	}
	window.setTimeout('skip()', 1000 )
}


