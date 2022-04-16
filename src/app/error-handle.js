const errorType = require('../constants/error-types')
const errorHandle = (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = '用户名或者密码错误！';
      break;
    case errorType.NAME_IS_ALREADY_EXISTS:
      status = 409; // conflict : 矛盾
      message = '用户名已经存在！';
      break;
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400;
      message = '用户不存在！'
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;
      message = '无效的token！'
      break;
    case errorType.PASSWORD_IS_INCORRENT:
      status = 400;
      message = '密码错误！'
      break;
    default:
      status = 404;
      message = 'NOT FOUND!';
      break;
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandle;
