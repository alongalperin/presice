import React, { FunctionComponent, useState } from 'react';

import { EmployeeType } from './types/employee';

import AssignTaskModal from './AssignTaskModal';
import EmployeeListItem from './Components/EmployeeList/EmployeeListItem';

import './Components/EmployeeList/EmployeesList.scss';

type EmployeesListProps = {
  subordinates: EmployeeType[];
};

const SubordinatesList: FunctionComponent<EmployeesListProps> = ({
  subordinates,
}: EmployeesListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSubordinant, setSelectedSubordinant] = useState<number | null>(
    null
  );

  const renderEmployeesItems = (employees: EmployeeType[]) => {
    return employees.map((employee) => {
      return (
        <EmployeeListItem
          buttonText={'Assign Task'}
          key={employee.id}
          employee={employee}
          onClickHandler={() => {
            onClickHandler(employee.id);
          }}
        />
      );
    });
  };

  const onClickHandler = (employeeId: number) => {
    setIsModalOpen(true);
    setSelectedSubordinant(employeeId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSubordinant(null);
  };

  const renderModalContent = () => {
    return (
      <>
        <AssignTaskModal
          employeeId={selectedSubordinant}
          visible={isModalOpen}
          handleModalClose={handleModalClose}
        />
        <div className="Buttons__Container"></div>
      </>
    );
  };

  if (!subordinates.length) {
    return (
      <div className="SubordinatesList">
        <span className="SubordinatesList__Title">
          You don't have subordinates
        </span>
      </div>
    );
  }

  return (
    <div className="SubordinatesList">
      <span className="SubordinatesList__Title">My subordinates</span>
      {renderEmployeesItems(subordinates)}
      {isModalOpen && renderModalContent()}
    </div>
  );
};

export default SubordinatesList;
