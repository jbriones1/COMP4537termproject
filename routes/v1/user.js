'use strict';

const express = require('express');
const queries = require('../../utilities/operations/op_user.js');
const router = express.Router({mergeParams: true});

router.post('/', queries.createUser);

router.get('/:userID', queries.getUserByID);

router.post('/login', (req, res) => {
  res.status(200).send(`POST /login:
  \n${req.body.username}
  \n${req.body.password}`);
});

router.post('/logout', (req, res) => {
  res.status(200).send('Logged out successfully');
});

module.exports = router;