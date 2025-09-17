
from django.urls import path 
from . import views

urlpatterns = [
    path('verturmas/', views.MostrarTurmas),
    path('veralunos/', views.MostrarAlunos),
    path('verprofessores/', views.MostrarProfessores),
]
