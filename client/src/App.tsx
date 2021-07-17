import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from './MainPage';
import EmployeeReport from './Components/EmployeeReport/EmployeeReport';

import { EmployeeType } from './Types/employee';
import { FETCH_EMPLOYEES } from './Utils/data/employeeData';

import './Style/main.scss';

function App() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  useEffect(() => {
    // TODO: add try catch
    const fetchEmployees = async () => {
      const { data } = await FETCH_EMPLOYEES();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  console.log(process.env.REACT_APP_TEST);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/employee/:id">
            <EmployeeReport />
          </Route>
          <Route path="/" exact>
            {employees && <MainPage employees={employees} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
