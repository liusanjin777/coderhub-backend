const connection = require('../app/database');
const sqlFragment = `
  SELECT m.id id, m.content content, 
  JSON_OBJECT('id', u.id, 'name', u.name) user,
  (SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) AS commentCount
  FROM moment AS m 
  LEFT JOIN user AS u ON m.user_id = u.id
`
const sqlFragment2 = `
  SELECT m.id id, m.content content, 
  JSON_OBJECT('id', u.id, 'name', u.name) AS user,
  JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content)) AS comments,
  (SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) AS commentCount
  FROM moment AS m 
  LEFT JOIN comment AS c ON c.moment_id = m.id
  LEFT JOIN user AS u ON m.user_id = u.id 
  
` // 查询包括评论内容的sql语句

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?,?);`;
    const res = await connection.execute(statement, [userId, content]);
    return res
  };
  async getMomentById(id) {
    const statement = `
      ${sqlFragment2}
      WHERE m.id = ?;
    `
    const [res] = await connection.execute(statement, [id]);
    console.log(res);
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
  };
  async deleteMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`;
    const [res] = await connection.execute(statement, [momentId]);
    return res
  }
}
module.exports = new MomentService()