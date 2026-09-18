const EmployeeInfo = ({ employee }) => {
  if (!employee) {
    return (
      <div className="employee-info-wrapper">
        <p className="no-employee">No employee selected.</p>
      </div>
    );
  }

  const {
    image,
    name,
    role,
    department,
    email,
    phone,
    status,
    salary,
    joining_date,
    location,
  } = employee;

  const statusClass = `status-badge status-${(status || "")
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <div className="employee-info-wrapper">
      <h1>Personal Info</h1>

      <div className="employee-info-card">
        <div className="employee-info-header">
          <img src={image} alt={name} className="employee-avatar" />

          <div>
            <h2>{name}</h2>
            <p className="employee-role">{role}</p>
            <span className={statusClass}>{status}</span>
          </div>
        </div>

        <form
          className="employee-info-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="form-section-title">Details</p>

          <div className="form-row">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              value={department || ""}
              readOnly
            />
          </div>

          <div className="form-row">
            <label htmlFor="location">Location</label>
            <input id="location" type="text" value={location || ""} readOnly />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email || ""} readOnly />
          </div>

          <div className="form-row">
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="text" value={phone || ""} readOnly />
          </div>

          <div className="form-row">
            <label htmlFor="salary">Salary</label>
            <input
              id="salary"
              type="text"
              value={salary != null ? `₹${salary.toLocaleString("en-IN")}` : ""}
              readOnly
            />
          </div>

          <div className="form-row">
            <label htmlFor="joiningDate">Joining Date</label>
            <input
              id="joiningDate"
              type="text"
              value={joining_date || ""}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeInfo;
