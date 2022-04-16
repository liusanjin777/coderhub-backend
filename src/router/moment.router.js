const Router = require('koa-router');
const { create, detail, list, update } = require('../controller/moment.controller');
const { 
  verifyAuth,
  verifyPermission
} = require('../middware/auth.midware');
/* *********************************************************** */
const momentRouter = new Router({prefix: '/moment'});
momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
module.exports = momentRouter;