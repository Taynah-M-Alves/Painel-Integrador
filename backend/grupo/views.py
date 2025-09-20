from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from .models import Grupo
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model
from usuarios.models import AlunoProfile
from projIntegrador.models import projIntegrador




User = get_user_model()

@csrf_exempt
def MostrarGrupos(request):
    grupos = Grupo.objects.all()
    lista_grupo = []
    for g in grupos:
        integrantesList = AlunoProfile.objects.filter( grupo_id = g)
        integrantes= [
            {"id": ap.user_id.id, "nome": ap.user_id.username} for ap in integrantesList]
        

        lider = {"id":g.lider_id.id, "nome":g.lider_id.user_id.username} if g.lider_id else None

        lista_grupo.append({
            "id": g.id,
            "Nome_do_Grupo": g.nome_grupo,
            "Integrantes": integrantes,
            "Lider":lider,
            "DataCriacao": g.data_criacao.strftime("%d/%m/%Y %H:%M:%S"),
        })
    return JsonResponse({"grupos":lista_grupo}, status=200)

@csrf_exempt
def CriarGrupo(request):
    if request.method == "POST":
        try:
            dados = json.loads(request.body)

            nome_req = dados.get("Nome_Grupo")
            projeto_req = dados.get("Projeto_Integrador")

            projeto = get_object_or_404(projIntegrador, id=projeto_req)
        
            grupo = Grupo.objects.create(
                nome_grupo = nome_req,
                projeto_integrador_id = projeto
            )

            integrantes = dados.get("Integrantes")
            try:
                integrantes_list = []
                if len(integrantes) <= 5:
                    for integ in integrantes:
                        aluno = get_object_or_404(AlunoProfile, id=integ)
                        aluno.grupo_id = grupo
                        aluno.save()
                        integrantes_list.append(aluno)

            except Exception as e:
                return JsonResponse({"erro": str(e)}, status=400)

            liderReq = dados.get("Lider")

            try:
                if liderReq in integrantes:
                    lider = get_object_or_404(AlunoProfile, id=liderReq)
                    grupo.lider_id=lider
                    grupo.save()
                else:
                    return JsonResponse({"erro":"O lider tem que ser um dos integrantes!"})
            except Exception as e:
                return JsonResponse({"erro": str(e)}, status=400)
            
            integrantes_formatacao = [{"id":integ.id, "Nome":integ.user_id.username}for integ in integrantes_list]

            return JsonResponse({"Grupo_criado":{
                "id":grupo.id,
                "Nome":grupo.nome_grupo,
                "Lider":{
                    "id": grupo.lider_id.id,
                    "Nome":grupo.lider_id.user_id.username
                },
                "integrantes":integrantes_formatacao
            }}, status=200)
        
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)
        
    return JsonResponse({"erro": "Método não permitido"}, status=405)  


@csrf_exempt
def AdicionarIntegrantes(request, id):
    if request.method == "PATCH":

        grupo = get_object_or_404(Grupo, pk=id)
        dado = json.loads(request.body)
        integrantes_ids = dado.get("Integrantes",[])

        #Valida que está sendo informado algum integrante no json
        if not integrantes_ids :
            return JsonResponse({"erro":"Nenhum integrante informado"}, status=400)
        
        integrantes_grupo = AlunoProfile.objects.filter(grupo_id = grupo).count()

        #Valida que um grupo só pode ter até 5 integrantes
        if integrantes_grupo + len(integrantes_ids) > 5:
            return JsonResponse({"erro": "Um grupo não pode ter mais de 5 integrantes"}, status=400)

        # Salva o grupo no AlunoProfile
        adicionados = []
        for user_id in integrantes_ids:
            try:
                aluno_profile = AlunoProfile.objects.get(id =user_id)
                # Verifica se o aluno já está em outro grupo
                if aluno_profile.grupo_id and aluno_profile.grupo_id != grupo:
                    return JsonResponse({"erro": f"Aluno {user_id} já está em outro grupo"}, status=400)
                
                aluno_profile.grupo_id = grupo
                aluno_profile.save()
                adicionados.append(aluno_profile)

            except AlunoProfile.DoesNotExist:
                return JsonResponse({"erro": f"Aluno {user_id} não encontrado"}, status=400)
            
        list_adicionados =[
            {"id": ad.user_id.id, "Nome": ad.user_id.username} for ad in adicionados
        ] 
        
        return JsonResponse({
            "id":grupo.id,
            "Nome do Grupo":grupo.nome_grupo,
            "Integrantes Adicionados": list_adicionados,
        }, status=200)
    return JsonResponse({"erro": "Método não permitido"}, status=405)

@csrf_exempt
def DefinirLider(request,id):
    if request.method == "PATCH":
        try:
            grupo = get_object_or_404(Grupo, pk=id)
            dado = json.loads(request.body)
            liderReq = dado.get("Lider")

            liderDoGrupo = get_object_or_404(AlunoProfile, pk=liderReq)
            
            grupo.lider_id = liderDoGrupo
            grupo.save()

            return JsonResponse({
                "id_Grupo":grupo.id,
                "Nome_Grupo":grupo.nome_grupo,
                "Lider_grupo": {
                    "id":grupo.lider_id.id,
                    "Nome":grupo.lider_id.user_id.username,
                },
            }, status=200)
        except Exception as e:
            return JsonResponse({"erro":str(e)})
        
    return JsonResponse({"erro": "Metodo não permitido"},status=400)


@csrf_exempt
def VerGrupoPorId(request, id):
    grupo = get_object_or_404(Grupo, pk=id)

    integrantes= [
        {"id": ap.user_id.id, "nome": ap.user_id.username} for ap in grupo.alunos.all()
            ]
    lider = {"id":grupo.lider_id.id, "nome":grupo.lider_id.username} if grupo.lider_id else None

    return JsonResponse({
                "id": grupo.id, 
                "Nome do Grupo": grupo.nome_grupo, 
                "Data da Criação":grupo.data_criacao.strftime("%d/%m/%Y, %H:%M:%S"),
                "Integrantes": integrantes,
                "Lider": lider,
            }, status=200)

# def RemoverIntegrantesGrupo(request, id):
#     pass



