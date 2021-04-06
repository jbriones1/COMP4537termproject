'use strict';

const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use('*', cors());
app.use(bodyParser.json());


app.post('/login', (req, res) => {
  res.status(200).send(`POST /login:
  \n${req.body.username}
  \n${req.body.password}`);
});

app.post('/logout', (req, res) => {
  res.status(200).send('Logged out successfully');
});

app.use('/v1', require('./routes/v1'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));