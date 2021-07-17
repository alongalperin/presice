import React, { FunctionComponent, useEffect, useState } from 'react';
import EmployeesList from './Components/EmployeeList/EmployeesList';

import { EmployeeType } from './types/employee';

type Props = {
  employees: EmployeeType[];
};

const MainPage: FunctionComponent<Props> = ({ employees }: Props) => {
  return (
    <>
      <span className="Header__1">Employee List</span>
      <EmployeesList employees={employees} />
    </>
  );
};

export default MainPage;
