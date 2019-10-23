let signUpButton = document.getElementById('signUp')
let signInButton = document.getElementById('signIn')
let container = document.getElementById('dowebok')

signUpButton.addEventListener('click', function () {
    container.classList.add('right-panel-active')
})

signInButton.addEventListener('click', function () {
    container.classList.remove('right-panel-active')
})

// 按钮的点击事件
$(function () {
    $('.form-signUp').validate({
        rules: {
            name: {
                required: true,
            },
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
    
    $('.form-signIn').validate({
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

    // 注册
    $(".signUp").click(function (e) {
         // 取消button、a的默认事件
         e.preventDefault();
        // 禁止重复点击立即提交
        /* if ($(this).hasClass('disabled')) return false;
        $(this).addClass('disabled'); */

        if ($(".form-signUp").valid()) {
            let name = $("[name=name]").val();
            let email = $("[name=email]").val();
            let pwd = $("[name=password]").val();
            // console.log(email)
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
                        name,
                        email,
                        pwd
                    },
                    dataType: "json",
                    success(res) {
                        if (res.status == 200) {
                            $.tooltip({
                                type: "success",
                                content: "注册成功, 将在2s后跳转到登录界面",
                                interval: 2000,
                                success() {
                                    window.location.href = "welcome.html"
                                }
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
                $.tooltip({
                    type: "error",
                    content: "服务器维修中..."
                })
            }
        }
    })

    // 判断登录
    let token = window.localStorage.getItem("token");

    if (token) window.location.href = "usercenter.html";

    // 点击登录按钮操作
    $('.signIn').click(function (e) {
         // 取消button、a的默认事件
         e.preventDefault();
        if ($('.form-signIn').valid()) {
            // 禁止重复提交
            // ...
            let email = $("[name=email]").val();
            let password = $("[name=password]").val();
            // console.log(email)
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
                    // console.log(res)
                    if (res.status == 200) {
                        // localStorage 只能存储字符串
                        window.localStorage.setItem('token', res.data.token);
                        window.localStorage.setItem('info', JSON.stringify(res.data.info));
                        // console.log(res.message.substr(4))
                        $.tooltip({
                            type: "success",
                            content: "登陆成功，将在2s后跳转到用户中心",
                            interval: 2000,
                            success() {
                                window.location.href = "usercenter.html?name="+res.message.substr(4);
                            }
                        })
                    } else {
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


