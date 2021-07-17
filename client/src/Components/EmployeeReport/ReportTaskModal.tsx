import React, { FunctionComponent, useState } from 'react';
import axios from 'axios';

import Modal from '../UI/Modal';

// import './EmployeeReport.scss';

type Props = {
  handleModalClose: () => void;
  visible: boolean;
  employeeId: number | undefined;
  managerId: number | undefined;
};

const ReportTaskModal: FunctionComponent<Props> = ({
  visible,
  handleModalClose,
  employeeId,
  managerId,
}: Props) => {
  console.log('render');

  const [reportText, setReportText] = useState<string>('');

  const submitReport = () => {
    const postReport = async () => {
      await axios.post('http://localhost:5002/report', {
        senderId: employeeId,
        reciverId: managerId,
        text: reportText,
      });
    };
    postReport();
    handleModalClose();
    reset();
  };

  const handleReportChange = (e: any) => {
    // TODO: add type to e
    setReportText(e.target.value);
  };

  const reset = () => {
    setReportText('');
  };

  return (
    <Modal
      saveButtonText={'Save'}
      cancelButtonText={'Cancel'}
      cancelButtonHandler={handleModalClose}
      visible={visible}
      saveButtonHandler={submitReport}
    >
      <div className="AssignTaskModal__Form">
        <div className="Input__Group">
          <label>Report To Manager:</label>
          <br />
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={reportText}
            onChange={handleReportChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ReportTaskModal;
