# time_tracking/serializers.py
from rest_framework import serializers
from .models import TimeEntry

class TimeEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeEntry
        fields = "__all__"
