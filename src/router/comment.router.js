const Router = require('koa-router');
const { create, reply } = require('../controller/comment.controller');
const { verifyAuth } = require('../middware/auth.midware');

const commentRouter = new Router({prefix: '/comment'});
commentRouter.post('/', verifyAuth, create);
commentRouter.post('/:commentId/reply', verifyAuth, reply);

module.exports = commentRouter;