const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}).promise();

const incrementEndpoint = (apiID) => {
  const increment_statement = `UPDATE apiCount SET requests = requests + 1 WHERE apiID = ?`;

  db.query(increment_statement, [apiID])
    .catch(err => {
      return res.status(500).send('Failed to increment');
    });
};

module.exports = {
  db,
  incrementEndpoint
};