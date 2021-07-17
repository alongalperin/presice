import React, { FunctionComponent, useState } from 'react';

import ReportTaskModal from './ReportTaskModal';

import { EmployeeType } from '../../Types/employee';

import './EmployeeReport.scss';

type Props = {
  employee: EmployeeType | undefined;
  manager: EmployeeType | undefined;
};

const profile_default_photo =
  'https://sites.temple.edu/wp-content/uploads/2014/07/profile-template-user-icon.png';

const PersonalDetails: FunctionComponent<Props> = ({
  employee,
  manager,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOnReportClick = () => {
    setIsModalOpen(true);
  };

  const renderModalContent = () => {
    return (
      <>
        <ReportTaskModal
          managerId={manager?.id}
          employeeId={employee?.id}
          visible={isModalOpen}
          handleModalClose={handleModalClose}
        />
        <div className="Buttons__Container"></div>
      </>
    );
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="PersonalDetails__Container">
      <img src={employee?.photo || profile_default_photo} alt="emplyee" />
      <div className="PersonalDetails__Content">
        <div className="PersonalDetails__Row">
          <span className="PersonalDetails__FieldName">Name:</span>
          <span className="PersonalDetails__FieldValue">
            {employee?.first_name || ''} {employee?.last_name || ''}
          </span>
        </div>
        <div className="PersonalDetails__Row">
          <span className="PersonalDetails__FieldName">Position:</span>
          <span className="PersonalDetails__FieldValue">
            {employee?.position_title}
          </span>
        </div>
        <div className="PersonalDetails__Row">
          <div className="PersonalDetails__Devider" />
        </div>
        <div className="PersonalDetails__Row">
          <span className="PersonalDetails__FieldName">Manager:</span>
          <span className="PersonalDetails__FieldValue">
            {manager?.first_name || ''} {manager?.last_name || ''}
          </span>
          <div className="PersonalDetails__Button">
            <button onClick={handleOnReportClick} className="Button">
              Report
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && renderModalContent()}
    </div>
  );
};

export default PersonalDetails;
