from rest_framework import serializers

from .models import Attendance, Employee


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = [
            "total_working_days",
            "days_present",
            "days_absent",
            "total_leaves",
            "leaves_taken",
            "leaves_remaining",
        ]


class EmployeeSerializer(serializers.ModelSerializer):
    attendance = AttendanceSerializer(required=False)

    class Meta:
        model = Employee
        fields = [
            "id",
            "name",
            "role",
            "department",
            "email",
            "phone",
            "image",
            "is_active",
            "status",
            "salary",
            "joining_date",
            "location",
            "years_of_experience",
            "performance_rating",
            "grade",
            "last_appraisal_date",
            "last_increment_percent",
            "attendance",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def create(self, validated_data):
        attendance_data = validated_data.pop("attendance", None)
        employee = Employee.objects.create(**validated_data)
        if attendance_data:
            Attendance.objects.create(employee=employee, **attendance_data)
        else:
            Attendance.objects.create(employee=employee)
        return employee

    def update(self, instance, validated_data):
        attendance_data = validated_data.pop("attendance", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if attendance_data is not None:
            Attendance.objects.update_or_create(
                employee=instance, defaults=attendance_data
            )

        return instance
