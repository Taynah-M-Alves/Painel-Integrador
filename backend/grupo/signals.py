from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Grupo 
from usuarios.models import AlunoProfile

@receiver(post_save, sender=Grupo)
def atualizar_grupo_aluno_profile(sender, instance, created, **kwargs):
    if created:
        # Atualiza todos os alunos do grupo de uma vez
        AlunoProfile.objects.filter(id__in=[aluno.id for aluno in instance.alunos.all()]) \
                            .update(grupo=instance)
