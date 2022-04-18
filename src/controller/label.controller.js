const labelService = require('../service/label.service');

class LabelController {
  async create(ctx, next) {
    const { labelName } = ctx.request.body;
    const res = await labelService.createLabel(labelName);
    ctx.body = res
  }
}

module.exports = new LabelController();