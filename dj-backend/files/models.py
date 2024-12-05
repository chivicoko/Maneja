# files/models.py
from django.db import models
from users.models import User
from tasks.models import Task
from projects.models import Project

class File(models.Model):
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, null=True, blank=True, on_delete=models.SET_NULL)
    project = models.ForeignKey(Project, null=True, blank=True, on_delete=models.SET_NULL)
    file = models.FileField(upload_to='uploads/')
    description = models.TextField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.file.name}"
