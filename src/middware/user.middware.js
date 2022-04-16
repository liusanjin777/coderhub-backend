const errorType = require('../constants/error-types');
const service = require('../service/user.service');
const md5Password = require('../utils/password-md5');
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  const resOfGetName = await service.getNameByDataBase(name);
  if(resOfGetName.length !== 0) {
    const error = new Error(errorType.NAME_IS_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx)
  }
  await next();
}
const handlePassword = async (ctx, next) => {
  ctx.request.body.password = md5Password(ctx.request.body.password)
  await next();
}

module.exports = {
  verifyUser,
  handlePassword
}