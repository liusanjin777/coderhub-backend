const connection = require('../app/database');

class CommentService {
  async createComment(userId, momentId, content) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [res] =  await connection.execute(statement, [content, momentId, userId]);
    return res
  };
  async replyComment(userId, momentId, content, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const [res] =  await connection.execute(statement, [content, momentId, userId, commentId]);
    return res
  }

}

module.exports = new CommentService();