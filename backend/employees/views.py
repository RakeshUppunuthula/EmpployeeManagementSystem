from rest_framework import filters, viewsets

from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.select_related("attendance").all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "department", "location", "email"]

    def get_queryset(self):
        queryset = super().get_queryset()
        department = self.request.query_params.get("department")
        status_param = self.request.query_params.get("status")
        if department:
            queryset = queryset.filter(department__iexact=department)
        if status_param:
            queryset = queryset.filter(status__iexact=status_param)
        return queryset
