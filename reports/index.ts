if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
const pool = require("./utils/dbUtil");
const { parseDateForDB } = require("./utils/dateUtils");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = 5002;

// TODOS:
// 1 create enum for fields names

app.post('/report', async (req: Request, res: Response, next: NextFunction) => {
  console.log('[POST] request for new report', req.body);

  const parsedDate = parseDateForDB(new Date());

  try {
    await pool.query(
      `
      INSERT INTO reports
      (reporting_date, sender_id, reciver_id, text)
      VALUES
      (?, ?, ?, ?)
      `, [parsedDate, req.body.senderId, req.body.reciverId, req.body.text]);
  } catch (e) {
    next(e);
  }

  res.sendStatus(201);
});

app.get('/reports/manager/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  console.log('[GET] request for get reports of manager', id);

  let reports;
  try {
    reports = await pool.query(
      `
      SELECT employees.first_name, employees.last_name, reports.text, reports.reporting_date
      FROM reports
      INNER JOIN employees ON reports.reciver_id=employees.id
      WHERE reports.reciver_id = ?
      `, [id]);
  } catch (e) {
    next(e);
  }

  res.status(200).send(reports);
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
