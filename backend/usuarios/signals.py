from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import AlunoProfile, User, ProfessorProfile

@receiver(post_save, sender=User)
def criar_aluno_profile(sender, instance, created, **kwargs):
    if created and instance.role == User.Roles.ALUNO:
        AlunoProfile.objects.create(
            user =instance,
            turma=instance.turma)

@receiver(post_save, sender=User)
def criar_professor_profile(sender, instance, created, **kwargs):
    if created and instance.role == User.Roles.PROFESSOR:
        ProfessorProfile.objects.create(user=instance)
