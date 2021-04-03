const mysql = require('mysql2');

// Required to load database credentials
require('dotenv').config();

exports.pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});