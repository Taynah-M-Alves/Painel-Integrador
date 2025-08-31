from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

User = settings.AUTH_USER_MODEL

class Grupo(models.Model):
    NomeGrupo = models.CharField(max_length=120)
    DataCriacao = models.DateTimeField(auto_now_add=True)
    integrantes = models.ManyToManyField(User, related_name="grupos", limit_choices_to={"role": "ALUNO"})
    lider = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="lideranca",
        limit_choices_to={"role": "ALUNO"},
    )

   

    def __str__(self):
        return self.NomeGrupo

@receiver(m2m_changed, sender=Grupo.integrantes.through)
def limitar_integrantes(sender, instance, action, **kwargs):
    if action == "pre_add":
        if instance.integrantes.count() + len(kwargs.get("pk_set", [])) > 5:
            raise ValueError("Um grupo não pode ter mais de 5 integrantes.")

