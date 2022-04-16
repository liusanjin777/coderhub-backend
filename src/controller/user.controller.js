const service = require('../service/user.service')
class UserController {
  async createUser(ctx, next) {
    // 获取用户请求的数据
    const user = ctx.request.body
    // 查询数据-数据库
    const res = await service.create(user)
    // 返回数据
    ctx.body = res
  }
}
module.exports = new UserController()