const mysql = require('mysql2');

// Required to load database credentials
require('dotenv').config();

const db = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.getAdminStats = (req, res) => {
  const sql_statement = 'SELECT * FROM apicount';

  db.query(sql_statement, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.status(200).json(result);
  });
};

exports.createUser = (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const name     = req.body.name;
  const isAdmin  = req.body.isAdmin;

  if (!req.body.username || !req.body.password || !req.body.name || req.body.isAdmin == undefined) {
    res.status(400);
    return;
  }

  const sql_statement = `INSERT INTO User (username,user_password,name,isAdmin) VALUES (?, ?, ?, ?)`;

  db.query(sql_statement, [username, password, name, isAdmin], (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    incrementEndpoint(54);
    res.sendStatus(200);
  });
};

exports.getUserByID = (req, res) => {
  const sql_statement = `SELECT username,user_password,name,isAdmin FROM User WHERE userID=?`;
  db.query(sql_statement, [req.params.userID], (err, result) => {
    if (err) {
      res.sendStatus(404);
      return;
    }

    incrementEndpoint(84);
    res.status(200).json(result);
  });
};

const incrementEndpoint = (apiID) => {
  const increment_statement = `UPDATE apiCount SET requests = requests + 1 WHERE apiID = ?`;

  db.query(increment_statement, [apiID], (err, result) => {
    if (err) {
      throw err;
      return;
    }
  });
};