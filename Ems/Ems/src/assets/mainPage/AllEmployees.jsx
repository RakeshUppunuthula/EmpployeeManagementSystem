import { useState } from "react";
import { useEffect } from "react";
import { getEmployees, updateEmployee } from "../data/apis/employeeApis";

const AllEmployees = ({ viewEmployee }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [employeesData, setEmployeesData] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees(page);
        setEmployeesData(data.results);
        setCount(data.count);
        setHasNext(Boolean(data.next));
        setHasPrevious(Boolean(data.previous))
      } catch (error) {
        setErr(error.message || "Failed to load employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page]);

  const handleEdit = async (id) => {
    const employee = employeesData.find((emp) => emp.id === id);
    const newSalary = Number(employee.salary) + 5000;

    try {
      await updateEmployee(id, { salary: newSalary });

      const UpdateEmmployeeList = employeesData.map((emp) => {
        if (emp.id === id) {
          return { ...emp, salary: newSalary };
        }

        return emp;
      });
      setEmployeesData(UpdateEmmployeeList);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = (id) => {
    const updateEmployeeList = employeesData.filter((emp) => emp.id !== id);
    setEmployeesData(updateEmployeeList);
  };

  const handleView = (id) => {
    const selectedEmployee = employeesData.find((emp) => emp.id === id);
    viewEmployee(selectedEmployee);
  };

  const PAGE_SIZE = 5;
  const totalEmployees = count;

  const totalSalary = employeesData.reduce(
    (acc, emp) => acc + Number(emp.salary),
    0,
  );

  return (
    <div className="employee-table-wrapper">
      <h2> Employees Directory</h2>

      <div className="table-toolbar">
        <label htmlFor="search" className="search-label">
          Search:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search by name, department, or location"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="">Filter by department</option>
          {[...new Set(employeesData.map((emp) => emp.department))].map(
            (dept) => {
              return (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              );
            },
          )}
        </select>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employeesData
            .filter(
              (emp) =>
                (filterDepartment === "" ||
                  emp.department === filterDepartment) &&
                emp.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((emp, index) => (
              <tr key={emp.id}>
                <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.location}</td>
                <td>₹{emp.salary.toLocaleString("en-IN")}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => {
                        handleEdit(emp.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${emp.name}?`,
                          )
                        ) {
                          handleDelete(emp.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button onClick={() => handleView(emp.id)}>View</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="table-summary-label">
              Total Employees:
            </td>
            <td className="table-summary-value">{totalEmployees}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4" className="table-summary-label">
              Total Salary:
            </td>
            <td className="table-summary-value">
              ₹{totalSalary.toLocaleString("en-IN")}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className="pagination-controls">
  <button
    disabled={!hasPrevious}
    onClick={() => setPage((prev) => prev - 1)}
  >
    Previous
  </button>

  <span>Page {page}</span>

  <button
    disabled={!hasNext}
    onClick={() => setPage((prev) => prev + 1)}
  >
    Next
  </button>
</div>
    </div>
  );
};

export default AllEmployees;
