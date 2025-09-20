
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.MostrarProjetos),
    path('criar/',views.CriarProjeto, name="criar_projetos"),
    path('verporid/<int:id>',views.VerGrupoPorProjeto, name="ver_grupos_projeto" ),
]
