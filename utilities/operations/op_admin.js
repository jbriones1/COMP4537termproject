const sql = require('../db');

exports.getAdminStats = (req, res) => {
  const sql_statement = 'SELECT * FROM apicount';

  sql.db.query(sql_statement, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.status(200).json(result);
  });
};