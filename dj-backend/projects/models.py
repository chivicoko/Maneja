# projects/models.py
from django.db import models
from users.models import User

class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(User, related_name='created_projects', on_delete=models.CASCADE)
    team_members = models.ManyToManyField(User, related_name='assigned_projects')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
