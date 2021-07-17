import axios from "axios";

import { EmployeeType } from "../../Types/employee";

export const FETCH_EMPLOYEES = () => {
  return axios.get<EmployeeType[]>(
    `${process.env.REACT_APP_EMPLOYEES_SERVICE_URL}/employees`
  );
}

export const FETCH_EMPLOYEE_BY_ID = (employeeId: string) => {
  const url = `${process.env.REACT_APP_EMPLOYEES_SERVICE_URL}/employee/${employeeId}`;
  return axios.get<EmployeeType>(url);
}

export const FETCH_SUBORDINANTS_BY_MANAGER_ID = (managerId: string) => {
  const url = `${process.env.REACT_APP_EMPLOYEES_SERVICE_URL}/employee/${managerId}/subordinates`;
  return axios.get<EmployeeType[]>(url);
}


export const FETCH_MANAGER_OF_EMPLOYEE = (employeeId: string) => {
  const url = `${process.env.REACT_APP_EMPLOYEES_SERVICE_URL}/employee/${employeeId}/manager`;
  return axios.get<EmployeeType>(url);
}


