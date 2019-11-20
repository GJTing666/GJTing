
module.exports = {
    // 验证邮箱
    isEmail (email) {
        if(!email) return false;
        let emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        return emailReg.test(email);
    }
}