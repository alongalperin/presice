import axios from "axios";

import { ReportType } from "../../Types/report";

export const FETCH_REPORTS_OF_EMPLOYEE = async (employeeId: string) => {
  const url = `${process.env.REACT_APP_REPORTS_SERVICE_URL}/reports/manager/${employeeId}`;
  return axios.get<ReportType[]>(url);
}

export const POST_REPORT = async (employeeId: number | undefined, managerId: number | undefined, reportText: string) => {
  return axios.post(`${process.env.REACT_APP_REPORTS_SERVICE_URL}/report`, {
    senderId: employeeId,
    reciverId: managerId,
    text: reportText,
  });
}
