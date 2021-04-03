'use strict';

const express = require('express');
const queries = require('../../utilities/db');
const router = express.Router({mergeParams: true});

router.post('/', queries.createUser);

router.get('/:userID', (req, res) => {
  res.status(200).send('GET /userID ' + req.params.userID);
});

router.post('/login', (req, res) => {
  res.status(200).send(`POST /login:
  \n${req.body.username}
  \n${req.body.password}`);
});

router.post('/logout', (req, res) => {
  res.status(200).send('Logged out successfully');
});

module.exports = router;