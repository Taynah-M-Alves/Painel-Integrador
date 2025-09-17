from django.db import models
from grupo.models import Grupo
from usuarios.models import AlunoProfile

class StatusTarefa(models.Model):
    nome_status = models.CharField(max_length=10)

    def __str__(self):
        return self.nomeStatus

class tarefa(models.Model):
    titulo = models.CharField(max_length=50)
    descricao = models.TextField()
    prazo = models.DateField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    status_tarefa_id = models.ForeignKey(StatusTarefa, on_delete=models.SET_NULL, null=True)
    aluno_profile_id = models.ForeignKey(AlunoProfile, on_delete=models.SET_NULL, null=True)
    grupo_id = models.ForeignKey(Grupo, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"Titulo: {self.titulo} -> Prazo: {self.prazo}"
