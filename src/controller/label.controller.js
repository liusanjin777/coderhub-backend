const labelService = require('../service/label.service');

class LabelController {
  async create(ctx, next) {
    const { labelName } = ctx.request.body;
    const res = await labelService.createLabel(labelName);
    ctx.body = res
  };
  async list(ctx, next) {
    const { offset, size } = ctx.query
    const res = await labelService.getLabelList(offset,size)
    ctx.body = {
      res,
      message:"查询标签成功！"
    }
  }
}

module.exports = new LabelController();