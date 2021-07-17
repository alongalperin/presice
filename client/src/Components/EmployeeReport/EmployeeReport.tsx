import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SubordinatesList from './SubordinatesList';
import PersonalDetails from './PersonalDetails';
import TasksList from './TasksList';
import ReportsList from './ReportsList';

import { EmployeeType } from '../../Types/employee';
import { TaskType } from '../../Types/task';
import { ReportType } from '../../Types/report';
import {
  FETCH_EMPLOYEE_BY_ID,
  FETCH_SUBORDINANTS_BY_MANAGER_ID,
  FETCH_MANAGER_OF_EMPLOYEE,
} from '../../Utils/data/employeeData';
import { FETCH_TASKS_OF_EMPLOYEE } from '../../Utils/data/taskData';
import { FETCH_REPORTS_OF_EMPLOYEE } from '../../Utils/data/reportData';

import '../EmployeeList/EmployeesList.scss';

const fetchUser = async (employeeId: string) => {
  const { data } = await FETCH_EMPLOYEE_BY_ID(employeeId);
  return data;
};

const fetchSubordinates = async (employeeId: string) => {
  const { data } = await FETCH_SUBORDINANTS_BY_MANAGER_ID(employeeId);
  return data;
};

const fetchManager = async (employeeId: string) => {
  const { data } = await FETCH_MANAGER_OF_EMPLOYEE(employeeId);
  return data;
};

const fetchTasks = async (employeeId: string) => {
  const { data } = await FETCH_TASKS_OF_EMPLOYEE(employeeId);
  return data;
};

const fetchReports = async (employeeId: string) => {
  const { data } = await FETCH_REPORTS_OF_EMPLOYEE(employeeId);
  return data;
};

const EmployeeReport: FunctionComponent<{}> = () => {
  const params = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<EmployeeType>();
  const [subordinates, setSubordinates] = useState<EmployeeType[]>([]);
  const [manager, setManager] = useState<EmployeeType>();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [reports, setReports] = useState<ReportType[]>([]);

  useEffect(() => {
    // TODO: add try catch
    const fetchEmployee = async () => {
      const employeeId = params.id;

      const user = await fetchUser(employeeId);
      setEmployee(user);

      const subordinates = await fetchSubordinates(employeeId);
      setSubordinates(subordinates);

      const manager = await fetchManager(employeeId);
      setManager(manager);

      const tasks = await fetchTasks(employeeId);
      tasks.forEach((task) => (task.due_date = new Date(task.due_date)));
      setTasks(tasks);

      const reports = await fetchReports(employeeId);
      reports.forEach(
        (report) => (report.reporting_date = new Date(report.reporting_date))
      );
      console.log('reports', reports);
      setReports(reports);
    };
    fetchEmployee();
  }, [params.id]);

  return (
    <div>
      <PersonalDetails employee={employee} manager={manager} />
      <TasksList tasks={tasks} />
      {subordinates && <SubordinatesList subordinates={subordinates} />}
      {reports.length ? <ReportsList reports={reports} /> : null}
    </div>
  );
};

export default EmployeeReport;
