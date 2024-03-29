// 只要有数据库的操作都在这里

let query = require('../mysql');

module.exports = {
    async isRegister(email) {
        // 查询email
        let data = await query('select * from user where email=?', email);
        //    console.log(data)
        if (data.length > 0) {
            //    false 表示已经注册
            return false;
        } else {
            //    true 表示未注册
            return true;
        }
    },
    // 查询邮箱对应的验证码
    async isCode(email, code) {
        let sql = 'select * from verify where email=? order by createTime desc';
        let data = await query(sql, email);

        if (data.length <= 0) return false

        if (data[0].code == code) {
            return true;
        }
        return false;
    },
    // 插入注册的用户信息
    async register(data) {
        let sql = 'insert into user(email, password, status) values (?)';

        let result = await query(sql, [data]).catch(function (res) {
            console.log('error:' + res)
        });
        if (result) {
            return true;
        } else {
            return false;
        }
    },

    // 验证用户登录信息
    async login(data){
        let sql = 'select * from user where email=? and password=?';
        let result = await query(sql, data)

        if(result.length > 0){
            return result[0];
        }else{
            return false;
        }
    }

}