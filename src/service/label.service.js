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
  };
  async addLabels(labelId, momentId) {
    const statement = `INSERT INTO moment_label (label_id, moment_id) VALUES (?, ?);`;
    const [res] = await connection.execute(statement, [labelId, momentId]);
  };
  async isHasLabel(labelId, momentId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id =? AND label_id =?;`;
    const [res] = await connection.execute(statement, [momentId, labelId]);
    return res[0] ? true : false;
  };
  async getLabelList(offset, size) {
    const statement = `SELECT id, name FROM label LIMIT ?, ?;`;
    const [res] = await connection.execute(statement, [offset, size])
    return res
  }
}

module.exports = new LabelService();