const connection = require('../app/database');
class AuthService {
  async checkMoment(momentId, userId) {
    const statement = `SELECT user_id FROM moment WHERE id = ? AND user_id =?;`
    const [res] = await connection.execute(statement, [momentId, userId])
    return res.length !== 0 ? true : false;
  }
}

module.exports = new AuthService()