let jwt = require('jsonwebtoken');
let common = require('../controler/common');
let data = require('../controler/data/data');
query = require('../controler/mysql');


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

        // 将数据插入数据库中
        let insertData = await data.register([params.name, params.email, params.pwd, 1]);
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

    // 登录验证
    async login(req, res){
        let password = req.body.password,
        email = req.body.email;
        // console.log(email)
        if(!email || !common.isEmail(email)){
            res.json({
                status: 501,
                message: "邮箱格式不正确"
            })
            return false;
        }

        if(!password){
            res.json({
                status: 504,
                message: "请输入密码"
            })
            return false;
        }

        // 验证邮箱和密码（用户）
        let isUser = await data.login([email, password]);
        if(isUser){
            // 获取token
            // sign(加密数据{}, 加密密钥, token存储时间{}) 加密用户名
            let token = jwt.sign({
                email: email,
            }, 'jwt', {
                expiresIn: 60*60*1    //存储时间ms
            })

            res.json({
                status: 200,
                data: {
                    token,
                    info: {
                        email: isUser.email,
                        userid: isUser.id,
                        status: isUser.status
                    }
                },
                message: "欢迎你：" + isUser.email
            })
        }else{
            res.json({
                status: 511,
                message: "用户名或密码不正确"
            })
            return false;
        }
    },

    verifyLogin(req, res){
        let token = req.body.token;
        // console.log(token)
        // 验证token
        jwt.verify(token, 'jwt', function(err, result){
            // console.log(err)  //有错误TokenExpiredError: jwt expired 登录失效

            if(err){
                res.json({
                    status: 512,
                    message: "登录失效"
                })
            }else{
                res.json({
                    status: 200,
                    message: "o98k"
                })
            }
        })
    },

    // 退出登录
    async signOut(req, res){
        // 在数据库判断邮箱是否存在
        // 返回状态
        // token
        let email = req.body.email;

        let isRegister = await data.isRegister(email);
        if(!isRegister){
            res.json({
                status: 200,
                message: "ok"
            })
        }else{
            res.json({
                status: 513,
                message: "用户未登录"
            })
        }
    }
};