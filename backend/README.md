# EMS Backend (Django + DRF)

REST API backing the Ems React app, matching the employee/attendance shape used by
`Ems/Ems/src/assets/data/employee.js`.

## Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_employees   # loads the same 5 sample employees as the frontend mock data
python manage.py createsuperuser  # optional, for /admin/
python manage.py runserver 8000
```

API base URL: `http://127.0.0.1:8000/api/`
CORS is pre-configured to allow `http://localhost:5173` and `http://127.0.0.1:5173` (Vite's default dev ports).

## Endpoints

| Method | URL                      | Purpose                     |
|--------|--------------------------|------------------------------|
| GET    | `/api/employees/`        | List employees (paginated, `?search=`, `?department=`, `?status=`) |
| POST   | `/api/employees/`        | Create an employee           |
| GET    | `/api/employees/<id>/`   | Retrieve one employee        |
| PUT    | `/api/employees/<id>/`   | Full update                  |
| PATCH  | `/api/employees/<id>/`   | Partial update (e.g. salary bump) |
| DELETE | `/api/employees/<id>/`   | Delete an employee           |

`attendance` is nested inside the employee payload (read and write):

```json
{
  "name": "Aditi Sharma",
  "role": "Frontend Developer",
  "department": "Engineering",
  "email": "aditi.sharma@company.com",
  "phone": "+91-9876543210",
  "image": "https://...",
  "is_active": true,
  "status": "Active",
  "salary": "75000.00",
  "joining_date": "2022-03-15",
  "location": "Bangalore",
  "years_of_experience": "4.5",
  "performance_rating": "4.2",
  "grade": "A",
  "last_appraisal_date": "2026-01-15",
  "last_increment_percent": "8.00",
  "attendance": {
    "total_working_days": 22,
    "days_present": 20,
    "days_absent": 2,
    "total_leaves": 12,
    "leaves_taken": 2,
    "leaves_remaining": 10
  }
}
```

Only `name`, `role`, `department` and `email` are required on create; everything else has a
sensible default so a minimal "Add Employee" form works out of the box.

Django admin (`/admin/`) also has full CRUD with inline attendance editing.
