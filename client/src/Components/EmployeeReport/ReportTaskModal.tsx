import React, { FunctionComponent, useState } from 'react';

import Modal from '../UI/Modal';

import { POST_REPORT } from '../../Utils/data/reportData';

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
  const [reportText, setReportText] = useState<string>('');

  const submitReport = () => {
    const postReport = async () => {
      await POST_REPORT(employeeId, managerId, reportText);
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
