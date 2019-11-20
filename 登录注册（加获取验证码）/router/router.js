let news = require('./news');
let login = require('./login');
let register = require('./register');
// console.log('111'+register)
let option = Object.assign({}, news, login, register);
module.exports = option;