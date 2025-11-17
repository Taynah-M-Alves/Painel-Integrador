from django.urls import path 
from . import views

urlpatterns = [
    path('<int:id>', views.ver_historico_tarefa_por_tarefa),
]