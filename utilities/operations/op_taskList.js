const sql = require('../db');

const addTaskList = (req, res) => {

  const values = {
    userID: req.body.userID,
    date: req.body.date
  }

  if (!values.userID || !values.date) return res.sendStatus(400);

  const query = 
    `INSERT INTO taskList
     SET ?`;
  
  sql.db.query(query, [values])
  .then(result => res.sendStatus(201))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
}

const deleteTaskList = (req, res) => {
  
  const query =
    `DELETE FROM taskList
     WHERE taskListID = ?`;
    
  sql.db.query(query, [req.params.taskListID])
  .then(([result, _]) => {

    if (result.affectedRows < 1) return res.sendStatus(404);

    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
}

const getTaskList = (req, res) => {
  
}

const getTaskListYesterday = (req, res) => {
  
}

module.exports = {
  addTaskList,
  deleteTaskList,
  getTaskList,
  getTaskListYesterday
}