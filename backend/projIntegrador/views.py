from django.shortcuts import get_list_or_404, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import projIntegrador
from django.http import JsonResponse, Http404
from grupo.models import Grupo
from usuarios.models import AlunoProfile, Turma, ProfessorProfile
import json

@csrf_exempt
def criar_visualizar_projetos(request):
    if request.method == 'GET':
        projetos = projIntegrador.objects.all()
        projeto_list = [{"id":p.id, "Tema": p.tema, "Turma": p.turma.nome_turma, "Professor":p.professor.user.username } for p in projetos]

        return JsonResponse({"Projetos": projeto_list}, status=200)
    
    elif request.method == 'POST':

        try:
            dados = json.loads(request.body)
            turma_req = dados.get("Turma")
            professor_req= dados.get("Professor")

           
            turma_object = get_object_or_404(Turma, id=turma_req)
            professor_object = get_object_or_404(ProfessorProfile, id=professor_req)
            

            projeto = projIntegrador.objects.create(
                tema = dados.get("Tema"),
                turma = turma_object,
                professor = professor_object
            )
            
            
            return JsonResponse({"Projeto_Criado":{
                                 "id":projeto.id,
                                 "Tema":projeto.tema,
                                 "Turma":projeto.turma.nome_turma,
                                 "Professor":projeto.professor.user.username
                                 }}, status=200)

        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)
    
    else:
        return JsonResponse({"erro": "Método não permitido. Use GET para ver os projetos e POST para cria-los"}, status=405)

@csrf_exempt
def ver_grupos_por_projeto(request, id):
    if request.method == 'GET':
       

        try:

            grupos = get_list_or_404(Grupo, projeto_integrador=id)
            lista_grupo=[]

            for gp in grupos:
                integrantes= AlunoProfile.objects.filter(grupo=gp)
                integrantes_list= [
                    {"id": ap.user.id, "nome": ap.user.username} for ap in integrantes
                    ]
                lider = {"id":gp.lider.id, "nome":gp.lider.user.username} if gp.lider else None


                lista_grupo.append({
                    "id": gp.id,
                    "Nome do Grupo": gp.nome_grupo,
                    "Integrantes": integrantes_list,
                    "Lider":lider,
                    "DataCriacao": gp.data_criacao.strftime("%d/%m/%Y"),
                })

            return JsonResponse({"grupos":lista_grupo}, status=200)
        
        except Http404:
            return JsonResponse ({"erro":"Não tem nenhum grupo associado a esse projeto"}, status=404) 
        
    return JsonResponse({"erro":"Metódo Inválido. Use o método GET"}, status=405)

