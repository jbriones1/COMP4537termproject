'use strict';

const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/stats', (req, res) => {
  res.status(200).send(`${req.body.username}\n${req.body.password}`);
});

module.exports = router;