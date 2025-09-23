from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Evento,StatusEvento
from projIntegrador.models import projIntegrador
from django.http import JsonResponse
import json

@csrf_exempt
def criar_visualizar_evento(request):
    if request.method == 'GET':
        try:
            eventos = Evento.objects.all()
            eventos_list = [{
                "id":ev.id,
                "Titulo":ev.titulo,
                "Descricao":ev.descricao,
                "Data_Criada":ev.data_criacao.strftime("%d-%m-%y %H:%M:%S"),
                "Projeto":ev.projeto_integrador.tema,
                "Status":ev.status_evento.nome_status}for ev in eventos]
            
            return JsonResponse({"Eventos":eventos_list}, status=200)
        except Exception as e:
            return JsonResponse({"erro": str(e)})
        
    if request.method == 'POST':

        try:
            dados = json.loads(request.body)

            titulo_req = dados.get("Titulo")
            descricao_req = dados.get("Descricao")
            prazo_req = dados.get("Prazo")
            projeto_req = dados.get("Projeto_Integrador")

            projeto_object = get_object_or_404(projIntegrador, id = projeto_req)
            status_object = get_object_or_404(StatusEvento, id = 1)

            evento = Evento.objects.create(
                titulo = titulo_req,
                descricao = descricao_req,
                prazo = prazo_req,
                projeto_integrador = projeto_object,
                status_evento = status_object
            )

            return JsonResponse({"id":evento.id,
                "Titulo":evento.titulo,
                "Descricao":evento.descricao,
                "Data_Criada":evento.data_criacao.strftime("%d-%m-%y %H:%M:%S"),
                "Projeto":evento.projeto_integrador.tema,
                "Status":evento.status_evento.nome_status})

        except Exception as e:
            return JsonResponse({"erro": str(e)})
    return JsonResponse({"erro":"Metodo solicitado errado! Utilize GET ou POST"},status=400)

