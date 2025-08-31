from django.db import models

class statusEvento(models.Model):
    NomeStatusEvento = models.CharField(max_length=10)

    def __str__(self):
        return self.NomeStatusEvento
    

class evento(models.Model):
    titulo = models.CharField(max_length=50)
    descricao = models.TextField()
    prazo = models.DateField()
    dataCriacao = models.DateTimeField(auto_now_add=True)
    statusEvento = models.ForeignKey(statusEvento, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Titulo: {self.titulo} -> Prazo: {self.prazo}"