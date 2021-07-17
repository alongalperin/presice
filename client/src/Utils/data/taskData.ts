import axios from "axios";

import { TaskType } from "../../Types/task";

export const FETCH_TASKS_OF_EMPLOYEE = async (employeeId: string) => {
  const url = `${process.env.REACT_APP_TASKS_SERVICE_URL}/tasks/employee/${employeeId}`;
  return axios.get<TaskType[]>(url);
}

export const POST_TASK = async (employeeId: number | null, dueDate: string, taskTitle: string) => {
  return axios.post(`${process.env.REACT_APP_TASKS_SERVICE_URL}/task`, {
    employeeId,
    dueDate,
    taskTitle,
  });
}
