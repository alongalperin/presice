import axios from "axios";

import { ReportType } from "../../Types/report";

export const FETCH_REPORTS_OF_EMPLOYEE = async (employeeId: string) => {
  const url = `http://localhost:5002/reports/manager/${employeeId}`;
  return axios.get<ReportType[]>(url);
}

export const POST_REPORT = async (employeeId: number | undefined, managerId: number | undefined, reportText: string) => {
  return axios.post('http://localhost:5002/report', {
    senderId: employeeId,
    reciverId: managerId,
    text: reportText,
  });
}
