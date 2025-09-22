from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,JsonResponse
from .models import Tarefa
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt 
def criar_visualizar_tarefa(request):
    if request.method == 'GET':
        tarefas = Tarefa.objects.all()
        task_list = [{"id":t.id, "titulo": t.titulo, "descricao": t.descricao,"Prazo":t.prazo} for t in tarefas]

        return JsonResponse({"tarefas": task_list}, status=200, safe=False)
    
    elif request.method == 'POST':
        try:
            dados = json.loads(request.body)  # pega o JSON enviado no corpo da requisição
            tarefa = Tarefa.objects.create(
                titulo=dados.get("titulo"),
                descricao=dados.get("descricao", ""),
                prazo=dados.get("prazo"),
                status_tarefa =dados.get("StatusTarefa")
            )
            return JsonResponse({"id": tarefa.id, "titulo": tarefa.titulo,"Descricao":tarefa.descricao,"Prazo":tarefa.prazo, "Status_Tarefa":tarefa.status_tarefa}, status=201)
        
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)
    else:
        return JsonResponse({"erro": "Método não permitido. Use o método GET para ver todas as Tarefas e POST para criar uma Tarefa."}, status=405)
        

