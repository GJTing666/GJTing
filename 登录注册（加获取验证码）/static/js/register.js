
// 文档加载完成
$(function () {
	$('.form-val').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			code: {
				required: true
			},
			password: {
				required: true,
				rangelength: [6, 18]
			},
			repassword: {
				equalTo: $("[name=password]")
			}
		}
	})

	// 获取验证码
	// 4.获取cookie 再继续倒计时 获取刷新前的倒计时剩余时间 刷新后继续计时
	var cookia = $.cookie('cookia')
	// console.log(cookia)
	if (cookia) {
		countDown(cookia)
	}

	$("#getCode").click(function () {
		let _this = this;
		let email = $("[name=email]").val();
		// console.log(email)
		let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;

		if (email && reg.test(email)) {
			// 发送请求并获取验证码
			$.ajax({
				url: api + "getCode",
				type: "get",
				data: {
					email: email
				},
				dataType: "json",
				success(res) {
					// console.log(res)
					if (res.status == 200) {
						$.tooltip({
							type: "success",
							content: "验证码发送成功"
						})
					} else {
						$.tooltip({
							type: "error",
							content: res.message
						})
					}
				}
			})
		} else {
			// 提示邮箱不正确
			$.tooltip({
				type: "error",
				content: "请输入正确的邮箱"
			})
		}

		if ($(_this).hasClass('disabled')) {
			return;
		}
		countDown(10);

	})

	// 设置加载获取验证码的方法
	function countDown(count) {
		$('.getcode').addClass('disabled');
		$('#getCode').html(count + 'S后重获');
		// 1.开启倒计时
		var timer = setInterval(function () {
			count--;
			$('#getCode').html(count + 'S后重获');
			// 3.设置cookie
			$.cookie('cookia', count);
			// 2.结束倒计时
			if (count <= 0) {
				clearInterval(timer);
				$('#getCode').removeClass('disabled').html('重新获取');
				// 倒计时结束时清除获取cookie
				$.removeCookie('cookia');
			}
		}, 1000)
	}


	// 注册
	$("#btn-register").click(function () {

		// 禁止重复点击立即提交
		/* if ($(this).hasClass('disabled')) return false;
		$(this).addClass('disabled'); */

		if ($(".form-val").valid()) {

			let email = $("[name=email]").val();
			let code = $("[name=code]").val();
			let pwd = $("[name=password]").val();

			// 密码至少包含 数字和英文，长度6-18
			let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;

			if (pwdReg.test(pwd)) {
				// $.md5() 为加密函数(封装在common.js里面)
				pwd = $.md5(pwd);

				// 发送请求注册
				$.ajax({
					url: api + "register",
					type: "post",
					data: {
						email,
						code,
						pwd
					},
					dataType: "json",
					success(res) {
						if (res.status == 200) {
							$.tooltip({
								type: "success",
								content: "注册成功"
							})
						} else {
							$.tooltip({
								type: "error",
								content: res.message
							})
						}
					}
				})
			}else{
				$.tooltip({
					type: "error",
					content: "密码至少包含 数字和英文，长度6-18"
				})
			}
		}
	})
})


