
from django.urls import path , include
from .views import ping

urlpatterns = [
    path('ping/', ping, name="ping"),
]
