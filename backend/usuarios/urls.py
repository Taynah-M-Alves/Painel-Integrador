
from django.urls import path 
from . import views

urlpatterns = [
    path('turmas', views.mostrar_turmas),
    path('alunos', views.mostrar_alunos),
    path('professores', views.mostrar_professores),
]
