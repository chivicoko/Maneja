# tasks/models.py
from django.db import models
from users.models import User
from projects.models import Project

class Task(models.Model):

    class Priority(models.TextChoices):
        LOW = 'Low', ('Low')
        MEDIUM = 'Medium', ('Medium')
        HIGH = 'High', ('High')
        
    class Status(models.TextChoices):
        TODO = 'To do', ('To do')
        INPROGRESS = 'In Progress', ('In Progress')
        NEEDREVIEW = 'Need Review', ('Need Review')
        DONE = 'Done', ('Done')
        
    class Substatus(models.TextChoices):
        NOTSTARTED = 'Not started', ('Not started')
        INRESEARCH = 'In Research', ('In Research')
        ONTRACK = 'On Track', ('On Track')
        COMPLETED = 'Completed', ('Completed')
    
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    team_members = models.ManyToManyField(User, related_name='assigned_tasks')
    due_date = models.DateTimeField(verbose_name="Due Date")
    priority = models.CharField(max_length=100, choices=Priority.choices, default=Priority.MEDIUM,)
    status = models.CharField(max_length=100, choices=Status.choices, default=Status.TODO,)
    substatus = models.CharField(max_length=100, choices=Substatus.choices, default=Substatus.NOTSTARTED,)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title} ({self.status})'
