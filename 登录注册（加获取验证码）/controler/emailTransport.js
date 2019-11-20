
let nodemailer = require('nodemailer');

let nodemailerTransport = require('nodemailer-smtp-transport');

let config = require('../config');

// 配置邮箱的信息
nodemailerTransport = nodemailer.createTransport(nodemailerTransport({
    // 配置信息
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    },
    domains: [
        "qq.com"
    ],
    host: "smtp.qq.com",
    port: 465,
    secure: true
}));

/**
 * @description 发送邮件
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */

let sendEmail = function (recipient, subject, html, callback) {
    nodemailerTransport.sendMail({
        from: config.email.user,
        to: recipient,
        subject,
        html
    }, callback)
}

module.exports = sendEmail;


