const sql = require('../db');

exports.getAdminStats = (req, res) => {
  const sql_statement = 'SELECT * FROM apicount';

  sql.db.query(sql_statement)
    .then(result => {
      res.status(200).json(result);
    }).catch(err => {
      return res.sendStatus(500);
    });
};