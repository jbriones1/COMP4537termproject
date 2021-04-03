const mysql = require('mysql2');

// Required to load database credentials
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.getAdminStats = (req, res) => {
  const query = `SELECT * FROM apicount`;

  pool.query(query, (err, result) => {
    if (err) {
      res.status(500).send(process.env.DB_HOST);
      return;
    }
    console.log(process.env.DB_HOST);
    console.log(result);
    res.status(200).json(result);
  });
};