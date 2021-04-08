const sql = require('../db');

const addTaskList = (req, res) => {

  const { userID, date } =  req.body;


  if (!userID || !date) return res.sendStatus(400);

  const query = 
    `INSERT INTO taskList
     SET ?`;
  
  sql.db.query(query, [{ userID, date }])
  .then(_ => res.sendStatus(201))
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

const getTaskList = async (req, res) => {

  const { userID, date } = req.body;

  if (!userID, !date) return res.sendStatus(400)
  
  try {

    const q1 = 
      `SELECT taskListID 
       FROM taskList 
       WHERE userID = ? 
             AND date = ?`;

    const [taskList, _1] = await sql.db.query(q1, [userID, date]);

    if (taskList.length < 1) return res.sendStatus(404);

    const q2 = 
      `SELECT taskID,taskName,taskDescription,isComplete
       FROM task 
       WHERE taskListID = ?`;

    const [tasks, _2] = await sql.db.query(q2, [taskList[0].taskListID]);

    const results = {
      taskListID: taskList[0].taskListID,
      tasks: tasks
    }

    res.status(200).json(results);

  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }

}

const getTaskListYesterday = (req, res) => {
  
}

module.exports = {
  addTaskList,
  deleteTaskList,
  getTaskList,
  getTaskListYesterday
}