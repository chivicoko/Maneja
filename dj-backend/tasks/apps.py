# from django.apps import AppConfig


# class TasksConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'tasks'


# tasks/apps.py
from django.apps import AppConfig

class TasksConfig(AppConfig):
    name = 'tasks'

    def ready(self):
        import tasks.signals
