from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db.models.signals import m2m_changed
from django.dispatch import receiver



User = settings.AUTH_USER_MODEL

class Grupo(models.Model):
    NomeGrupo = models.CharField(max_length=120)
    ProjetoIntegrador = models.ForeignKey("projIntegrador.ProjIntegrador", on_delete=models.CASCADE, null= False, blank=True, related_name="ProjetoIntegrador")
    DataCriacao = models.DateTimeField(auto_now_add=True)
    lider = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="lideranca",
        limit_choices_to={"role": "ALUNO"},
    )

    def __str__(self):
        return self.NomeGrupo
    
@property
def integrantes_users(self):
    # retorna queryset de User (evita import circular)
    from django.contrib.auth import get_user_model
    User = get_user_model()
    return User.objects.filter(aluno_profile__grupo=self)


