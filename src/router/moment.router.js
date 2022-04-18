const Router = require('koa-router');
const { 
  create, 
  detail, 
  list, 
  update, 
  remove, 
  addLabel 
} = require('../controller/moment.controller');
const { 
  verifyAuth,
  verifyPermission
} = require('../middware/auth.midware');
const { verifyLabelExists } = require('../middware/label.midware');
/* *********************************************************** */
const momentRouter = new Router({prefix: '/moment'});
momentRouter.post('/', verifyAuth, create);
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabel);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);
module.exports = momentRouter;