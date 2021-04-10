'use strict';
const sql = require('../db');

/**
 * Gets the user from the database by userID.
 * 
 * @param {Object} req request
 * @param {Object} res response
 */
const getUserByID = (req, res) => {

  const sql_statement = 
    `SELECT username,name,isAdmin 
     FROM User 
     WHERE userID = ?`;

  sql.db.query(sql_statement, [req.params.userID])
    .then(result => {
      sql.incrementEndpoint(54);
      res.status(200).json(result[0]);
    }).catch(err => {
      res.sendStatus(500);
    });
};

module.exports = {
  getUserByID
};