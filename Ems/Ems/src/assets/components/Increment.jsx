import { useState } from "react";


const Increment = ({ employee }) => {

    const [message, setMessage] = useState("");
  if (!employee) {
    return (
      <div className="employee-info-wrapper">
        <p className="no-employee">No employee selected.</p>
      </div>
    );
  }

  const {
    years_of_experience,
    performance_rating,
    grade,
    last_appraisal_date,
    last_increment_percent,
    id
  } = employee;



  const gradeIncrementMap = {
    A: 15,
    B: 10,
    C: 5,
    D: 0
  };

  const HandleIncrement=()=>{

    if(!years_of_experience){
        setMessage("There is no appraisal record till now.");
        return ;
    
    }
    const lastDate = new Date(last_appraisal_date);
    const today = new Date();
    const diffInMs = today - lastDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));


    if (diffInDays < 365) {
      setMessage(`Not eligible yet. ${365 - diffInDays} days remaining for next appraisal.`);
      return;
    }

      const incrementPercent = gradeIncrementMap[grade];

   if (incrementPercent === undefined) {
      setMessage(`No increment rule defined for grade "${grade}"`);
      return;
    }

    if(incrementPercent ===0){
         setMessage(`Grade ${grade} is not eligible for an increment this cycle."`);

        return ;
    }

    setMessage(`✅ Increment approved: ${incrementPercent}% for Grade ${grade} (Employee ID: ${id}).`);




  }

  return (
    <div>  <div className="employee-info-wrapper">
      <h1>Performace Evaluation</h1>

      <div className="employee-info-card">
      

        <div className="attendance-stats">
          <div className="attendance-stat">
            <span className="attendance-stat-value">{years_of_experience ?? "-"}</span>
            <span className="attendance-stat-label">Years of Experience</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{performance_rating ?? "-"}</span>
            <span className="attendance-stat-label">Performace Rating</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{grade ?? "-"}</span>
            <span className="attendance-stat-label">Grade</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{last_appraisal_date ?? "-"}</span>
            <span className="attendance-stat-label">Last Apprisal Date</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{last_increment_percent ?? "-"}</span>
            <span className="attendance-stat-label">Last Increment Percent</span>
          </div>

        </div>

        <div className="increment-actions">
          <button className="increment-button" onClick={() => HandleIncrement()}>
            Calculate Increment
          </button>

          {message && <p className="increment-message">{message}</p>}
        </div>
      </div>
    </div></div>
  );
};

export default Increment;
