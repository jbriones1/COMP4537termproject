'use strict';

const router = require('express').Router({mergeParams: true});

router.get('/:userID/today', (req, res) => {
  res.send(`GET today ${req.params.userID}`);
});

router.get('/:userID/yesterday', (req, res) => {
  res.send(`GET yesterday ${req.params.userID}`);
});

router.delete('/:taskListID', (req, res) => {
  res.send(`DELETE tasklist ${req.params.taskListID}`);
});

module.exports = router;