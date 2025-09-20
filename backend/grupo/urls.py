
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.MostrarGrupos),
    path('criar/',views.CriarGrupo, name="criar_tarefa"),
    # path('adicionarIntegrante/<int:id>',views.AdicionarIntegrantes, name="adicionar-integrantes"),
    # path('atribuirLideranca/<int:id>',views.DefinirLider, name="atribuir-lideranca"),
    # path('ver/<int:id>',views.VerGrupoPorId, name="visualizar_grupo" ),
    # path('removerIntegrantes/<int:id>',views.RemoverIntegrantesGrupo, name="remover_integrantes" ),
]
