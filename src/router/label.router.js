const Router = require('koa-router');
const { create } = require('../controller/label.controller');
const { verifyAuth } = require('../middware/auth.midware');

const labelRouter = new Router({prefix: '/label'});

labelRouter.post('/', verifyAuth, create);

module.exports = labelRouter;