import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SubordinatesList from '../../SubordinatesList';
import PersonalDetails from './PersonalDetails';
import TasksList from './TasksList';
import ReportsList from './ReportsList';

import { EmployeeType } from '../../types/employee';
import { TaskType } from '../../types/task';
import { ReportType } from '../../types/report';

import '../EmployeeList/EmployeesList.scss';

const fetchUser = async (employeeId: string) => {
  const url = `http://localhost:5000/employee/${employeeId}`;
  const { data } = await axios.get<EmployeeType>(url);
  return data;
};

const fetchSubordinates = async (employeeId: string) => {
  const url = `http://localhost:5000/employee/${employeeId}/subordinates`;
  const { data } = await axios.get<EmployeeType[]>(url);
  return data;
};

const fetchManager = async (employeeId: string) => {
  const url = `http://localhost:5000/employee/${employeeId}/manager`;
  const { data } = await axios.get<EmployeeType>(url);
  return data;
};

const fetchTasks = async (employeeId: string) => {
  const url = `http://localhost:5001/tasks/employee/${employeeId}`;
  const { data } = await axios.get<TaskType[]>(url);
  return data;
};

const fetchReports = async (employeeId: string) => {
  const url = `http://localhost:5002/reports/manager/${employeeId}`;
  const { data } = await axios.get<ReportType[]>(url);
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
  }, []);

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
