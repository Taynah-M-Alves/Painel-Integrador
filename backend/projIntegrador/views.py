from django.shortcuts import render, get_list_or_404, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import projIntegrador
from django.http import JsonResponse
from grupo.models import Grupo
from usuarios.models import AlunoProfile, Turma, ProfessorProfile
import json

@csrf_exempt
def MostrarProjetos(request):
    projetos = projIntegrador.objects.all()
    projeto_list = [{"id":p.id, "Tema": p.tema, "Turma": p.turma_id.nome_turma, "Professor":p.professor_id.user_id.username } for p in projetos]

    return JsonResponse({"Projetos": projeto_list}, status=200)

@csrf_exempt
def VerGrupoPorProjeto(request, id):
    gruposSalvos = Grupo.objects.all()
    grupos = get_list_or_404(gruposSalvos, projeto_integrador_id_id=id)
    lista_grupo=[]


    for gp in grupos:
        integrantes= AlunoProfile.objects.filter(grupo_id=gp)
        integrantes_list= [
            {"id": ap.user_id.id, "nome": ap.user_id.username} for ap in integrantes
            ]
        lider = {"id":gp.lider_id.id, "nome":gp.lider_id.username} if gp.lider_id else None


        lista_grupo.append({
            "id": gp.id,
            "Nome do Grupo": gp.nome_grupo,
            "Integrantes": integrantes_list,
            "Lider":lider,
            "DataCriacao": gp.data_criacao.strftime("%d/%m/%Y"),
        })

    return JsonResponse({"grupos":lista_grupo}, status=200)

@csrf_exempt
def CriarProjeto(request):
    if request.method == "POST":

        try:
            dados = json.loads(request.body)
            turma_id = dados.get("Turma")
            professor_id = dados.get("Professor")

           
            turmaReq = get_object_or_404(Turma, id=turma_id)
            professor = get_object_or_404(ProfessorProfile, id=professor_id)
            

            projeto = projIntegrador.objects.create(
                tema = dados.get("Tema"),
                turma_id = turmaReq,
                professor_id = professor
            )
            
            
            return JsonResponse({"Projeto_Criado":{
                                 "id":projeto.id,
                                 "Tema":projeto.tema,
                                 "Turma":projeto.turma_id.nome_turma,
                                 "Professor":projeto.professor_id.user_id.username
                                 }}, status=200)

        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)
    
    return JsonResponse({"erro": "Método não permitido"}, status=405)