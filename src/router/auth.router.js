const Router = require('koa-router');
const authRouter = new Router();
const {
  login,
  success
} = require('../controller/auth.controller');
const { 
  verifyLogin,
  verifyAuth
} = require('../middware/auth.midware');
authRouter.post('/login',verifyLogin, login);
authRouter.get('/test',verifyAuth, success);
module.exports = authRouter;