const JWT = require('jsonwebtoken');

const errorType = require('../constants/error-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const md5Password = require('../utils/password-md5');
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  const resOfGetName = await userService.getNameByDataBase(name);
  const user = resOfGetName[0]
  if(!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx)
  }
  if(md5Password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user;
  await next()
}
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.header.authorization;
  if (!authorization) {
    console.log(1);
    const err = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx)
  }
  
  try {
    const token = authorization.replace('Bearer ', '');
    const res =  JWT.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = res
    await next();
  } catch (error) {
    console.log(2);
    const err = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit('error',err, ctx)
  }
}
const verifyPermission = async (ctx, next) => {
  const { momentId } = ctx.params;
  const { id } = ctx.user;
  const isPermission = await authService.checkMoment(momentId, id);
  if(isPermission) {
    await next();
  } else {
    const error = new Error(errorType.UNPERMISSION);
    return ctx.app.emit('error', error, ctx)
  }
  
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}