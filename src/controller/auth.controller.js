const service = require('../service/user.service');
const JWT = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config')
class AuthController {
  async login(ctx, next) {

    const {id, name} = ctx.user;
    const token  = JWT.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = {
      id, name, token
    }
  };
  async success(ctx, next) {
    ctx.body = "Auth success!"
  }
}
module.exports = new AuthController()