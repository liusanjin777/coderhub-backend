const momentService = require('../service/moment.service')
const labelService = require('../service/label.service')
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
  };
  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const res = await momentService.updateMoment(content, momentId);
    ctx.body = res
  };
  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const res = await momentService.deleteMoment(momentId);
    ctx.body = res
  };
  async addLabel(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;
    for(let label of labels) {
      const isExists = await labelService.isHasLabel(label.id, momentId);
      if (!isExists) {
        const res = await labelService.addLabels(label.id, momentId)
      }
    }
    ctx.body = {
      message: "给动态添加成功！",
      code: 200
    }
  }
}

module.exports = new MomentController();