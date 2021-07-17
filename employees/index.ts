if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
const pool = require("./utils/dbUtil");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = 5000;

// TODOS:
// 1 create enum for fields names

app.get('/employees', async (req: Request, res: Response, next: NextFunction) => {
  console.log('[GET] request for employees');

  let employees;
  try {
    employees = await pool.query('SELECT id, first_name, last_name, position_title FROM employees');
  } catch (e) {
    next(e);
  }

  res.status(200).send(employees);
});

app.get('/employee/:id', async (req: Request, res: Response, next: NextFunction) => {
  const employeeId = req.params.id;
  console.log('[GET] request for employee details', employeeId);

  let employee;
  try {

    employee = await pool.query(
      `
      SELECT id, first_name, last_name, position_title, photo
      FROM employees
      WHERE id=?
      `, [employeeId]);
  } catch (e) {
    next(e);
  }

  res.status(200).send(employee[0] || []);
});

app.get('/employee/:id/manager', async (req: Request, res: Response, next: NextFunction) => {
  const employeeId = req.params.id;
  console.log('[GET] request for employee details', employeeId);

  let manager;
  try {

    manager = await pool.query(
      `
      SELECT id, first_name, last_name
      FROM employees
      WHERE id IN (
        SELECT reports_to
        FROM employees
        WHERE id=?
        )
        `, [employeeId]);
  } catch (e) {
    next(e);
  }

  res.status(200).send(manager[0]);
});

app.get('/employee/:id/subordinates', async (req: Request, res: Response, next: NextFunction) => {
  const managerId = req.params.id;
  console.log('[GET] request for subordinates', managerId);

  let employees;
  try {
    employees = await pool.query(
      `
      SELECT id, first_name, last_name, position_title
      FROM employees
      WHERE reports_to=?
      `, [managerId]);
  } catch (e) {
    next(e);
  }

  res.status(200).send(employees);
});

app.get('/healthz', async (req: Request, res: Response) => {
  console.log('healthz check');
  res.status(200).send({ response: "success" })
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
