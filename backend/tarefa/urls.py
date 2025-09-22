
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.criar_visualizar_tarefa),
]
