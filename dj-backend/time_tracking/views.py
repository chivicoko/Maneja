# time_tracking/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TimeEntry
from .serializers import TimeEntrySerializer
from rest_framework import viewsets


class TimeEntryView(viewsets.ModelViewSet):
    serializer_class = TimeEntrySerializer
    queryset = TimeEntry.objects.all()


class StartTimeEntryView(APIView):
    def post(self, request):
        serializer = TimeEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
