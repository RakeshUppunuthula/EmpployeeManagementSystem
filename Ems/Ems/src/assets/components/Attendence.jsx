const Attendence = ({ employee }) => {
  if (!employee) {
    return (
      <div className="employee-info-wrapper">
        <p className="no-employee">No employee selected.</p>
      </div>
    );
  }

  const {
    total_working_days,
    days_present,
    days_absent,
    total_leaves,
    leaves_taken,
    leaves_remaining,
  } = employee.attendance || {};

  return (
    <div className="employee-info-wrapper">
      <h1>Attendance</h1>

      <div className="employee-info-card">
        <p className="form-section-title">This Month</p>

        <div className="attendance-stats">
          <div className="attendance-stat">
            <span className="attendance-stat-value">{total_working_days ?? "-"}</span>
            <span className="attendance-stat-label">Working Days</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{days_present ?? "-"}</span>
            <span className="attendance-stat-label">Days Present</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{days_absent ?? "-"}</span>
            <span className="attendance-stat-label">Days Absent</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{leaves_taken ?? "-"}</span>
            <span className="attendance-stat-label">Leaves Taken</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{leaves_remaining ?? "-"}</span>
            <span className="attendance-stat-label">Leaves Remaining</span>
          </div>

          <div className="attendance-stat">
            <span className="attendance-stat-value">{total_leaves ?? "-"}</span>
            <span className="attendance-stat-label">Total Leaves</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendence;
