# time_tracking/models.py
from django.db import models
from users.models import User
from tasks.models import Task

class TimeEntry(models.Model):
    user = models.ForeignKey(User, related_name='time_entries', on_delete=models.CASCADE)
    task = models.ForeignKey(Task, related_name='time_entries', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration = models.DurationField(null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.task}"
