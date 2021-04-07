const sql = require('../db');

exports.createUser = (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const isAdmin = req.body.isAdmin;

  if (!req.body.username || !req.body.password || !req.body.name || req.body.isAdmin == undefined) {
    res.sendStatus(400);
    return;
  }

  const sql_statement = `INSERT INTO User (username,user_password,name,isAdmin) VALUES (?, ?, ?, ?)`;

  sql.db.query(sql_statement, [username, password, name, isAdmin])
  .then(result => {
    sql.incrementEndpoint(54);
    res.sendStatus(200);
  })
  .catch(err =>{
    return res.sendStatus(500);   
  });
};

exports.getUserByID = (req, res) => {

  const sql_statement = `SELECT username,user_password,name,isAdmin FROM User WHERE userID=?`;
  sql.db.query(sql_statement, [req.params.userID])
    .then(result => {
      sql.incrementEndpoint(84);
      res.status(200).json(result[0]);
    }).catch(err => {
      return res.sendStatus(500);
    });
};