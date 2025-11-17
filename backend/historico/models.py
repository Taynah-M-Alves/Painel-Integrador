from django.db import models
from grupo.models import Grupo
from tarefa.models import Tarefa
from evento.models import Evento
from usuarios.models import AlunoProfile

class tipoAlteracao(models.Model):
    elemento_alterado = models.CharField(max_length=120)
    descricao = models.CharField(max_length=300)

    def __str__(self):
        return f'{self.elemento_alterado} - {self.descricao}'

class historico(models.Model):
    data_alteracao = models.DateTimeField(auto_now_add=True)
    grupo_alterado = models.ForeignKey(Grupo, on_delete=models.CASCADE, null=True, blank=True)
    tarefa_alterada = models.ForeignKey(Tarefa, on_delete=models.CASCADE, null=True, blank=True)
    evento_alterada = models.ForeignKey(Evento, on_delete=models.CASCADE, null=True, blank=True)
    usuario_alterador = models.ForeignKey(AlunoProfile, on_delete=models.SET_NULL, null=True, blank=True)
    tipo_alteracao = models.ForeignKey(tipoAlteracao, on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return f'{self.tipo_alteracao.elemento_alterado} - {self.data_alteracao}'
