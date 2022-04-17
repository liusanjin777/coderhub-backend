const commentService = require('../service/comment.service')
class CommentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { momentId, content } = ctx.request.body
    const res = await commentService.createComment(id, momentId, content);
    ctx.body = res
  };
  async reply(ctx, next) {
    const { id } = ctx.user;
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params
    const res = await commentService.replyComment(id, momentId, content, commentId);
    ctx.body = res
  };
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const res = await commentService.updateComment(commentId, content);
    ctx.body = res;
  };
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const res = await commentService.removeComment(commentId);
    ctx.body = res;
  };
  async list(ctx, next) {
    const { momentId } = ctx.query;
    const res = await commentService.getListByMomentId(momentId);
    ctx.body = res;
  }
}

module.exports = new CommentController();