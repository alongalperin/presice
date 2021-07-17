import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import MainPage from './MainPage';
import EmployeeReport from './Components/EmployeeReport/EmployeeReport';

import { EmployeeType } from './types/employee';

import './style/main.scss';

function App() {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  useEffect(() => {
    // TODO: add try catch
    const fetchEmployees = async () => {
      const { data } = await axios.get<EmployeeType[]>(
        'http://localhost:5000/employees'
      );
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

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
