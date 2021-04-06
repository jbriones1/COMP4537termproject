const mysql = require('mysql2');

// Required to load database credentials
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const incrementEndpoint = (apiID) => {
  const increment_statement = `UPDATE apiCount SET requests = requests + 1 WHERE apiID = ?`;

  db.query(increment_statement, [apiID], (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
};

module.exports = {
  db,
  incrementEndpoint
};