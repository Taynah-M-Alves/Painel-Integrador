from django.shortcuts import get_list_or_404, get_object_or_404
from .models import projIntegrador
from django.http import JsonResponse, Http404
from grupo.models import Grupo
from .serializers import ProjetoSerializer
from usuarios.models import AlunoProfile, Turma, ProfessorProfile
from tarefa.models import Tarefa
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json


@api_view(['GET', 'POST'])
def criar_visualizar_projetos(request):
    if request.method == 'GET':
        projetos = projIntegrador.objects.all().order_by('id')
        serializer = ProjetoSerializer(projetos, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':

        serializer = ProjetoSerializer(data=request.data)
        if serializer.is_valid():
            projeto = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def ver_projeto_por_id(request, id):
    try:
        # Tenta buscar o projeto pelo ID, ou retorna 404 automaticamente
        project = get_object_or_404(projIntegrador, pk=id)

        professor =  project.professor
        turma =  project.turma

        professor_data = {"id": professor.id, "nome":professor.user.username} if professor else None

        turma_data = {"id": turma.id, "nome":turma.nome_turma} if turma else None        

        project_data={
                    "id": project.id,
                    "tema": project.tema,
                    "descricao": project.descricao,
                    "professor":professor_data,
                    "turma": turma_data,
                }
    
        return JsonResponse(project_data, status=200)
        
    except Exception as e:
        # Caso ocorra algum outro erro inesperado
        return JsonResponse({"erro": f"Erro interno: {str(e)}"}, status=500)
    

@api_view(['GET'])
def ver_grupos_por_projeto(request, id):
        try:

            grupos = get_list_or_404(Grupo, projeto_integrador=id)
            lista_grupo=[]

            for gp in grupos:
                integrantes= AlunoProfile.objects.filter(grupo=gp)
                integrantes_list= [
                    {"id": ap.user.id, "nome": ap.user.username} for ap in integrantes
                    ]
                lider = {"id":gp.lider.id, "nome":gp.lider.user.username} if gp.lider else None
                
                #verificando se o grupo tem tarefa atrasada


                tarefas_grupo = Tarefa.objects.filter(grupo=gp)
                tarefas_list= [
                    {"id": tarefa.id, "statusTarefa": tarefa.status_tarefa.nome_status} for tarefa in tarefas_grupo
                    ]
                tem_atraso = tarefas_grupo.filter(
                status_tarefa__nome_status__in=["Atrasado", "Vencido"]
                ).exists()


                lista_grupo.append({
                    "id": gp.id,
                    "Nome_Grupo": gp.nome_grupo,
                    "Integrantes": integrantes_list,
                    "Lider":lider,
                    "DataCriacao": gp.data_criacao.strftime("%d/%m/%Y"),
                    "Atencao": tem_atraso,
                })

            return JsonResponse(lista_grupo, status=200,safe=False)
        
        except Http404:
            return JsonResponse ({"erro":"Não tem nenhum grupo associado a esse projeto"}, status=404) 
        

