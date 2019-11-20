$(function () {
    $('.form-val').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				rangelength: [6, 18]
			}
		}
	});

    // 判断登录
    let token = window.localStorage.getItem("token");

    if (token) window.location.href = "usercenter.html";

    // 点击登录按钮操作
    $('.btn-submit').click(function () {
        if ($('.form-val').valid()) {
            // 禁止重复提交

            let email = $("[name=email]").val();
            let password = $("[name=password]").val();
            password = $.md5(password);

            $.ajax({
                url: api + "login",
                type: "post",
                data: {
                    email,
                    password
                },
                dataType: "json",
                success(res) {
                    console.log(res)
                    if (res.status == 200) {
                        // localStorage 只能存储字符串
                        window.localStorage.setItem('token', res.data.token);
                        window.localStorage.setItem('info', JSON.stringify(res.data.info));

                        $.tooltip({
                            type: "success",
                            content: "登陆成功，将在2s后跳转到用户中心",
                            interval: 2000,
                            success() {
                                window.location.href = "usercenter.html"
                            }
                        })
                    }else{
                        $.tooltip({
                            type: "error",
                            content: res.message,
                            interval: 3000
                        })
                    }
                }
            })
        }
    })
})