const connection = require('../app/database');
class AuthService {
  async checkTable(tableName, id, userId) {
    const statement = `SELECT user_id FROM ${tableName} WHERE id = ? AND user_id =?;`
    const [res] = await connection.execute(statement, [id, userId]);
    return res.length !== 0 ? true : false;
  }
}

module.exports = new AuthService()