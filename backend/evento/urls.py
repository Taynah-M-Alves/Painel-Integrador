
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.criar_visualizar_evento, name="criar_editar_projetos"),
    path('<int:id>',views.visualizar_evento_by_id, name="ver_evento_id" ),
]
