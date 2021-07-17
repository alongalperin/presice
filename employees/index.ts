if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }
import express, { Request, Response } from 'express';
import cors from "cors";
const pool = require("./utils/dbUtil");
const parseDateForDB = require("./utils/dateUtils");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = 5000;

// TODOS:
// 1 add error handling
// 2 create enum for fields names

app.get('/employees', async (req: Request, res: Response) => {
  console.log('[GET] request for employees');

  const employees = await pool.query('SELECT id, first_name, last_name, position_title FROM employees');

  res.status(200).send(employees);
});

app.get('/employee/:id', async (req: Request, res: Response) => {
  console.log(`[GET] request for employee details ${req.params.id}`);

  const employeeId = req.params.id;
  const employee = await pool.query(
    `
    SELECT id, first_name, last_name, position_title, photo
    FROM employees
    WHERE id=?
    `, [employeeId]);

  res.status(200).send(employee[0]);
});

app.get('/employee/:id/manager', async (req: Request, res: Response) => { // TODO: create one query for all the data
  console.log(`[GET] request for employee details ${req.params.id}`);

  const employeeId = req.params.id;
  const manager = await pool.query(
    `
    SELECT id, first_name, last_name
    FROM employees
    WHERE id IN (
	    SELECT reports_to
	    FROM employees
	    WHERE id=?
    )
    `, [employeeId]);

  res.status(200).send(manager[0]);
});

app.get('/employee/:id/subordinates', async (req: Request, res: Response) => {
  const managerId = req.params.id;
  console.log('[GET] request for subordinates', managerId);

  const employees = await pool.query(
    `
    SELECT id, first_name, last_name, position_title
    FROM employees
    WHERE reports_to=?
    `, [managerId]);

  res.status(200).send(employees);
});

app.get('/healthz', async (req: Request, res: Response) => {
  console.log('healthz check');
  res.status(200).send({ response: "success" })
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
