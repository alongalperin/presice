import axios from "axios";

import { TaskType } from "../../Types/task";

export const FETCH_TASKS_OF_EMPLOYEE = (employeeId: string) => {
  const url = `http://localhost:5001/tasks/employee/${employeeId}`;
  return axios.get<TaskType[]>(url);
}

export const POST_TASK = (employeeId: number | null, dueDate: string, taskTitle: string) => {
  return axios.post('http://localhost:5001/task', {
    employeeId,
    dueDate,
    taskTitle,
  });
}
