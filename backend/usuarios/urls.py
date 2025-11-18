
from django.urls import path 
from . import views

urlpatterns = [
    path('turmas', views.mostrar_turmas),
    path('alunos', views.mostrar_alunos),
    path('alunos/semgrupo/<int:id>',views.mostrar_alunos_sem_grupo_by_turma),
    path('professores', views.mostrar_professores),
    path('criar-admin', views.criar_admin),
     path('criar-alunos', views.criar_alunos),
]
