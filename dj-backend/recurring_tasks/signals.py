# recurring_tasks/signals.py
from django.utils.timezone import now
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RecurringTask
from tasks.models import Task

@receiver(post_save, sender=RecurringTask)
def create_new_task_for_recurring(sender, instance, created, **kwargs):
    if now() >= instance.next_due:
        Task.objects.create(
            title=instance.task.title,
            description=instance.task.description,
            project=instance.task.project,
            assigned_to=instance.task.assigned_to,
            due_date=instance.next_due + timedelta(days=7 if instance.frequency == 'weekly' else 30),
            priority=instance.task.priority,
        )
