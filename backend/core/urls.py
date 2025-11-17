
from django.contrib import admin
from django.urls import path , include
from django.conf import settings
from django.conf.urls.static import static

from projIntegrador.views import criar_visualizar_projetos
from grupo.views import criar_visualizar_grupos 
from rest_framework import routers

route = routers.DefaultRouter()
route.register("", criar_visualizar_grupos, basename='grupoview')

urlpatterns = [
    path('', criar_visualizar_projetos, name='home'),
    path('admin/', admin.site.urls),
    path('grupos/', include("grupo.urls")),
    path('tarefas/', include("tarefa.urls")),
    path('projetos/', include("projIntegrador.urls")),
    path('usuarios/', include("usuarios.urls")),
    path('eventos/', include("evento.urls")),
    path('historico/', include("historico.urls")),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
