# tasks/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Task
from notifications.models import Notification

@receiver(post_save, sender=Task)
def create_task_notification(sender, instance, created, **kwargs):
    # Check if the task status is marked as 'Done'
    if instance.status == Task.Status.DONE:
        # Notify each team member assigned to the task
        for member in instance.team_members.all():
            Notification.objects.create(
                user=member,
                task=instance,
                message=f"Task '{instance.title}' of '{instance.project}' project has been marked as done."
            )
