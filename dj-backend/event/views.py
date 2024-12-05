from django.shortcuts import render
from .serializers import EventSerializer
from .models import Event
from rest_framework import viewsets


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
