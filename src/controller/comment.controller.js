const commentService = require('../service/comment.service')
class CommentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { momentId, content } = ctx.request.body
    const res = await commentService.createComment(id, momentId, content);
    ctx.body = res
  }
}

module.exports = new CommentController();