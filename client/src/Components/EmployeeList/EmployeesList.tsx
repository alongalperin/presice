import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import { EmployeeType } from '../../Types/employee';

import EmployeeListItem from './EmployeeListItem';

import './EmployeesList.scss';

type EmployeesListProps = {
  employees: EmployeeType[];
};

const EmployeesList: FunctionComponent<EmployeesListProps> = ({
  employees,
}: EmployeesListProps) => {
  const history = useHistory();

  const renderEmployeesItems = (employees: EmployeeType[]) => {
    return employees.map((employee) => {
      return (
        <EmployeeListItem
          buttonText={'View'}
          key={employee.id}
          employee={employee}
          onClickHandler={() => history.push(`/employee/${employee.id}`)}
        />
      );
    });
  };

  return <div>{renderEmployeesItems(employees)}</div>;
};

export default EmployeesList;
