const connection = require('../app/database')
class UserService {
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO user (name, password) VALUES (?,?);`;
    const res = await connection.execute(statement, [name, password]);
    return res
  };
  async getNameByDataBase(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const res = await connection.execute(statement, [name])
    return res[0]
  }
}
module.exports = new UserService()