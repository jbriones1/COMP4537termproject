const sql = require('../db');

/**
 * Adds a task list.
 * 
 * 201: success
 * 400: invalid body
 * 500: database error
 * 
 * @param {Object} req request
 * @param {Object} res result
 * @returns status code
 */
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

/**
 * Deletes a task list.
 * 
 * 200: success
 * 404: task not found
 * 500: database error
 * 
 * @param {Object} req request
 * @param {Object} res result
 * @returns status code
 */
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

/**
 * Get a task list with all its tasks.
 * 
 * 200: task list with tasks
 * 400: invalid body
 * 404: task list not found
 * 500: database error 
 * 
 * @param {Object} req request
 * @param {Object} res result
 * @returns status code
 */
const getTaskList = async (req, res) => {

  const { userID, date } = req.body;

  if (!userID, !date) return res.sendStatus(400)
  
  try {

    // Find the task list and see if it exists
    const q1 = 
      `SELECT taskListID 
       FROM taskList 
       WHERE userID = ? 
             AND date = ?`;

    const [taskList, _1] = await sql.db.query(q1, [userID, date]);

    // If the task list doesn't exist, end with 404
    if (taskList.length < 1) return res.sendStatus(404);

    // If the task list exists, find the tasks that are a part of it
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

module.exports = {
  addTaskList,
  deleteTaskList,
  getTaskList
}