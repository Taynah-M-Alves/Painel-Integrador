from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Tarefa, StatusTarefa
from grupo.models import Grupo
from usuarios.models import AlunoProfile
from historico.models import historico, tipoAlteracao
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt 
def criar_visualizar_tarefa(request):
    if request.method == 'GET':
        tarefas = Tarefa.objects.all()
        task_list = [{"id":t.id, "titulo": t.titulo, "descricao": t.descricao,"Prazo":t.prazo} for t in tarefas]

        return JsonResponse(task_list, status=200, safe=False)
    
    elif request.method == 'POST':
        try:
            dados = json.loads(request.body)  # pega o JSON enviado no corpo da requisição
            statusReceived = dados.get("status_tarefa")
            status = get_object_or_404(StatusTarefa, pk=statusReceived)

            groupId = dados.get("grupo")
            grupoReceived = get_object_or_404(Grupo, pk=groupId)

            responsavelId = dados.get("responsavel")
            responsavel = get_object_or_404(AlunoProfile, pk=responsavelId)

            tarefa = Tarefa.objects.create(
                titulo=dados.get("titulo"),
                descricao=dados.get("descricao", ""),
                prazo=dados.get("prazo"),
                aluno_profile = responsavel,
                status_tarefa = status,
                grupo = grupoReceived,
            )

            
            tipo_criacao_tarefa = get_object_or_404(tipoAlteracao, pk=1)

            alteracao = historico.objects.create(
                tipo_alteracao= tipo_criacao_tarefa,
                tarefa_alterada = tarefa if tarefa else None,
            )

            return JsonResponse({"id": tarefa.id,
                                  "titulo": tarefa.titulo,
                                  "Descricao":tarefa.descricao,
                                  "Prazo":tarefa.prazo, 
                                  "status_tarefa":tarefa.status_tarefa.nome_status, 
                                  "grupo":
                                        {
                                        "id":tarefa.grupo.id, "nome":tarefa.grupo.nome_grupo
                                        },
                                  "alteracao":
                                        {
                                            "tipo": alteracao.tipo_alteracao.descricao,
                                            "tarefa":alteracao.tarefa_alterada.titulo,
                                            "data":alteracao.data_alteracao,
                                        },
                                    }, status=201)
            
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)
    else:
        return JsonResponse({"erro": "Método não permitido. Use o método GET para ver todas as Tarefas e POST para criar uma Tarefa."}, status=405)
        
@csrf_exempt 
def ver_tarefa_por_grupo(request,id):
    if request.method == 'GET':
        received_grupo = get_object_or_404(Grupo, pk=id)
        tarefas = Tarefa.objects.filter(grupo = received_grupo)

        task_list = [{"id":t.id, 
                      "titulo": t.titulo, 
                      "descricao": t.descricao,
                      "prazo":t.prazo,
                      "criado":t.data_criacao,
                      "status":t.status_tarefa.nome_status,
                      "responsavel":t.aluno_profile.user.username if t.aluno_profile else "Sem responsável"} for t in tarefas]

        return JsonResponse(task_list, status=200, safe=False)

    else:
        return JsonResponse({"erro": "Método não permitido. Use o método GET para ver todas as Tarefas e POST para criar uma Tarefa."}, status=405)


@csrf_exempt 
def definir_tarefa_como_finalizada(request,id):
    if request.method == 'PATCH':
        received_tarefa = get_object_or_404(Tarefa, pk=id)
        status = get_object_or_404(StatusTarefa, pk=2)

        received_tarefa.status_tarefa = status
        received_tarefa.save()

        tipo_criacao_tarefa = get_object_or_404(tipoAlteracao, pk=3)

        alteracao = historico.objects.create(
            tipo_alteracao= tipo_criacao_tarefa,
            tarefa_alterada = received_tarefa if received_tarefa else None,
            )

        return JsonResponse({"tarefa":alteracao.tarefa_alterada.titulo,"status_tarefa":received_tarefa.status_tarefa.nome_status}, status=200, safe=False)

    else:
        return JsonResponse({"erro": "Método não permitido. Use o método GET para ver todas as Tarefas e POST para criar uma Tarefa."}, status=405)
