from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db.models.signals import m2m_changed
from django.dispatch import receiver



User = settings.AUTH_USER_MODEL

class Grupo(models.Model):
    nome_grupo = models.CharField(max_length=120)
    projeto_integrador_id = models.ForeignKey("projIntegrador.ProjIntegrador", on_delete=models.CASCADE, null= False, blank=True, related_name="ProjetoIntegrador")
    data_criacao = models.DateTimeField(auto_now_add=True)
    lider_id = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="lideranca",
        limit_choices_to={"role": "ALUNO"},
    )

    def __str__(self):
        return self.nome_grupo
    
@property
def integrantes_users(self):
    # retorna queryset de User (evita import circular)
    from django.contrib.auth import get_user_model
    User = get_user_model()
    return User.objects.filter(aluno_profile__grupo=self)


