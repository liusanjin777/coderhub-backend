const connection = require('../app/database');

class LabelService {
  async createLabel(labelName) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [res] = await connection.execute(statement, [labelName]);
    return res
  };
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [res] = await connection.execute(statement, [name]);
    return res[0]
  }
}

module.exports = new LabelService();