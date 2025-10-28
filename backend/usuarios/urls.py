
from django.urls import path 
from . import views

urlpatterns = [
    path('turmas', views.mostrar_turmas),
    path('alunos', views.mostrar_alunos),
    path('alunos/semgrupo',views.mostrar_alunos_sem_grupo),
    path('professores', views.mostrar_professores),
]
