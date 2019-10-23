
module.exports = {
    // 验证邮箱
    isEmail (email) {
        if(!email) return false;
        let emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        return emailReg.test(email);
    },

    isPwd(pwd){
        if(!pwd) return false;
        // 密码至少包含 数字和英文，长度6-18
        let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        return pwdReg.test(pwd)
    }
}