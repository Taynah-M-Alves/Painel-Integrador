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
    projeto_list = [{"id":p.id, "Tema": p.Tema, "Turma": p.turma.NomeTurma, "Professor":p.professor.user.username } for p in projetos]

    return JsonResponse({"Projetos": projeto_list}, status=200)

@csrf_exempt
def VerGrupoPorProjeto(request, id):
    gruposSalvos = Grupo.objects.all()
    grupos = get_list_or_404(gruposSalvos, ProjetoIntegrador=id)
    lista_grupo=[]


    for gp in grupos:
        integrantes= AlunoProfile.objects.filter(grupo=gp)
        integrantes_list= [
            {"id": ap.user.id, "nome": ap.user.username} for ap in integrantes
            ]
        lider = {"id":gp.lider.id, "nome":gp.lider.username} if gp.lider else None


        lista_grupo.append({
            "id": gp.id,
            "Nome do Grupo": gp.NomeGrupo,
            "Integrantes": integrantes_list,
            "Lider":lider,
            "DataCriacao": gp.DataCriacao.strftime("%d/%m/%Y"),
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
            
                
            if not turmaReq:
                return JsonResponse({"erro":"Turma não encontrada"}, status=400)

            if not professor_id:
                return JsonResponse({"erro":"Professor não encontrado"}, status=400)

            projeto = projIntegrador.objects.create(
                Tema = dados.get("Tema"),
                turma = turmaReq,
                professor = professor
            )
            
            
            return JsonResponse({"Projeto_Criado":{
                                 "id":projeto.id,
                                 "Tema":projeto.Tema,
                                 "Turma":projeto.turma.NomeTurma,
                                 "Professor":projeto.professor.user.username
                                 }}, status=200)

        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)
    
    return JsonResponse({"erro": "Método não permitido"}, status=405)