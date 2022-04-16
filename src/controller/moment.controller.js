const momentService = require('../service/moment.service')
class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    const res = await momentService.create(userId, content)
    ctx.body = res
    await next()
  };
  async detail(ctx, next) {
    const momentId = ctx.params.momentId
    // console.log(momentId);
    const res = await momentService.getMomentById(momentId);
    ctx.body = res
  };
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const res = await momentService.getMomentList(offset, size);
    ctx.body = res
  }
}

module.exports = new MomentController();