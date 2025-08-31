

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from grupo.models import Grupo

class User(AbstractUser):
    class Roles(models.TextChoices):
        ALUNO = "ALUNO", "Aluno"
        PROFESSOR = "PROF", "Professor"
        STAFF = "STAFF", "Staff/Coordenação"

    role = models.CharField(
        max_length=10,
        choices=Roles.choices,
        default=Roles.ALUNO,
    )

    # Campos extras comuns (se quiser)
    # ra = models.CharField(max_length=30, blank=True)

    def is_aluno(self) -> bool:
        return self.role == self.Roles.ALUNO

    def is_professor(self) -> bool:
        return self.role == self.Roles.PROFESSOR
      

class Turma(models.Model):
    NomeTurma = models.CharField(max_length=80)

    def __str__(self):
        return self.NomeTurma
    

class AlunoProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="aluno_profile")
    grupo = models.ForeignKey(Grupo, on_delete=models.SET_NULL, null=True, blank=False, related_name="alunos")

    def __str__(self):
        return f"Aluno: {self.user.username}"
    
class ProfessorProfile(models.Model):
    user = models.OneToOneField("usuarios.User", on_delete=models.CASCADE, related_name="Professor_profile")

    def __str__(self):
        return f"{self.user.username}"
