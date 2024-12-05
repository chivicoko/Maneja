from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from event.views import EventView
from projects.views import ProjectView
from tasks.views import TaskView
from users.views import UserView
from notifications.views import NotificationView
from files.views import FileView
from time_tracking.views import TimeEntryView
from rest_framework import routers

# Instantiate the DefaultRouter
router = routers.DefaultRouter()

# Register viewsets with unique basenames
router.register(r'events', EventView, basename='events')
router.register(r'projects', ProjectView, basename='projects')
router.register(r'tasks', TaskView, basename='tasks')
router.register(r'users', UserView, basename='users')
router.register(r'notifications', NotificationView, basename='notifications')
router.register(r'files', FileView, basename='files')
router.register(r'time_tracking', TimeEntryView, basename='time_tracking')

# Define urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Include all router-registered viewsets here
]



if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


admin.site.index_title = 'Maneja - The Project Management App'
admin.site.site_header = 'Maneja Admin Site'
admin.site.site_title = 'Maneja Site Administration'