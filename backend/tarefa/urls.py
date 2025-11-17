
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.criar_visualizar_tarefa),
    path('<int:id>', views.ver_tarefa_por_grupo),
    path('<int:id>/status-finalizado', views.definir_tarefa_como_finalizada),
]
