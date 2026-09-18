from django.db import models


class Employee(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "Active", "Active"
        ON_LEAVE = "On Leave", "On Leave"
        INACTIVE = "Inactive", "Inactive"

    class Grade(models.TextChoices):
        A_PLUS = "A+", "A+"
        A = "A", "A"
        B = "B", "B"
        C = "C", "C"
        D = "D", "D"

    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    department = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30, blank=True)
    image = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    salary = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    joining_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    years_of_experience = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    performance_rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    grade = models.CharField(max_length=2, choices=Grade.choices, default=Grade.C)
    last_appraisal_date = models.DateField(null=True, blank=True)
    last_increment_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Attendance(models.Model):
    employee = models.OneToOneField(
        Employee, on_delete=models.CASCADE, related_name="attendance"
    )
    total_working_days = models.PositiveIntegerField(default=0)
    days_present = models.PositiveIntegerField(default=0)
    days_absent = models.PositiveIntegerField(default=0)
    total_leaves = models.PositiveIntegerField(default=0)
    leaves_taken = models.PositiveIntegerField(default=0)
    leaves_remaining = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Attendance for {self.employee.name}"
