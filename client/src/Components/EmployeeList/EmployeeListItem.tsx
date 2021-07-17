import React, { FunctionComponent } from 'react';

import { EmployeeType } from '../../Types/employee';

import './EmployeesList.scss';

type EmployeeProps = {
  employee: EmployeeType;
  buttonText: string;
  onClickHandler: () => void;
};

const EmployeeListItem: FunctionComponent<EmployeeProps> = ({
  employee,
  buttonText,
  onClickHandler,
}: EmployeeProps) => {
  return (
    <div className="ListItem">
      <div className="ListItem__Wrapper">
        <span>
          {employee.first_name} {employee.last_name}
        </span>
      </div>
      <div className="ListItem__Wrapper">
        <span>{employee.position_title}</span>
      </div>
      <div className="ListItem__Wrapper">
        <button onClick={onClickHandler} className="Button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default EmployeeListItem;
