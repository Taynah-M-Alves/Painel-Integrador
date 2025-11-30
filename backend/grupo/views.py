from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Grupo
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model
from usuarios.models import AlunoProfile
from projIntegrador.models import projIntegrador



User = get_user_model()

@csrf_exempt
def criar_visualizar_grupos(request):
    if request.method == 'GET':
        grupos = Grupo.objects.all()
        lista_grupo = []
        for g in grupos:
            integrantesList = AlunoProfile.objects.filter( grupo = g)
            integrantes= [
                {"id": ap.user.id, "nome": ap.user.username} for ap in integrantesList]
            

            lider = {"id":g.lider.id, "nome":g.lider.user.username} if g.lider else None

            lista_grupo.append({
                "id": g.id,
                "Nome_do_Grupo": g.nome_grupo,
                "Integrantes": integrantes,
                "Lider":lider,
                "DataCriacao": g.data_criacao.strftime("%d/%m/%Y %H:%M:%S"),
            })
        return JsonResponse({"grupos":lista_grupo}, status=200)
    
        
    elif request.method == 'POST':

        try:
            dados = json.loads(request.body)

            nome_req = dados.get("Nome_Grupo")
            projeto_req = dados.get("Projeto_Integrador")

            projeto = get_object_or_404(projIntegrador, id=projeto_req)
        
            grupo = Grupo.objects.create(
                nome_grupo = nome_req,
                projeto_integrador = projeto
            )

            integrantes = dados.get("Integrantes",[])
            try:
                integrantes_list = []
                if len(integrantes) <= 5:
                    for integ in integrantes:
                        aluno = get_object_or_404(AlunoProfile, id=integ)
                        aluno.grupo = grupo
                        aluno.save()
                        integrantes_list.append(aluno)

            except Exception as e:
                return JsonResponse({"erro": str(e)}, status=400)

            liderReq = dados.get("Lider")

            if liderReq:
                try:
                    if liderReq in integrantes:
                        lider = get_object_or_404(AlunoProfile, id=liderReq)
                        grupo.lider=lider
                        grupo.save()
                    else:
                        return JsonResponse({"erro":"O lider tem que ser um dos integrantes!"})
                except Exception as e:
                    return JsonResponse({"erro": str(e)}, status=400)
            
            integrantes_formatacao = [{"id":integ.id, "Nome":integ.user.username}for integ in integrantes_list]

            grupo_response = {
                "id":grupo.id,
                "Nome":grupo.nome_grupo,
                "Lider":{
                    "id": grupo.lider.id,
                    "Nome":grupo.lider.user.username
                }if grupo.lider else None,
                "integrantes":integrantes_formatacao
            }

            return JsonResponse(grupo_response, status=200)
        
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)
        
    else:
        return JsonResponse({"erro": "Método não permitido. Utilize GET para visualizar os grupos e POST para criar-los."}, status=405)
          
@csrf_exempt
def visualizar_grupo_por_id(request, id):
    if request.method == 'GET':
        grupo = get_object_or_404(Grupo, pk=id)

        integrantes= [
            {"id": ap.id, "nome": ap.user.username} for ap in grupo.alunos.all()
                ]
        lider = {"id":grupo.lider.id, "nome":grupo.lider.user.username} if grupo.lider else None

        turma = None
        if grupo.projeto_integrador and grupo.projeto_integrador.turma:
            turma = grupo.projeto_integrador.turma.nome_turma

        turmaId = None
        if grupo.projeto_integrador and grupo.projeto_integrador.turma:
            turmaId = grupo.projeto_integrador.turma.id

        return JsonResponse({
                    "id": grupo.id, 
                    "Objetivo": grupo.objetivo_projeto,
                    "Nome_Grupo": grupo.nome_grupo, 
                    "Data_Criação":grupo.data_criacao.strftime("%d/%m/%Y, %H:%M:%S"),
                    "Integrantes": integrantes,
                    "Lider": lider,
                    "turma":turma,
                    "turmaID":turmaId,
                }, status=200)

    return JsonResponse({"erro":"Metódo não permitido. Use o metódo GET."}, status=405)

