import React, { FunctionComponent } from 'react';

import { ReportType } from '../../Types/report';

type Props = {
  reports: ReportType[];
};

const ReportsList: FunctionComponent<Props> = ({ reports }: Props) => {
  return (
    <div className="Section__Container">
      <span>Reported to me</span>
      <div className="Section__List">
        {reports.map((report: ReportType) => (
          <div className="ListItem">
            <div className="ListItem__Wrapper ReportListItem__Wrapper">
              <span>
                {report.first_name} {report.last_name}
              </span>
            </div>
            <div className="ListItem__Wrapper ReportListItem__Wrapper">
              <span>{report.text}</span>
            </div>
            <div className="ListItem__Wrapper ReportListItem__Wrapper">
              {report.reporting_date.toLocaleDateString('en-GB')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsList;
