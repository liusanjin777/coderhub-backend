const labelService = require('../service/label.service');
const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body;
  const newLabels = []
  for(let name of labels){
    const label = { name }
    const res1 = await labelService.getLabelByName(name);
    if(!res1) {
      const res2 = await labelService.createLabel(name);
      label.id = res2.insertId;
    } else {
      label.id = res1.id
    }
    newLabels.push(label);
  };
  ctx.labels = newLabels;
  await next()
}

module.exports = {
  verifyLabelExists
}