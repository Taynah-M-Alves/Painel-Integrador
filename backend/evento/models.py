from django.db import models

class statusEvento(models.Model):
    nome_status = models.CharField(max_length=10)

    def __str__(self):
        return self.nome_status
    

class evento(models.Model):
    titulo = models.CharField(max_length=50)
    descricao = models.TextField()
    prazo = models.DateField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    status_evento = models.ForeignKey(statusEvento, on_delete=models.SET_NULL, null=True)
    projeto_integrador = models.ForeignKey("projIntegrador.projIntegrador", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Titulo: {self.titulo} -> Prazo: {self.prazo}"