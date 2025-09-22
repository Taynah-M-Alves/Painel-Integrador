from django.db import models
from usuarios.models import ProfessorProfile,Turma

class projIntegrador(models.Model):
    tema = models.CharField(max_length=200)
    descricao = models.TextField()
    professor = models.ForeignKey(ProfessorProfile, on_delete=models.SET_NULL, null=True)
    turma = models.ForeignKey(Turma, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Tema: {self.tema} - Professor: {self.professor}"