
from django.contrib import admin
from django.urls import path , include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('grupos/', include("grupo.urls")),
    path('tarefas/', include("tarefa.urls")),
    path('projetos/', include("projIntegrador.urls")),
    path('usuarios/', include("usuarios.urls")),
    path('eventos/', include("evento.urls")),
]
