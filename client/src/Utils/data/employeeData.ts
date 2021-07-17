import axios from "axios";

import { EmployeeType } from "../../Types/employee";

export const FETCH_EMPLOYEES = () => {
  return axios.get<EmployeeType[]>(
    'http://localhost:5000/employees'
  );
}

export const FETCH_EMPLOYEE_BY_ID = (employeeId: string) => {
  const url = `http://localhost:5000/employee/${employeeId}`;
  return axios.get<EmployeeType>(url);
}

export const FETCH_SUBORDINANTS_BY_MANAGER_ID = (managerId: string) => {
  const url = `http://localhost:5000/employee/${managerId}/subordinates`;
  return axios.get<EmployeeType[]>(url);
}


export const FETCH_MANAGER_OF_EMPLOYEE = (employeeId: string) => {
  const url = `http://localhost:5000/employee/${employeeId}/manager`;
  return axios.get<EmployeeType>(url);
}


