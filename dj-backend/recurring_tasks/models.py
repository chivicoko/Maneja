# recurring_tasks/models.py
from django.db import models
from tasks.models import Task

class RecurringTask(models.Model):
    task = models.OneToOneField(Task, on_delete=models.CASCADE)
    recurrence_pattern = models.CharField(max_length=50, choices=[
        ('Daily', 'Daily'),
        ('Weekly', 'Weekly'),
        ('Monthly', 'Monthly'),
    ])
    next_occurrence = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Recurring task for {self.task.title} ({self.recurrence_pattern})"
