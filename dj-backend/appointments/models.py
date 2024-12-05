# appointments/models.py
from django.db import models
from users.models import User
from projects.models import Project

class Appointment(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    project = models.ForeignKey(Project, related_name='appointments', on_delete=models.CASCADE)
    attendees = models.ManyToManyField(User, related_name='appointments')
    scheduled_for = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
