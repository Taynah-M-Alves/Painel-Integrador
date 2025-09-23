
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.criar_visualizar_evento, name="criar_editar_projetos"),
    # path('<int:id>',views.ver_grupos_por_projeto, name="ver_grupos_projeto" ),
]
