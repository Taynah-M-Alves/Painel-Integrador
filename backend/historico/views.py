from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from tarefa.models import Tarefa
from .models import historico

@csrf_exempt
def ver_historico_tarefa_por_tarefa(request,id):
    if request.method == 'GET':
        received_tarefa = get_object_or_404(Tarefa, pk=id)
        historico_alteracoes = historico.objects.filter(tarefa_alterada = received_tarefa)

        historico_list = [{
                            "id": alteracao.id, 
                            "data": alteracao.data_alteracao, 
                            "user_alterador":alteracao.usuario_alterador.user.username if alteracao.usuario_alterador else "Sem usuario alterador",
                            "tipo":{
                                "Id":alteracao.tipo_alteracao.id,
                                "elemento":alteracao.tipo_alteracao.elemento_alterado,
                                "descricao":alteracao.tipo_alteracao.descricao
                                }
                            } for alteracao in historico_alteracoes]

        return JsonResponse(historico_list, status=200, safe=False)

    else:
        return JsonResponse({"erro": "Método não permitido. Use o método GET para ver todas as Tarefas e POST para criar uma Tarefa."}, status=405)
