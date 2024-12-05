# users/admin.py
from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'avatar', 'is_project_manager')

admin.site.register(User, UserAdmin)
