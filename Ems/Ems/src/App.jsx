import "./App.css";
import AllEmployees from "./assets/mainPage/AllEmployees";

import { useState } from "react";
import EmployeeDetails from "./assets/mainPage/EmployeeDetails";

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const Onback = ()=>{setSelectedEmployee(null)}

  return (
    <div>
      {selectedEmployee ? (
        <EmployeeDetails employee={selectedEmployee}  Onback={Onback} />
      ) : (
        <AllEmployees viewEmployee={setSelectedEmployee} />
      )}
    </div>
  );
}

export default App;
