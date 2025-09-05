from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,JsonResponse
from .models import Grupo
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model

User = get_user_model()

@csrf_exempt
def MostrarGrupos(request):
    grupos = Grupo.objects.all()
    lista_grupo = [{
        "id":g.id, 
        "Nome":g.NomeGrupo,
        "Integrantes":[user.username for user in g.integrantes.all()],
        "Lider": {
                "id": g.lider.id,
                "nome": g.lider.username
            } if g.lider else None
        } for g in grupos]

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

            # adiciona integrantes (lista de IDs de usuários)
            integrantes_ids = dados.get("Integrantes",[])
            if integrantes_ids:
                grupo.integrantes.set(integrantes_ids)

             # define líder (se enviado)
            lider_id = dados.get("Lider")
            if lider_id:
                grupo.lider = User.objects.get(id=lider_id)
                grupo.save()
            

            return JsonResponse({
                "id": grupo.id, 
                "Nome do Grupo": {grupo.NomeGrupo}if grupo.NomeGrupo else f"Grupo {grupo.id}", 
                "Data da Criação":grupo.DataCriacao.strftime("%d%m%Y, %H:%M:%S"),
                "Integrantes": [
                    {
                    "id": u.id,
                    "nome": u.username
                    }for u in grupo.integrantes.all()],
                "Lider": {
                    "id": grupo.lider.id,
                    "nome": grupo.lider.username
                } if grupo.lider else None
            }, status=201)
        
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)

    return JsonResponse({"erro": "Método não permitido"}, status=405)


def ExcluirGrupo(request, id):
    pass