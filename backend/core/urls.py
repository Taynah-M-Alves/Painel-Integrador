
from django.contrib import admin
from django.urls import path , include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('grupo/', include("grupo.urls")),
    path('tarefas/', include("tarefa.urls")),
    path('projetos/', include("projIntegrador.urls")),
    path('usuarios/', include("usuarios.urls")),

    # YOUR PATTERNS
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
