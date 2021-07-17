'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const pool = require('./utils/dbUtil');
const parseDateForDB = require('./utils/dateUtils');
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
const PORT = 5000;

// TODOS:
// 1 add error handling
// 2 create enum for fields names

app.get('/employees', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('[GET] request for employees');
    const employees = yield pool.query(
      'SELECT id, first_name, last_name, position_title FROM employees'
    );
    res.status(200).send(employees);
  })
);
app.get('/employee/:id', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[GET] request for employee details ${req.params.id}`);
    const employeeId = req.params.id;
    const employee = yield pool.query(
      `
    SELECT id, first_name, last_name, position_title
    FROM employees
    WHERE id=?
    `,
      [employeeId]
    ); // TODO: use query parsms
    res.status(200).send(employee[0]);
  })
);
app.get('/employee/:id/manager', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[GET] request for employee details ${req.params.id}`);
    const employeeId = req.params.id;
    const manager = yield pool.query(
      `
    SELECT id, first_name, last_name
    FROM employees
    WHERE id IN (
	    SELECT reports_to
	    FROM employees
	    WHERE id=?
    )
    `,
      [employeeId]
    ); // TODO: use query parsms
    res.status(200).send(manager[0]);
  })
);
app.get('/employee/:id/subordinates', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const managerId = req.params.id;
    console.log('[GET] request for subordinates', managerId);
    const employees = yield pool.query(
      `
    SELECT id, first_name, last_name, position_title
    FROM employees
    WHERE reports_to=?
    `,
      [managerId]
    );
    res.status(200).send(employees);
  })
);
app.post('/task', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('[POST] request for new task', req.body);
    const newTask = req.body;
    const parsedDate = parseDateForDB(new Date(newTask.dueDate));
    yield pool.query(
      `
    INSERT INTO tasks
    (due_date, employee_id, title)
    VALUES
    (?, ?, ?)
    `,
      [parsedDate, req.body.employeeId, req.body.taskTitle]
    );
    res.sendStatus(200);
  })
);
app.get('/tasks/employee/:id', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('[POST] request for tasks of user', req.body);
    const tasks = yield pool.query(
      `
    SELECT id, due_date, employee_id, title
    FROM tasks
    WHERE employee_id=?
    `,
      [req.params.id]
    );
    res.status(200).send(tasks);
  })
);
app.post('/report', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('[POST] request for new report', req.body);
    const parsedDate = parseDateForDB(new Date());
    yield pool.query(
      `
    INSERT INTO reports
    (reporting_date, sender_id, reciver_id, text)
    VALUES
    (?, ?, ?, ?)
    `,
      [parsedDate, req.body.senderId, req.body.reciverId, req.body.text]
    );
    res.sendStatus(200);
  })
);
app.get('/reports/manager/:id', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('[GET] request for get reports of manager', id);
    const reports = yield pool.query(
      `
    SELECT employees.first_name, employees.last_name, reports.text, reports.reporting_date
    FROM reports
    INNER JOIN employees ON reports.reciver_id=employees.id
    WHERE reports.reciver_id = ?
    `,
      [id]
    );
    res.status(200).send(reports);
  })
);
app.get('/healthz', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('healthz check');
    res.status(200).send({ response: 'success' });
  })
);
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
