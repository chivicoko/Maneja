# projects/admin.py
from django.contrib import admin
from .models import Project

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'created_by')

admin.site.register(Project, ProjectAdmin)
