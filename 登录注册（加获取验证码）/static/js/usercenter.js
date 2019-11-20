
$(function () {

    let token = window.localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return false;
    }

    $.ajax({
        url: api + "verifylogin",
        type: "post",
        data: {
            token
        },
        dataType: "json",
        success(res) {
            if (res.status == 512) {
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("info");
                window.location.href = "login.html";
            } else if (res.status != 200) {
                $.tooltip({
                    type: 'error',
                    content: res.message
                })
            }
        }
    })

    // 退出登录
    $('.signOut').click(function () {
        let info = window.localStorage.getItem("info");
        info = JSON.parse(info)
        $.ajax({
            url: api + "signout",
            type: "post",
            data: {
                email: info.email
            },
            dataType: "json",
            success(res) {
                if (res.status == 200) {
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("info");
                    window.location.href = "login.html";
                }else{
                    $.tooltip({
                        type: "error",
                        content: res.message
                    })
                }
            }
        })
    })
})