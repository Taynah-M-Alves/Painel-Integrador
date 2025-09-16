from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.exceptions import ValidationError

class Turma(models.Model):
    NomeTurma = models.CharField(max_length=80)

    def __str__(self):
        return self.NomeTurma
    

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
    turma = models.ForeignKey(Turma, on_delete=models.SET_NULL, null = True, blank=True)

    # Campos extras comuns (se quiser)
    # ra = models.CharField(max_length=30, blank=True)

    def is_aluno(self) -> bool:
        return self.role == self.Roles.ALUNO

    def is_professor(self) -> bool:
        return self.role == self.Roles.PROFESSOR
    
    def clean(self):
         # Validação: se for aluno, turma é obrigatória
        if self.role == self.Roles.ALUNO and self.turma is None:
            raise ValidationError({"turma": "Alunos devem estar vinculados a uma turma."})
        
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
      

class AlunoProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="aluno_profile")
    grupo = models.ForeignKey("grupo.Grupo", on_delete=models.SET_NULL, null=True, blank=True, related_name="alunos")
    turma = models.ForeignKey(Turma, on_delete=models.SET_NULL, null = True, blank=True, related_name="aluno_profile_turma")

    def save(self, *args, **kwargs):
        # validação simples: não deixa exceder 5 integrantes
        if self.grupo:
            excesso = self.grupo.alunos.exclude(pk=self.pk).count() >= 5
            if excesso:
                from django.core.exceptions import ValidationError
                raise ValidationError("Um grupo não pode ter mais de 5 integrantes.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Aluno: {self.user.username}"
    

    
class ProfessorProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="professor_profile")

    def __str__(self):
        return f"Professor: {self.user.username}"
