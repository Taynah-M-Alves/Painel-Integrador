
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.MostrarTarefas),
    path('criar/',views.CriarTarefa, name="criar_tarefa"),
    path('delete/<int:id>',views.DeletarTarefa ),
]
