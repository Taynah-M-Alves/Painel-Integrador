from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,JsonResponse
from .models import tarefa
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt 
def MostrarTarefas(request):
    tarefas = tarefa.objects.all()
    task_list = [{"id":t.id, "titulo": t.titulo, "descricao": t.descricao} for t in tarefas]

    return JsonResponse({"tarefas": task_list}, status=200, safe=False)

@csrf_exempt 
def CriarTarefa(request):
    if request.method == "POST":
        try:
            dados = json.loads(request.body)  # pega o JSON enviado no corpo da requisição
            Tarefa = tarefa.objects.create(
                titulo=dados.get("titulo"),
                descricao=dados.get("descricao", ""),
                prazo=dados.get("prazo"),
                statusTarefa=dados.get("StatusTarefa")
            )
            return JsonResponse({"id": Tarefa.prazo, "titulo": Tarefa.titulo}, status=201)
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)

    return JsonResponse({"erro": "Método não permitido"}, status=405)


@csrf_exempt 
def DeletarTarefa(request, id):
    if request.method == "DELETE":
        tarefas = get_object_or_404(tarefa, pk=id)
        tarefas.delete()
        return JsonResponse({"mensagem":"tarefa deletada com sucesso"}, status=200)
    return JsonResponse({"erro": "Método não permitido"}, status=405)
       
