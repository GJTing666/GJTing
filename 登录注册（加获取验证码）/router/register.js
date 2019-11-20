// 注册接口
let url = require('url');

let common = require('../controler/common')

let sendEmail = require('../controler/emailTransport');

let query = require('../controler/mysql');

let data = require('../controler/data/data');

module.exports = {
    // 注册
    async register(req, res){
        let params = req.body;
        // console.log(params)
        // 判断邮箱
        if(!params.email || !common.isEmail(params.email)){
            res.json({
                status: 501,
                message: "邮箱格式不正确"
            })
            return false;
        }
        // 判断验证码是否存在
        if(!params.code){
            res.json({
                status: 503,
                message: "请输入验证码"
            })
            return false;
        }

        // 判断密码是否存在
        if(!params.pwd){
            res.json({
                status: 504,
                message: "请输入密码"
            })
            return false;
        }

        // 判断用户是否注册
        let isRegist = await data.isRegister(params.email);
        if(!isRegist){
            res.json({
                status: 505,
                message: "该用户已注册"
            })
            return false;
        }

        // 判断验证码与数据库中的是否一致
        let isRealCode = await data.isCode(params.email, params.code);
        if(!isRealCode){
            res.json({
                status: 506,
                message: "验证码错误"
            })
            return false;
        }

        // 将数据插入数据库中
        let insertData = await data.register([params.email, params.pwd, 1]);
        if(insertData){
            res.json({
                status: 200,
                message: ""
            })
        }else{
            res.json({
                status: 507,
                message: "服务器错误！！！"
            })
        }
    },

    // 获取验证码
    getCode(req, res) {
        // 获取前端发送过来的邮箱
        // 验证邮箱是否正确
        let email = url.parse(req.url, true).query.email;
        // console.log(email)
        // let eReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;

        if (common.isEmail(email)) {
            // 获取验证码发送到邮箱
            let code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
            let html = `<h1 style='color:red;'>你的邮箱验证码为：${code}</h1>`;
            sendEmail(email, '注册验证码', html, function (error, respnse) {
                if (error) {
                    res.json({
                        status: 510,
                        message: '验证码发送失败'
                    })
                } else {
                    let sql = 'insert into verify(email, code) values (?)';
                    query(sql, [[email, code]]).then(function (result) {
                        res.json({
                            status: 200,
                            // data: code,
                            message: '',
                        })
                    }).catch(function (error) {
                        res.json({
                            status: 502,
                            message: '邮箱格式不正确'
                        })
                    })
                }

            })
        } else {
            res.json({
                status: 501,
                message: '邮箱格式不正确'
            })
        }
    }
}



