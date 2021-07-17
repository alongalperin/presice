if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }
import express, { Request, Response } from 'express';
import cors from "cors";
const pool = require("./utils/dbUtil");
const parseDateForDB = require("./utils/dateUtils");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = 5001;

// TODOS:
// 1 add error handling
// 2 create enum for fields names

app.post('/task', async (req: Request, res: Response) => {
  console.log('[POST] request for new task', req.body);

  const newTask = req.body;
  const parsedDate = parseDateForDB(new Date(newTask.dueDate))

  await pool.query(
    `
    INSERT INTO tasks
    (due_date, employee_id, title)
    VALUES
    (?, ?, ?)
    `, [parsedDate, req.body.employeeId, req.body.taskTitle]);
  res.sendStatus(200);
});

app.get('/tasks/employee/:id', async (req: Request, res: Response) => {
  const employeeId = req.params.id;
  console.log('[POST] request for tasks of user', employeeId);

  const tasks = await pool.query(
    `
    SELECT id, due_date, employee_id, title
    FROM tasks
    WHERE employee_id=?
    `, [employeeId]);
  res.status(200).send(tasks);
});

app.get('/healthz', async (req: Request, res: Response) => {
  console.log('healthz check');
  res.status(200).send({ response: "success" })
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
