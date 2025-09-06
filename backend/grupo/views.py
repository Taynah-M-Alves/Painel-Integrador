from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,JsonResponse
from .models import Grupo
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model
from usuarios.models import AlunoProfile
from django.db import transaction

User = get_user_model()

@csrf_exempt
def MostrarGrupos(request):
    grupos = Grupo.objects.prefetch_related('alunos__user').all()
    lista_grupo = []
    for g in grupos:
        integrantes= [
            {"id": ap.user.id, "nome": ap.user.username} for ap in g.alunos.all()
            ]
        lider = {"id":g.lider.id, "nome":g.lider.username} if g.lider else None

        lista_grupo.append({
            "id": g.id,
            "Nome do Grupo": g.NomeGrupo,
            "Integrantes": integrantes,
            "Lider":lider,
            "DataCriacao": g.DataCriacao.strftime("%d/%m/%Y %H:%M:%S"),
        })
    return JsonResponse({"grupos":lista_grupo}, status=200)

@csrf_exempt
def CriarGrupo(request):
    if request.method == "POST":
        try:
            dados = json.loads(request.body)  # pega o JSON enviado no corpo da requisição
            grupo = Grupo.objects.create(
                NomeGrupo = dados.get("NomeGrupo")
            )
            lider_id= dados.get("Lider")
            integrantes_ids = dados.get("Integrantes",[])

            # Valida NomedoGrupo e Máximo de Integrantes
            if not grupo.NomeGrupo:
                return JsonResponse({"erro": "NomeGrupo é obrigatório"}, status=400)
            if len(integrantes_ids) > 5:
                return JsonResponse({"erro": "Máximo de 5 integrantes permitido"}, status=400)
            
            # Salva o grupo no AlunoProfile
            for user_id in integrantes_ids:
                try:
                    aluno_profile = AlunoProfile.objects.get(user_id=user_id)
                    aluno_profile.grupo = grupo
                    aluno_profile.save()
                except AlunoProfile.DoesNotExist:
                    return JsonResponse({"erro": f"Aluno {user_id} não encontrado"}, status=400)


             # define líder (se enviado)
            lider_id = dados.get("Lider")
            if lider_id and lider_id in [int(i) for i in integrantes_ids]:
                grupo.lider = User.objects.get(id=lider_id)
                grupo.save()
            elif lider_id not in integrantes_ids:
                return JsonResponse({"erro":"O lider precisa ser um integrante do grupo"}, status=400)
            
            integrantes= [
            {"id": ap.user.id, "nome": ap.user.username} for ap in grupo.alunos.all()
            ]
            

            return JsonResponse({
                "id": grupo.id, 
                "Nome do Grupo": grupo.NomeGrupo, 
                "Data da Criação":grupo.DataCriacao.strftime("%d%m%Y, %H:%M:%S"),
                "Integrantes": integrantes,
                "Lider": {
                    "id": grupo.lider.id,
                    "nome": grupo.lider.username
                } if grupo.lider else None
            }, status=201)
        
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
        
        #Valida que um grupo só pode ter até 5 integrantes
        if grupo.alunos.count() + len(integrantes_ids) > 5:
            return JsonResponse({"erro": "Um grupo não pode ter mais de 5 integrantes"}, status=400)

        # Salva o grupo no AlunoProfile
        adicionados = []
        for user_id in integrantes_ids:
            try:
                aluno_profile = AlunoProfile.objects.get(user_id=user_id)
                aluno_profile.grupo = grupo
                aluno_profile.save()
                adicionados.append({"id": aluno_profile.user.id, "nome": aluno_profile.user.username})
            except AlunoProfile.DoesNotExist:
                return JsonResponse({"erro": f"Aluno {user_id} não encontrado"}, status=400)
            
        list_adicionados =[
            {"id": ad.user.id, "Nome": ad.user.username} for ad in grupo.alunos.all()
        ] 
        
        return JsonResponse({
            "id":grupo.id,
            "Nome do Grupo":grupo.NomeGrupo,
            "Integrantes Adicionados": list_adicionados,
        }, status=200)

@csrf_exempt
def DefinirLider(request, id):
    if request.method == "PATCH":
        grupo = get_object_or_404(Grupo, pk=id)
        dado = json.loads(request.body)
        lider_id = dado.get("Lider")

        #Valida que está sendo informado algum integrante no json
        if not lider_id :
            return JsonResponse({"erro":"Nenhum integrante informado"}, status=400)
    
        # Salva o lider no grupo
        try:
            grupo.lider = User.objects.get(id=lider_id)
            grupo.save()

        except User.DoesNotExist:
            return JsonResponse({"erro":f"Aluno {lider_id} não encontrado"}, status=400)
            
        list_adicionados =[
            {"id": ad.user.id, "Nome": ad.user.username} for ad in grupo.alunos.all()
        ] 
        
        return JsonResponse({
            "id":grupo.id,
            "Nome do Grupo":grupo.NomeGrupo,
            "Lider do grupo": {
                "id":grupo.lider.id,
                "Nome":grupo.lider.username
            },
        }, status=200)


@csrf_exempt
def VerGrupoPorId(request, id):
    grupo = get_object_or_404(Grupo, pk=id)

    integrantes= [
        {"id": ap.user.id, "nome": ap.user.username} for ap in grupo.alunos.all()
            ]
    lider = {"id":grupo.lider.id, "nome":grupo.lider.username} if grupo.lider else None

    return JsonResponse({
                "id": grupo.id, 
                "Nome do Grupo": grupo.NomeGrupo, 
                "Data da Criação":grupo.DataCriacao.strftime("%d%m%Y, %H:%M:%S"),
                "Integrantes": integrantes,
                "Lider": lider,
            }, status=200)

def ExcluirGrupo(request, id):
    pass