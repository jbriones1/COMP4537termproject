const sql = require('../db');

exports.getAdminStats = (req, res) => {
  const query = 'SELECT * FROM apicount';

  sql.db.query(query)
    .then(result => {
      res.status(200).json(result);
    }).catch(err => {
      return res.sendStatus(500);
    });
};