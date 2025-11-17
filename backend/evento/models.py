from django.db import models

class StatusEvento(models.Model):
    nome_status = models.CharField(max_length=10)

    def __str__(self):
        return self.nome_status
    

class Evento(models.Model):
    titulo = models.CharField(max_length=50)
    descricao = models.TextField()
    file = models.FileField(upload_to='uploads/images', null=True, blank=True)
    prazo = models.DateField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    status_evento = models.ForeignKey(StatusEvento, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Titulo: {self.titulo} -> Prazo: {self.prazo}"