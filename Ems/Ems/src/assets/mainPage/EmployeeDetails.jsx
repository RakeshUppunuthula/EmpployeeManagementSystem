import SideBar from "../components/SideBar";
import EmployeeInfo from "../components/EmployeeInfo";
import Attendence from "../components/Attendence";
import { useState } from "react";
import Increment from "../components/Increment";




const EmployeeDetails = ({ employee,Onback }) => {

const[activeTab, setActiveTab] = useState("info");


  return (
    <div className="employee-details-layout">
      <SideBar  activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="employee-details-main">
        <div className="topbar">
          <button className="back-button" onClick={Onback}>← Back to Employees</button>
        </div>
        <div className="employee-content-area">
          {activeTab==="info" && <EmployeeInfo employee={employee} />}
          {activeTab==="attendence" && <Attendence employee={employee} /> }
          {activeTab==="hike"  && <Increment employee={employee}/>}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDetails;
