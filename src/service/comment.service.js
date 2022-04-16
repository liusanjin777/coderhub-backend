const connection = require('../app/database');

class CommentService {
  async createComment(userId, momentId, content) {
    console.log(userId, momentId, content);
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [res] =  await connection.execute(statement, [content, momentId, userId]);
    console.log(res);
    return res
  }
}

module.exports = new CommentService();