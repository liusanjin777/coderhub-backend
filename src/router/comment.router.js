const Router = require('koa-router');
const { create } = require('../controller/comment.controller');
const { verifyAuth } = require('../middware/auth.midware');

const commentRouter = new Router({prefix: '/comment'});
commentRouter.post('/', verifyAuth, create)

module.exports = commentRouter;