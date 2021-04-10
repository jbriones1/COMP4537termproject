const sql = require('../db');

/**
 * Gets the admin stats for API requests.
 * 
 * @param {Object} req request
 * @param {Object} res result
 */
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