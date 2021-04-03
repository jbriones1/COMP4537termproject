'use strict';

const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
  res.send('GET task');
});

router.route('/:taskID')
  .put((req, res) => { res.send('PUT task ' + req.params.taskID); })
  .delete((req, res) => { res.send('DELETE task ' + req.params.taskID); });

router.put('/complete/:taskID', (req, res) => {

});


module.exports = router;