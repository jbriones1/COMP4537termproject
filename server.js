'use strict';

const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`Example app listening on port port!`));