const Router = require('koa-router');
const {
  createUser
} = require('../controller/user.controller');
const {
  verifyUser,
  handlePassword
} = require('../middware/user.middware');

const userRuter = new Router({prefix: '/users'});
userRuter.post('/',verifyUser, handlePassword, createUser);
module.exports = userRuter