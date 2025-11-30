
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.criar_visualizar_grupos),
    path('<int:id>',views.visualizar_grupo_por_id, name="visualizar_grupo" ),
    path('<int:id>/adicionar-integrante',views.adicionar_integrantes, name="adicionar-integrantes"),
    path('<int:id>/atribuir-lideranca',views.atribuir_lideranca, name="atribuir-lideranca"),
    path('<int:id>/atribuir-objetivo',views.atribuir_objetivo_grupo, name="atribuir-objetivo"),
    path('remover-integrantes/<int:id>',views.remover_integrantes, name="remover_integrantes" ),
]
