# notifications/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework import viewsets


class NotificationView(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

class NotificationListView(APIView):
    def get(self, request):
        notifications = Notification.objects.filter(user=request.user, read=False)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
