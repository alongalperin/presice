if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
const pool = require("./utils/dbUtil");
const { parseDateForDB } = require("./utils/dateUtils");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = 5001;

// TODOS:
// 1 create enum for fields names

app.get('/tasks/employee/:id', async (req: Request, res: Response, next: NextFunction) => {
  const employeeId = req.params.id;
  console.log('[GET] request for tasks of user', employeeId);

  let tasks;
  try {
    tasks = await pool.query(
      `
      SELECT id, due_date, employee_id, title
      FROM tasks
      WHERE employee_id=?
      `, [employeeId]);
  } catch (e) {
    next(e);
  }
  res.status(200).send(tasks);
});

app.post('/task', async (req: Request, res: Response, next: NextFunction) => {
  console.log('[POST] request for new task', req.body);

  const newTask = req.body;
  const parsedDate = parseDateForDB(new Date(newTask.dueDate))

  console.log('parsedDate', parsedDate)
  try {
    await pool.query(
      `
      INSERT INTO tasks
      (due_date, employee_id, title)
      VALUES
      (?, ?, ?)
      `, [parsedDate, req.body.employeeId, req.body.taskTitle]);
  } catch (e) {
    next(e);
  }
  res.sendStatus(201);
});

app.get('/healthz', async (req: Request, res: Response) => {
  console.log('healthz check');
  res.status(200).send({ response: "success" })
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('[Error]')
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