@csrf_exempt
def adicionar_integrantes(request, id):

    if request.method == "PATCH":

        grupo = get_object_or_404(Grupo, pk=id)
        dado = json.loads(request.body)
        integrantes_ids = dado.get("Integrantes",[])

        #Valida que está sendo informado algum integrante no json
        if not integrantes_ids :
            return JsonResponse({"erro":"Nenhum integrante informado"}, status=400)
        
        integrantes_grupo = AlunoProfile.objects.filter(grupo = grupo).count()

        #Valida que um grupo só pode ter até 5 integrantes
        if integrantes_grupo + len(integrantes_ids) > 5:
            return JsonResponse({"erro": "Um grupo não pode ter mais de 5 integrantes"}, status=400)

        # Salva o grupo no AlunoProfile
        adicionados = []
        for user_id in integrantes_ids:
            try:
                aluno_profile = AlunoProfile.objects.get(id =user_id)
                # Verifica se o aluno já está em outro grupo
                if aluno_profile.grupo and aluno_profile.grupo != grupo:
                    return JsonResponse({"erro": "Aluno já está em outro grupo"}, status=400)
                
                aluno_profile.grupo = grupo
                aluno_profile.save()
                adicionados.append(aluno_profile)

            except AlunoProfile.DoesNotExist:
                return JsonResponse({"erro": "Aluno não encontrado"}, status=204)
            
        list_adicionados =[
            {"id": ad.id, "Nome": ad.user.username} for ad in adicionados
        ] 
        
        return JsonResponse({
            "id":grupo.id,
            "Nome do Grupo":grupo.nome_grupo,
            "Integrantes Adicionados": list_adicionados,
        }, status=200)
    return JsonResponse({"erro": "Método não permitido. Use o método PATCH"}, status=500)


@csrf_exempt
def remover_integrantes(request, id):

    if request.method == "PATCH":

        try:

            aluno = get_object_or_404(AlunoProfile, pk=id)

            aluno.grupo = None
            aluno.save()

            return JsonResponse({"mensagem":"integrante removido com sucesso!"}, status=200)
        
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)

    return JsonResponse({"erro": "Método não permitido. Use o método PATCH"}, status=500)
        


@csrf_exempt
def atribuir_lideranca(request,id):
    if request.method == "PATCH":

        try:
            grupo = get_object_or_404(Grupo, pk=id)
            dado = json.loads(request.body)
            lider_req = dado.get("Lider")

            liderDoGrupo = get_object_or_404(AlunoProfile, pk=lider_req)
            
            grupo.lider = liderDoGrupo
            grupo.save()

            return JsonResponse({
                "id_Grupo":grupo.id,
                "Objetivo": grupo.objetivo_projeto,
                "Nome_Grupo":grupo.nome_grupo,
                "Lider_grupo": {
                    "id":grupo.lider.id,
                    "Nome":grupo.lider.user.username,
                },
            }, status=200)
        except Exception as e:
            return JsonResponse({"erro":str(e)})
        
    return JsonResponse({"erro": "Metodo não permitido. Use o método PATCH"},status=400)

@csrf_exempt
def atribuir_objetivo_grupo(request,id):
    if request.method == "PATCH":

        try:
            grupo = get_object_or_404(Grupo, pk=id)
            dado = json.loads(request.body)
            objetivo = dado.get("Objetivo")
            
            grupo.objetivo_projeto = objetivo
            grupo.save()

            return JsonResponse({
                "id_Grupo":grupo.id,
                "Objetivo": grupo.objetivo_projeto,
                "Nome_Grupo":grupo.nome_grupo,
                "Lider_grupo": {
                    "id":grupo.lider.id,
                    "Nome":grupo.lider.user.username,
                },
                
            }, status=200)
        except Exception as e:
            return JsonResponse({"erro":str(e)})
        
    return JsonResponse({"erro": "Metodo não permitido. Use o método PATCH"},status=400)



