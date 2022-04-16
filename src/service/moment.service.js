const connection = require('../app/database');
const sqlFragment = `
  SELECT 
    m.id id, m.content content, 
  JSON_OBJECT('id', u.id, 'name', u.name) user 
  FROM moment AS m LEFT JOIN user AS u 
  ON m.user_id = u.id
`
class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?,?);`;
    const res = await connection.execute(statement, [userId, content]);
    return res
  };
  async getMomentById(id) {
    const statement1 = `SELECT * FROM moment WHERE id = ?;`;
    const statement2 = `
      ${sqlFragment}
      WHERE m.id = ?;
    `
    const [res] = await connection.execute(statement2, [id]);
    return res[0]
  };
  async getMomentList(offset, size) {
    const statement = `
      ${sqlFragment}
      LIMIT ?, ?;
    `;
    const [res] = await connection.execute(statement, [offset, size])
    return res
  };
  async updateMoment(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id =?;`;
    const [res] = await connection.execute(statement, [content, momentId])
    return res;
  }
}
module.exports = new MomentService()