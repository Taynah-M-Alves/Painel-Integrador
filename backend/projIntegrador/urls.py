
from django.urls import path 
from . import views


urlpatterns = [
    path('', views.criar_visualizar_projetos, name="criar_editar_projetos"),
    path('<int:id>/grupos/',views.ver_grupos_por_projeto, name="ver_grupos_projeto" ),
    path('<int:id>/', views.ver_projeto_por_id, name='ver_projeto_por_id'),
]
