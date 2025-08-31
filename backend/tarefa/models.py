from django.db import models

class StatusTarefa(models.Model):
    nomeStatus = models.CharField(max_length=10)

    def __str__(self):
        return self.nomeStatus

class tarefa(models.Model):
    titulo = models.CharField(max_length=50)
    descricao = models.TextField()
    prazo = models.DateField()
    dataCriacao = models.DateTimeField(auto_now_add=True)
    statusTarefa = models.ForeignKey(StatusTarefa, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Titulo: {self.titulo} -> Prazo: {self.prazo}"
