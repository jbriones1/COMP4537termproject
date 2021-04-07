const sql = require('../db');

const getUserByID = (req, res) => {

  const sql_statement = 
    `SELECT username,user_password,name,isAdmin 
     FROM User 
     WHERE userID = ?`;

  sql.db.query(sql_statement, [req.params.userID])
    .then(result => {
      // sql.incrementEndpoint(84);
      res.status(200).json(result[0]);
    }).catch(err => {
      return res.sendStatus(500);
    });
};

module.exports = {
  getUserByID
}