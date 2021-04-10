const sql = require('../db');

exports.getAdminStats = (req, res) => {
  const query = 'SELECT * FROM apicount';

  sql.incrementEndpoint(94);
  sql.db.query(query)
    .then(([result, ])=> {
      res.status(200).json(result);
    }).catch(err => {
      console.log(err)
      res.sendStatus(500);
    });
};