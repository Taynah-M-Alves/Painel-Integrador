from django.apps import AppConfig

class GrupoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'grupo'

    def ready(self):
        # Importa o módulo onde estão os signals
        import grupo.signals
