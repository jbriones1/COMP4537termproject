const sql = require('../db');

const addTask = (req, res) => {

  const { taskName, taskDescription, isComplete, taskListID } = req.body;

  if (!taskName || !taskDescription || isComplete == null) {
    return res.sendStatus(400);
  }

  const query =
    `INSERT INTO task SET ?`;
  
  sql.db.query(query, [{ taskName, taskDescription, isComplete, taskListID }])
  .then(result => res.sendStatus(200))
  .catch(err => res.sendStatus(500));
}

module.exports = {
  addTask
}