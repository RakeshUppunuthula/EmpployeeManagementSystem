from django.contrib import admin

from .models import Attendance, Employee


class AttendanceInline(admin.StackedInline):
    model = Attendance
    can_delete = False


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "department", "status", "salary", "grade"]
    list_filter = ["department", "status", "grade"]
    search_fields = ["name", "email", "department"]
    inlines = [AttendanceInline]
